import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

function calculateTempsPasse(dateEntree: Date, dateSortie: Date) {
  const diffMs = dateSortie.getTime() - dateEntree.getTime();
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const firstName = body.firstName?.trim().toUpperCase() ?? "";
    const lastName = body.lastName?.trim().toUpperCase() ?? "";
    const company = body.company?.trim().toUpperCase() ?? "";

    const otherEntry = await prisma.others.findFirst({
      where: {
        firstName,
        lastName,
        company,
      },
      orderBy: { dateEntree: "desc" },
    });

    if (!otherEntry) {
      return NextResponse.json(
        { success: false, error: "Entrée introuvable" },
        { status: 404 }
      );
    }

    const dateSortie = new Date();
    const tempsPasse = calculateTempsPasse(otherEntry.dateEntree, dateSortie);

    const updatedEntry = await prisma.others.update({
      where: { id: otherEntry.id },
      data: {
        dateSortie,
        tempsPasse,
        signature: body.signature,
      },
    });

    return NextResponse.json({ success: true, entry: updatedEntry });
  } catch (error) {
    console.error("Erreur API Others sortie:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

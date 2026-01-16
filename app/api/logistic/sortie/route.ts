import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

function calculateTempsPasse(dateEntree: Date, dateSortie: Date) {
  const diffMs = dateSortie.getTime() - dateEntree.getTime();
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const firstName = body.firstName?.trim().toUpperCase() ?? "";
    const lastName = body.lastName?.trim().toUpperCase() ?? "";
    const tractorRegistration = body.tractorRegistration?.trim().toUpperCase() ?? "";
    const logisticEntry = await prisma.logistic.findFirst({
      where: {
        firstName,
        lastName,
        tractorRegistration,
      },
      orderBy: { dateEntree: "desc" },
    });

    if (!logisticEntry) {
      return NextResponse.json(
        { success: false, error: "Entrée logistique introuvable" },
        { status: 404 }
      );
    }

    const dateSortie = new Date();
    const tempsPasse = calculateTempsPasse(logisticEntry.dateEntree, dateSortie);
    const updatedEntry = await prisma.logistic.update({
      where: { id: logisticEntry.id },
      data: {
        dateSortie,
        tempsPasse,
        signature: body.signature,
      },
    });

    return NextResponse.json({ success: true, entry: updatedEntry });
  } catch (error) {
    console.error("Erreur API Logistic sortie:", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

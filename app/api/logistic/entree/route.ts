import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const firstName = body.firstName?.trim().toUpperCase() ?? "";
    const lastName = body.lastName?.trim().toUpperCase() ?? "";
    const company = body.company?.trim().toUpperCase() ?? "";
    const selectedOption = body.selectedOption?.trim() ?? "";
    const tractorRegistration = body.tractorRegistration?.trim().toUpperCase() ?? "";
    const trailerRegistration = body.trailerRegistration?.trim().toUpperCase() ?? "";

    const entry = await prisma.logistic.create({
      data: {
        firstName,
        lastName,
        company,
        selectedOption,
        tractorRegistration,
        trailerRegistration,
      },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error("Erreur API Logistic entrée:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

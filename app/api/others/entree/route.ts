import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Normalisation des chaînes de texte
    const firstName = body.firstName?.trim().toUpperCase() ?? "";
    const lastName = body.lastName?.trim().toUpperCase() ?? "";
    const company = body.company?.trim().toUpperCase() ?? "";
    const personneAContacter = body.personneAContacter?.trim().toUpperCase() ?? "";
    const registration = body.plaque?.trim().toUpperCase() ?? "";

    const entry = await prisma.others.create({
      data: {
        firstName,
        lastName,
        company,
        telephone: body.telephone?.trim() ?? "",
        distanceParcourue: parseInt(body.distanceParcourue, 10),
        energie: body.energie?.trim().toUpperCase() ?? "",
        nbrPersonnes: parseInt(body.nbrPersonnes, 10),
        personneAContacter,
        puissanceFiscale: parseInt(body.puissanceFiscale, 10),
        registration,
      },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error("Erreur API Others entrée:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

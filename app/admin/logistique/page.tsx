import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";
import Link from "next/link"; // <--- C'était la ligne manquante !
import LogoutButton from "@/app/components/LogoutButton";
import LogisticTable from "@/app/components/LogisticTable";

// 1. Définition du type en Promise
interface AdminPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    company?: string;
  }>;
}

// 2. On change la signature pour accepter "props"
export default async function AdminPage(props: AdminPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // 3. On "await" les searchParams avant de les lire
  const searchParams = await props.searchParams;

  const page = parseInt(searchParams.page || "1", 10);
  const perPage = 50;
  
  // Utilisation de la version "awaited"
  const search = searchParams.search?.trim() || "";
  const company = searchParams.company?.trim() || "";
  
  const where: any = {};

  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { tractorRegistration: { contains: search, mode: "insensitive" } },
      { trailerRegistration: { contains: search, mode: "insensitive" } },
    ];
  }
  
  if (company) {
    where.company = { equals: company, mode: "insensitive" };
  }

  const totalCount = await prisma.logistic.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  
  const logistics = await prisma.logistic.findMany({
    where,
    orderBy: { dateEntree: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const companies = await prisma.logistic.findMany({
    select: { company: true },
    distinct: ["company"],
    orderBy: { company: "asc" },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <button
        type="button"
        className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 
                   focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm 
                   px-5 py-2.5 me-2 mb-2"
      >
        <Link href={"/admin/autre"}>Tableau de bord "Autre"</Link>
      </button>

      <LogoutButton />

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Tableau de bord - Visiteurs “Logistiques”
      </h1>
      <LogisticTable
        data={logistics}
        totalPages={totalPages}
        currentPage={page}
        companies={companies.map((c) => c.company)}
        search={search}
        companyFilter={company}
      />
    </main>
  );
}
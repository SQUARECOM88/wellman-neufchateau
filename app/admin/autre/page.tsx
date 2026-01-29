import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";
import Link from "next/link";
import LogoutButton from "@/app/components/LogoutButton";
import OthersTable from "@/app/components/OtherTable";

interface AdminPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    company?: string;
  }>;
}

export default async function AdminPage(props: AdminPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const perPage = 50;
  const search = searchParams.search?.trim() || "";
  const company = searchParams.company?.trim() || "";
  
  const where: any = {};

  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { registration: { contains: search, mode: "insensitive" } },
      { telephone: { contains: search, mode: "insensitive" } },
    ];
  }

  if (company) {
    where.company = { equals: company, mode: "insensitive" };
  }

  const totalCount = await prisma.others.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  
  const others = await prisma.others.findMany({
    where,
    orderBy: { dateEntree: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const companies = await prisma.others.findMany({
    select: { company: true },
    distinct: ["company"],
    orderBy: { company: "asc" },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-10">
<div className="absolute top-5 left-5 flex gap-4">
        
        <Link 
          href="/admin/logistique"
          className="text-white bg-blue-700 hover:bg-blue-800 
                     focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm 
                     px-5 py-2.5"
        >
          Tableau de bord "Logistique"
        </Link>

        <Link 
          href="/admin/reception"
          className="text-white bg-blue-700 hover:bg-blue-800 
                     focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm 
                     px-5 py-2.5"
        >
          Tableau de bord "Accueil"
        </Link>

      </div>
      <LogoutButton />

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Tableau de bord - Visiteurs “Autres”
      </h1>

      <OthersTable
        data={others}
        totalPages={totalPages}
        currentPage={page}
        companies={companies.map((c) => c.company)}
        search={search}
        companyFilter={company}
      />
    </main>
  );
}
"use client";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { CompaniesTable } from "@/components/CompaniesTable";

export default function Home() {
  const companies = useQuery(api.companies.get);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <CompaniesTable companies={companies} />
    </section>
  );
}

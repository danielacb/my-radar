"use client";

import { useMutation, useQuery } from "convex/react";
import { Button } from "@nextui-org/button";

import { areKeywordsOnPage } from "./helpers";

import { api } from "@/convex/_generated/api";
import { CompaniesTable } from "@/components/CompaniesTable";
import AddNewCompanyModal from "@/components/AddNewCompanyModal";

export default function Home() {
  const companies = useQuery(api.companies.get);
  const jobTitles = useQuery(api.settings.getJobTitles);
  const isScanningJobs = useQuery(api.settings.getIsScanningJobs);

  const updateCompany = useMutation(api.companies.update);
  const setIsScanningCompany = useMutation(api.companies.setIsScanningCompany);
  const setIsScanningJobs = useMutation(api.settings.setIsScanningJobs);

  const handleButtonClick = async () => {
    setIsScanningJobs({ state: true });

    if (companies && jobTitles?.length) {
      for (const company of companies) {
        setIsScanningCompany({ id: company._id, state: true });
      }

      for (const company of companies) {
        try {
          const isKeywordFound = await areKeywordsOnPage(company.careerPage, [
            company.keyword,
          ]);
          const isJobFound = await areKeywordsOnPage(
            company.careerPage,
            jobTitles,
          );

          await updateCompany({
            company: { ...company, isKeywordFound, isJobFound },
          });
        } catch (error) {
          console.log(error);
        } finally {
          setIsScanningCompany({ id: company._id, state: false });
        }
      }
    }

    setIsScanningJobs({ state: false });
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Button
        className="bg-gradient-to-tr from-cyan-500 to-green-500 text-white shadow-lg"
        disabled={!jobTitles?.length}
        isLoading={isScanningJobs}
        radius="full"
        onClick={handleButtonClick}
      >
        {`${isScanningJobs ? "Scanning" : "Scan"} for Jobs`}
      </Button>

      <div className="w-full flex pt-12 justify-between">
        <AddNewCompanyModal />
        <Button variant="bordered">Settings</Button>
      </div>

      <CompaniesTable companies={companies} />
    </section>
  );
}

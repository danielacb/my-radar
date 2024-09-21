"use client";

import { useMutation, useQuery } from "convex/react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import { areKeywordsOnPage } from "./helpers";

import { api } from "@/convex/_generated/api";
import { CompaniesTable } from "@/components/CompaniesTable";
import CompanyModal from "@/components/CompanyModal";
import SettingsModal from "@/components/SettingsModal";

export default function Home() {
  const companies = useQuery(api.companies.get);
  const jobTitles = useQuery(api.settings.getJobTitles);
  const isScanningJobs = useQuery(api.settings.getIsScanningJobs);

  const updateCompany = useMutation(api.companies.update);
  const setIsScanningCompany = useMutation(api.companies.setIsScanningCompany);
  const setIsScanningJobs = useMutation(api.settings.setIsScanningJobs);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      <h1 className="text-4xl font-bold mb-8">My jobs Radar</h1>
      <Button
        className="bg-gradient-to-br text-white from-cyan-500 to-green-500 border-small border-white/50 shadow-green-200/30 shadow-lg"
        disabled={!jobTitles?.length}
        isLoading={isScanningJobs}
        radius="full"
        onClick={handleButtonClick}
      >
        {`${isScanningJobs ? "Scanning" : "Scan"} for Jobs`}
      </Button>

      <div className="w-full flex pt-12 justify-between">
        <CompanyModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
        <SettingsModal />
      </div>

      <CompaniesTable companies={companies} />
    </section>
  );
}

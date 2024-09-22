"use client";

import { useMutation, useQuery } from "convex/react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";

import { areKeywordsOnPage } from "./helpers";

import { api } from "@/convex/_generated/api";
import { CompaniesTable } from "@/components/CompaniesTable";
import CompanyModal from "@/components/CompanyModal";
import SettingsModal from "@/components/SettingsModal";
import { JobsKeywords } from "@/components/JobKeywords";

export default function Home() {
  const companies = useQuery(api.companies.get);
  const jobTitles = useQuery(api.settings.getJobTitles);
  const isScanningJobs = useQuery(api.settings.getIsScanningJobs);

  const updateCompany = useMutation(api.companies.update);
  const setIsScanningCompany = useMutation(api.companies.setIsScanningCompany);
  const setIsScanningJobs = useMutation(api.settings.setIsScanningJobs);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isButtonDisabled = !jobTitles?.length || !companies?.length;
  const buttonTitle = isButtonDisabled
    ? "Add job keywords to search for job openings"
    : "Scan all companies for job listings";
  const buttonClasses = `border-small border-white/50 shadow-lg text-white
    ${
      isButtonDisabled
        ? "bg-gray-400 shadow-gray-600/30 cursor-not-allowed"
        : "bg-gradient-to-br from-cyan-500 to-green-500 shadow-green-200/30"
    }`;

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
        className={buttonClasses}
        disabled={isButtonDisabled}
        isLoading={isScanningJobs}
        radius="full"
        title={buttonTitle}
        onClick={handleButtonClick}
      >
        {`${isScanningJobs ? "Scanning" : "Scan"} for Jobs`}
      </Button>
      <JobsKeywords />

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

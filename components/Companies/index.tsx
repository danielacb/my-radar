import { useMutation, useQuery } from "convex/react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { useClerk } from "@clerk/nextjs";
import toast from "react-hot-toast";

import { SignOutIcon } from "../icons";

import { CompaniesTable } from "./CompaniesTable";
import CompanyModal from "./CompanyModal";

import { api } from "@/convex/_generated/api";
import SettingsModal from "@/components/SettingsModal";
import { JobTitles } from "@/components/JobTitles";
import { scanCompany } from "@/app/helpers";

export const Companies = () => {
  const companies = useQuery(api.companies.get);
  const jobTitles = useQuery(api.users.getJobTitles);
  const isScanningJobs = useQuery(api.users.getIsScanningJobs);

  const updateCompany = useMutation(api.companies.update);
  const setIsScanningCompany = useMutation(api.companies.setIsScanningCompany);
  const setIsScanningJobs = useMutation(api.users.setIsScanningJobs);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { signOut } = useClerk();

  const isButtonDisabled =
    isScanningJobs || !jobTitles?.length || !companies?.length;
  const buttonTitle = isButtonDisabled
    ? isScanningJobs
      ? "Scanning in progress..."
      : "Add job titles to search for job openings"
    : "Scan all companies for job listings";
  const buttonClasses = `border-small border-white/50 shadow-lg text-white
      ${
        isButtonDisabled
          ? "bg-gray-400 shadow-gray-600/30 cursor-not-allowed"
          : "bg-gradient-to-br from-cyan-500 to-green-500 shadow-green-200/30"
      }`;

  const handleButtonClick = async () => {
    if (companies && jobTitles?.length) {
      setIsScanningJobs({ state: true });

      try {
        const scanPromises = companies.map((company) =>
          scanCompany({
            company,
            jobTitles,
            setIsScanningCompany,
            updateCompany,
            toastErrorMessage: `An error occurred while scanning for jobs on ${company.name}. Please try again!`,
          }),
        );

        await Promise.all(scanPromises);
        toast.success("Finished scanning for jobs");
      } catch {
        toast.error(
          "An unexpected error occurred while scanning companies. Please try again!",
        );
      } finally {
        setIsScanningJobs({ state: false });
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-full items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My jobs Radar</h1>

        <Button
          startContent={<SignOutIcon />}
          variant="bordered"
          onClick={() => signOut({ redirectUrl: "/" })}
        >
          Sign out
        </Button>
      </div>
      <Button
        className={buttonClasses}
        isDisabled={isButtonDisabled}
        isLoading={isScanningJobs}
        radius="full"
        title={buttonTitle}
        onClick={handleButtonClick}
      >
        {`${isScanningJobs ? "Scanning" : "Scan"} for Jobs`}
      </Button>
      <JobTitles />

      <div className="w-full flex pt-12 justify-between">
        <CompanyModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
        <SettingsModal />
      </div>

      <CompaniesTable companies={companies} />
    </section>
  );
};

import { Button } from "@nextui-org/button";
import { useMutation, useQuery } from "convex/react";

import { PlayIcon } from "@/components/icons";
import { api } from "@/convex/_generated/api";
import { Company } from "@/types";
import { scanCompany } from "@/app/helpers";

export const TableNameCell = ({ company }: { company: Company }) => {
  const jobTitles = useQuery(api.users.getJobTitles) || [];
  const updateCompany = useMutation(api.companies.update);
  const setIsScanningCompany = useMutation(api.companies.setIsScanningCompany);

  const handleButtonClick = async () => {
    scanCompany({
      company,
      jobTitles,
      setIsScanningCompany,
      updateCompany,
      toastSuccessMessage: `Finished scanning for jobs on ${company.name}`,
      toastErrorMessage: `An error occurred while scanning for jobs on ${company.name}. Please try again!`,
    });
  };

  return (
    <div className="flex items-center	gap-2">
      <Button
        isIconOnly
        aria-label="scan jobs"
        radius="md"
        size="sm"
        variant="bordered"
        onClick={handleButtonClick}
      >
        <PlayIcon color="success" size={18} />
      </Button>
      {company.name}
    </div>
  );
};

import { Button } from "@nextui-org/button";
import { useMutation, useQuery } from "convex/react";

import { PlayIcon } from "@/components/icons";
import { api } from "@/convex/_generated/api";
import { Company } from "@/types";
import { areKeywordsOnPage } from "@/app/helpers";

export const TableNameCell = ({ company }: { company: Company }) => {
  const jobTitles = useQuery(api.settings.getJobTitles);
  const updateCompany = useMutation(api.companies.update);
  const setIsScanningCompany = useMutation(api.companies.setIsScanningCompany);

  const handleButtonClick = async () => {
    setIsScanningCompany({ id: company._id, state: true });

    try {
      const isKeywordFound = await areKeywordsOnPage(company.careerPage, [
        company.keyword,
      ]);
      const isJobFound = await areKeywordsOnPage(company.careerPage, jobTitles);

      await updateCompany({
        company: { ...company, isKeywordFound, isJobFound },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsScanningCompany({ id: company._id, state: false });
    }
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

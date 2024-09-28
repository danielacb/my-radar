import toast from "react-hot-toast";

import { Id } from "@/convex/_generated/dataModel";
import { Company } from "@/types";

export const areKeywordsOnPage = async (url: string, keywords?: string[]) => {
  if (!Array.isArray(keywords)) return false;

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/scan-jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      keywords,
    }),
  });

  return await response.json();
};

interface ScanCompanyProps {
  company: Company;
  jobTitles: string[];
  setIsScanningCompany: (args: { id: Id<"companies">; state: boolean }) => void;
  updateCompany: (args: { company: Company }) => Promise<null>;
  toastErrorMessage: string;
  toastSuccessMessage?: string;
}

export const scanCompany = async ({
  company,
  jobTitles,
  setIsScanningCompany,
  updateCompany,
  toastErrorMessage,
  toastSuccessMessage,
}: ScanCompanyProps) => {
  setIsScanningCompany({ id: company._id, state: true });

  try {
    const isKeywordFound = await areKeywordsOnPage(company.careerPage, [
      company.keyword,
    ]);
    const isJobFound = await areKeywordsOnPage(company.careerPage, jobTitles);

    await updateCompany({
      company: { ...company, isKeywordFound, isJobFound },
    });

    if (toastSuccessMessage) toast.success(toastSuccessMessage);
  } catch (error) {
    console.error("Error in scanCompany:", error);
    toast.error(toastErrorMessage);
  } finally {
    setIsScanningCompany({ id: company._id, state: false });
  }
};

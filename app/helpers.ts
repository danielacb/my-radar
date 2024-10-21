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

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (
  email: string | undefined | null,
): ValidationResult => {
  const trimmedEmail = email?.trim() || "";

  if (trimmedEmail === "") {
    return {
      isValid: false,
      message: "Please enter your email address",
    };
  }

  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedEmail)
    ? { isValid: true }
    : { isValid: false, message: "Please enter a valid email address" };
};

export const validatePassword = (password: string): ValidationResult => {
  if (password === "") {
    return {
      isValid: false,
      message: "Password is required",
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long",
    };
  }

  return { isValid: true };
};

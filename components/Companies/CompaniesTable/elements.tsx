import { Chip } from "@nextui-org/chip";
import { Spinner } from "@nextui-org/spinner";

import { Company } from "@/types";

interface Column {
  key: keyof Company;
  label: string;
  width?: number;
  align?: "center" | "start" | "end";
}

export const columns: Column[] = [
  {
    key: "name",
    label: "Company",
  },
  {
    key: "isKeywordFound",
    label: "Page Keyword",
  },
  {
    key: "isJobTitleFound",
    label: "Job Title",
  },
  {
    key: "_id",
    label: "Actions",
    width: 100,
    align: "end",
  },
];

interface TableChipProps {
  isFound: boolean;
  isLoading: boolean;
}

export const TableChip = ({ isFound, isLoading }: TableChipProps) =>
  isLoading ? (
    <Spinner color="success" size="sm" />
  ) : (
    <Chip
      className="capitalize border-none gap-1 text-default-600"
      color={isFound ? "success" : "danger"}
      size="sm"
      variant="dot"
    >
      {isFound ? "Found" : "Not Found"}
    </Chip>
  );

export const TableEmptyState = () => (
  <>
    <h4 className="font-bold text-large">No Companies Found</h4>
    <p className="text-small">You can add a new company to get started.</p>
  </>
);

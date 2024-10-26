import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Spinner } from "@nextui-org/spinner";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import { ExternalLinkIcon, VerticalDotsIcon } from "@/components/icons";
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
    label: "Job Keyword",
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

interface TableDropdown extends Pick<Company, "careerPage" | "website"> {}

export const TableDropdown = ({ website, careerPage }: TableDropdown) => (
  <div className="relative flex justify-end items-center gap-2">
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <VerticalDotsIcon className="text-default-300" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          endContent={<ExternalLinkIcon size={18} />}
          href={website}
          target="_blank"
        >
          Visit website
        </DropdownItem>
        <DropdownItem
          endContent={<ExternalLinkIcon size={18} />}
          href={careerPage}
          target="_blank"
        >
          Visit career page
        </DropdownItem>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem className="text-danger" color="danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
);

export const TableEmptyState = () => (
  <>
    <h4 className="font-bold text-large">No Companies Found</h4>
    <p className="text-small">You can add a new company to get started.</p>
  </>
);

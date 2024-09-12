import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import { ExternalLink, VerticalDotsIcon } from "@/components/icons";
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
    label: "Keyword",
  },
  {
    key: "isJobFound",
    label: "Job Opening",
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
}

export const TableChip = ({ isFound }: TableChipProps) => (
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
          endContent={<ExternalLink size={18} />}
          href={website}
          target="_blank"
        >
          Visit website
        </DropdownItem>
        <DropdownItem
          endContent={<ExternalLink size={18} />}
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

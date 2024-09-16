import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useMutation } from "convex/react";

import { ExternalLinkIcon, VerticalDotsIcon } from "@/components/icons";
import { Company } from "@/types";
import { api } from "@/convex/_generated/api";

export const TableDropdown = ({ company }: { company: Company }) => {
  const { _id, careerPage, website } = company;
  const deleteCompany = useMutation(api.companies.deleteCompany);

  return (
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
          <DropdownItem
            className="text-danger"
            color="danger"
            onClick={() => deleteCompany({ id: _id })}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

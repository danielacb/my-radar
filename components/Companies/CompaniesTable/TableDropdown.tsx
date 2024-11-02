import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useMutation } from "convex/react";
import { useDisclosure } from "@nextui-org/modal";

import CompanyModal from "../CompanyModal";

import { ExternalLinkIcon, VerticalDotsIcon } from "@/components/icons";
import { Company } from "@/types";
import { api } from "@/convex/_generated/api";

export const TableDropdown = ({ company }: { company: Company }) => {
  const { _id, careerPage, website } = company;
  const deleteCompany = useMutation(api.companies.deleteCompany);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <VerticalDotsIcon className="text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => {
            if (key === "edit company") onOpen();
            if (key === "delete company") deleteCompany({ id: _id });
          }}
        >
          <DropdownItem
            key="website"
            endContent={<ExternalLinkIcon size={18} />}
            href={website}
            target="_blank"
          >
            Visit website
          </DropdownItem>
          <DropdownItem
            key="career page"
            endContent={<ExternalLinkIcon size={18} />}
            href={careerPage}
            target="_blank"
          >
            Visit career page
          </DropdownItem>
          <DropdownItem key="edit company">Edit</DropdownItem>
          <DropdownItem
            key="delete company"
            className="text-danger"
            color="danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <CompanyModal
        company={company}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

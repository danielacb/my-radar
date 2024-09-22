import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useMutation, useQuery } from "convex/react";
import { FormEvent, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Company } from "@/types";
import { scanCompany } from "@/app/helpers";

interface CompanyModalProps {
  company?: Company;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

export default function CompanyModal({
  company,
  isOpen,
  onOpen,
  onOpenChange,
}: CompanyModalProps) {
  const [formData, setFormData] = useState({
    name: company?.name || "",
    careerPage: company?.careerPage || "",
    keyword: company?.keyword || "",
    website: company?.website || "",
  });
  const { name, keyword, website, careerPage } = formData;

  const jobTitles = useQuery(api.settings.getJobTitles) || [];
  const companies = useQuery(api.companies.get);
  const updateCompany = useMutation(api.companies.update);
  const createCompany = useMutation(api.companies.create);
  const setIsScanningCompany = useMutation(api.companies.setIsScanningCompany);

  const handleValueChange = (
    value: string,
    input: "name" | "careerPage" | "keyword" | "website",
  ) => {
    setFormData({
      ...formData,
      [input]: value,
    });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (company) {
      await scanCompany({
        company: { ...company, ...formData },
        jobTitles,
        setIsScanningCompany,
        updateCompany,
      });
    } else {
      await createCompany({ name, keyword, careerPage, website }).then(
        async (company) => {
          await scanCompany({
            company,
            jobTitles,
            setIsScanningCompany,
            updateCompany,
          });
        },
      );
    }
  };

  return (
    <>
      {!company && (
        <Button
          className={
            !companies?.length
              ? "border-small border-white/50 shadow-lg text-white bg-gradient-to-br from-cyan-500 to-green-500 shadow-green-200/30"
              : ""
          }
          variant="flat"
          onPress={onOpen}
        >
          Add company
        </Button>
      )}

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                {company ? "Edit company" : "Add new company"}
              </ModalHeader>
              <form onSubmit={handleFormSubmit}>
                <ModalBody>
                  <Input
                    required
                    className="pt-2"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Company name"
                    size="lg"
                    value={name}
                    variant="bordered"
                    onValueChange={(e) => handleValueChange(e, "name")}
                  />
                  <Input
                    required
                    className="pt-2"
                    description="This will be used to check if the page hasn't changed"
                    label="Keyword"
                    labelPlacement="outside"
                    placeholder="Open positions"
                    size="lg"
                    value={keyword}
                    variant="bordered"
                    onValueChange={(e) => handleValueChange(e, "keyword")}
                  />
                  <Input
                    required
                    className="pt-2"
                    label="Website"
                    labelPlacement="outside"
                    placeholder="Company website"
                    size="lg"
                    value={website}
                    variant="bordered"
                    onValueChange={(e) => handleValueChange(e, "website")}
                  />
                  <Input
                    required
                    className="pt-2"
                    label="Career page"
                    labelPlacement="outside"
                    placeholder="Company career page"
                    size="lg"
                    value={careerPage}
                    variant="bordered"
                    onValueChange={(e) => handleValueChange(e, "careerPage")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="success" type="submit" onPress={onClose}>
                    {company ? "Save" : "Add"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

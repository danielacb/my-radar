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
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/convex/_generated/api";
import { Company } from "@/types";
import { scanCompany } from "@/app/helpers";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  careerPage: z.string().url(),
  keyword: z.string().min(1, { message: "Career page keyword is required" }),
  website: z.string().url(),
});

type FormFields = z.infer<typeof schema>;

interface CompanyModalProps {
  company?: Company;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
}

export default function CompanyModal({
  company,
  isOpen,
  onOpen,
  onClose,
  onOpenChange,
}: CompanyModalProps) {
  const defaultValues = {
    name: company?.name || "",
    careerPage: company?.careerPage || "",
    keyword: company?.keyword || "",
    website: company?.website || "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const jobTitles = useQuery(api.users.getJobTitles) || [];
  const companies = useQuery(api.companies.get);
  const updateCompany = useMutation(api.companies.update);
  const createCompany = useMutation(api.companies.create);
  const setIsScanningCompany = useMutation(api.companies.setIsScanningCompany);

  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    const { name, keyword, website, careerPage } = formData;

    let currentCompany;

    if (company) {
      currentCompany = { ...company, ...formData };
      await updateCompany({ company: currentCompany });

      reset({
        name: currentCompany?.name || "",
        careerPage: currentCompany?.careerPage || "",
        keyword: currentCompany?.keyword || "",
        website: currentCompany?.website || "",
      });
    } else {
      currentCompany = await createCompany({
        name,
        keyword,
        careerPage,
        website,
      });

      reset(defaultValues);
    }

    const toastSuccessMessage = company
      ? `Information for ${formData.name} updated successfully!`
      : `Finished scanning for jobs on ${currentCompany.name}`;

    onClose();

    await scanCompany({
      company: currentCompany,
      jobTitles,
      setIsScanningCompany,
      updateCompany,
      toastSuccessMessage,
      toastErrorMessage: `An error occurred while scanning for jobs on ${formData.name}. Please try again!`,
    });
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
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                {company ? "Edit company" : "Add new company"}
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    className="pt-2"
                    errorMessage={errors?.name?.message || ""}
                    isInvalid={!!errors.name}
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Company name"
                    size="lg"
                    variant="bordered"
                    {...register("name")}
                  />
                  <Input
                    className="pt-2"
                    description="This will be used to check if the page hasn't changed"
                    errorMessage={errors?.keyword?.message || ""}
                    isInvalid={!!errors.keyword}
                    label="Keyword"
                    labelPlacement="outside"
                    placeholder="Open positions"
                    size="lg"
                    variant="bordered"
                    {...register("keyword")}
                  />
                  <Input
                    className="pt-2"
                    errorMessage={errors?.website?.message || ""}
                    isInvalid={!!errors.website}
                    label="Website"
                    labelPlacement="outside"
                    placeholder="Company website"
                    size="lg"
                    variant="bordered"
                    {...register("website")}
                  />
                  <Input
                    className="pt-2"
                    errorMessage={errors?.careerPage?.message || ""}
                    isInvalid={!!errors.careerPage}
                    label="Career page"
                    labelPlacement="outside"
                    placeholder="Company career page"
                    size="lg"
                    variant="bordered"
                    {...register("careerPage")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="success"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    type="submit"
                  >
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

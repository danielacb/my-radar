import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ModalBody } from "@nextui-org/modal";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { CompanyFormFields } from ".";

type CompanyModalButtonProps = {
  isHighlighted: boolean;
  onOpen: () => void;
};

export const CompanyModalButton = ({
  isHighlighted,
  onOpen,
}: CompanyModalButtonProps) => {
  const ButtonStyle = isHighlighted
    ? "border-small border-white/50 shadow-lg text-white bg-gradient-to-br from-cyan-500 to-green-500 shadow-green-200/30"
    : "";

  return (
    <Button className={ButtonStyle} variant="flat" onPress={onOpen}>
      Add company
    </Button>
  );
};

type CompanyModalFieldsProps = {
  errors: FieldErrors<CompanyFormFields>;
  register: UseFormRegister<CompanyFormFields>;
};

export const CompanyModalFields = ({
  errors,
  register,
}: CompanyModalFieldsProps) => {
  return (
    <ModalBody>
      <Input
        className="pt-2"
        errorMessage={errors?.name?.message || ""}
        isInvalid={!!errors.name}
        label="Name"
        labelPlacement="outside"
        placeholder="Company name"
        size="lg"
        variant={!!errors.name ? "bordered" : "flat"}
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
        variant={!!errors.keyword ? "bordered" : "flat"}
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
        variant={!!errors.website ? "bordered" : "flat"}
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
        variant={!!errors.careerPage ? "bordered" : "flat"}
        {...register("careerPage")}
      />
    </ModalBody>
  );
};

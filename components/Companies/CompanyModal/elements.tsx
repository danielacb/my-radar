import { Button } from "@nextui-org/button";
import { Input, InputProps } from "@nextui-org/input";
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
    <Button
      aria-label="Add company"
      className={ButtonStyle}
      variant="flat"
      onPress={onOpen}
    >
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
  const inputProps: InputProps = {
    className: "pt-2",
    size: "lg",
    labelPlacement: "outside",
  };

  return (
    <ModalBody>
      <Input
        errorMessage={errors?.name?.message || ""}
        isInvalid={!!errors.name}
        label="Name"
        placeholder="Company name"
        variant={errors.name ? "bordered" : "flat"}
        {...inputProps}
        {...register("name")}
      />
      <Input
        description="This will be used to check if the page hasn't changed"
        errorMessage={errors?.keyword?.message || ""}
        isInvalid={!!errors.keyword}
        label="Keyword"
        placeholder="Open positions"
        variant={errors.keyword ? "bordered" : "flat"}
        {...inputProps}
        {...register("keyword")}
      />
      <Input
        errorMessage={errors?.website?.message || ""}
        isInvalid={!!errors.website}
        label="Website"
        placeholder="Company website"
        variant={errors.website ? "bordered" : "flat"}
        {...inputProps}
        {...register("website")}
      />
      <Input
        errorMessage={errors?.careerPage?.message || ""}
        isInvalid={!!errors.careerPage}
        label="Career page"
        placeholder="Company career page"
        variant={errors.careerPage ? "bordered" : "flat"}
        {...inputProps}
        {...register("careerPage")}
      />
    </ModalBody>
  );
};

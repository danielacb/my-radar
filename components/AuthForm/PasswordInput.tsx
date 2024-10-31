import { Input, InputProps } from "@nextui-org/input";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

type PasswordInputProps = {
  error?: FieldError;
  register: UseFormRegisterReturn;
  label?: string;
} & InputProps;

export const PasswordInput = ({
  error,
  register,
  label = "Password",
  ...props
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Input
      className="mb-4"
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      errorMessage={error?.message || ""}
      isInvalid={!!error}
      label={label}
      size="sm"
      type={isPasswordVisible ? "text" : "password"}
      variant={error ? "bordered" : "flat"}
      {...register}
      {...props}
    />
  );
};

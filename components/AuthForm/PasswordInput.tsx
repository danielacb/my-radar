import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

import { validatePassword, ValidationResult } from "@/app/helpers";

interface PasswordInputProps {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

export const PasswordInput = ({
  password,
  setPassword,
}: PasswordInputProps) => {
  const [wasTouched, setWasTouched] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState<ValidationResult>({
    isValid: true,
  });

  useEffect(() => {
    if (wasTouched) {
      const isValid = validatePassword(password);

      setIsPasswordValid(isValid);
    }
  }, [password]);

  const handleBlur = () => {
    setWasTouched(true);
    const isValid = validatePassword(password);

    setIsPasswordValid(isValid);
  };

  return (
    <Input
      required
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
      errorMessage={isPasswordValid?.message || ""}
      isInvalid={!isPasswordValid.isValid}
      label="Password"
      size="sm"
      type={isPasswordVisible ? "text" : "password"}
      value={password}
      variant={isPasswordValid.isValid ? "flat" : "bordered"}
      onBlur={handleBlur}
      onChange={(e) => setPassword(e.target.value)}
    />
  );
};

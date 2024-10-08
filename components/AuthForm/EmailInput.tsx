import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction, useState } from "react";

import { EmailValidationResult, validateEmail } from "@/app/helpers";

interface EmailInputProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

export const EmailInput = ({ email, setEmail }: EmailInputProps) => {
  const [isEmailValid, setIsEmailValid] = useState<EmailValidationResult>({
    isValid: true,
  });

  const handleEmailBlur = () => {
    const isValid = validateEmail(email);

    setIsEmailValid(isValid);
  };

  return (
    <Input
      required
      className="mb-4"
      errorMessage={isEmailValid?.message || ""}
      isInvalid={!isEmailValid.isValid}
      label="Email"
      size="sm"
      type="email"
      value={email}
      variant={isEmailValid.isValid ? "flat" : "bordered"}
      onBlur={handleEmailBlur}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
};

import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { ValidationResult, validateEmail } from "@/app/helpers";

interface EmailInputProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

export const EmailInput = ({ email, setEmail }: EmailInputProps) => {
  const [wasTouched, setWasTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<ValidationResult>({
    isValid: true,
  });

  useEffect(() => {
    if (wasTouched) {
      const isValid = validateEmail(email);

      setIsEmailValid(isValid);
    }
  }, [email]);

  const handleBlur = () => {
    setWasTouched(true);
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
      onBlur={handleBlur}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
};

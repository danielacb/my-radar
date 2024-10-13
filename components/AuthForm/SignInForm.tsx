"use client";

import { FormEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

import { ErrorsCard } from "./ErrorsCard";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";

import { validateEmail, validatePassword } from "@/app/helpers";

export const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/companies");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const isButtonDisabled = !(
    validateEmail(email).isValid && validatePassword(password).isValid
  );

  return (
    <>
      <form className="mt-4 text-right" onSubmit={(e) => handleSubmit(e)}>
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />

        <Button color="success" isDisabled={isButtonDisabled} type="submit">
          Continue
        </Button>
      </form>

      <ErrorsCard errors={errors} />
    </>
  );
};

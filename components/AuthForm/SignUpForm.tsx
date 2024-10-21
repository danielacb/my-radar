"use client";

import { FormEvent, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useMutation } from "convex/react";

import { ErrorsCard } from "./ErrorsCard";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";

import { api } from "@/convex/_generated/api";
import { validateEmail, validatePassword } from "@/app/helpers";

export const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const createUser = useMutation(api.users.create);

  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete" && signUpAttempt.id) {
        await createUser({
          clerkId: signUpAttempt.id,
          email: signUpAttempt.emailAddress || "",
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <div className="text-right">
        <h2 className="mt-4 text-lg font-bold text-center mb-2">
          Verify your email
        </h2>
        <p className="text-center text-medium mb-4">
          We sent a code to {emailAddress}
        </p>
        <form onSubmit={handleVerify}>
          <Input
            id="code"
            label="Enter your verification code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            className="mt-4"
            color="success"
            isDisabled={!code}
            type="submit"
          >
            Verify
          </Button>
        </form>

        <ErrorsCard errors={errors} />
      </div>
    );
  }

  const isButtonDisabled = !(
    validateEmail(emailAddress).isValid && validatePassword(password).isValid
  );

  // Display the initial sign-up form to capture the email and password
  return (
    <>
      <form className="mt-4 text-right" onSubmit={handleSubmit}>
        <EmailInput email={emailAddress} setEmail={setEmailAddress} />
        <PasswordInput password={password} setPassword={setPassword} />

        <Button color="success" isDisabled={isButtonDisabled} type="submit">
          Continue
        </Button>
      </form>

      <ErrorsCard errors={errors} />
    </>
  );
};

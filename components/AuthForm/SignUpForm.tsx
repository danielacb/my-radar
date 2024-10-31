"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ErrorsCard } from "./ErrorsCard";
import { PasswordInput } from "./PasswordInput";
import { VerifyEmailForm } from "./VerifyEmailForm";

const schema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: "Passwords must match!",
    path: ["passwordConfirmation"],
  });

type FormFields = z.infer<typeof schema>;

export const SignUpForm = () => {
  const { isLoaded, signUp } = useSignUp();
  const [clerkErrors, setClerkErrors] = useState<ClerkAPIError[]>([]);
  const [verifying, setVerifying] = useState(false);

  const {
    register,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(schema),
  });

  // Handle submission of the sign-up form
  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    setClerkErrors([]);
    const { email, password, firstName, lastName } = formData;

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
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
      if (isClerkAPIResponseError(err)) setClerkErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying)
    return (
      <VerifyEmailForm
        clerkErrors={clerkErrors}
        email={getValues("email")}
        setClerkErrors={setClerkErrors}
      />
    );

  // Display the initial sign-up form to capture the email and password
  return (
    <>
      <form className="mt-4 text-right" onSubmit={handleSubmit(onSubmit)}>
        <Input
          autoComplete="name"
          className="mb-4"
          errorMessage={errors?.firstName?.message || ""}
          isInvalid={!!errors.firstName}
          label="First name"
          size="sm"
          variant={errors.firstName ? "bordered" : "flat"}
          {...register("firstName")}
        />
        <Input
          autoComplete="family-name"
          className="mb-4"
          errorMessage={errors?.lastName?.message || ""}
          isInvalid={!!errors.lastName}
          label="Last name"
          size="sm"
          variant={errors.lastName ? "bordered" : "flat"}
          {...register("lastName")}
        />

        <Input
          autoComplete="email"
          className="mb-4"
          errorMessage={errors?.email?.message || ""}
          isInvalid={!!errors.email}
          label="Email"
          size="sm"
          variant={errors.email ? "bordered" : "flat"}
          {...register("email")}
        />

        <PasswordInput
          autoComplete="new-password"
          error={errors.password}
          label="Password"
          register={register("password")}
        />
        <PasswordInput
          autoComplete="new-password"
          error={errors.passwordConfirmation}
          label="Confirm password"
          register={register("passwordConfirmation")}
        />

        <Button
          color="success"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
        >
          Continue
        </Button>
      </form>

      <ErrorsCard errors={clerkErrors} />
    </>
  );
};

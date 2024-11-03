"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { z } from "zod";

import { ErrorsCard } from "./ErrorsCard";
import { PasswordInput } from "./PasswordInput";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [ClerkErrors, setClerkErrors] = useState<ClerkAPIError[]>();

  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  // Handle the submission of the sign-in form
  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    setClerkErrors([]);
    const { email, password } = formData;

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
        Sentry.captureException(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) {
        setClerkErrors(err.errors);
        Sentry.withScope((scope) => {
          scope.setTags({
            clerkError: err.clerkError,
            status: err.status,
          });
          Sentry.captureException(JSON.stringify(err, null, 2));
        });
      }

      Sentry.captureException(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <form className="mt-4 text-right" onSubmit={handleSubmit(onSubmit)}>
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
          autoComplete="current-password"
          error={errors.password}
          register={register("password")}
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

      <ErrorsCard errors={ClerkErrors} />
    </>
  );
};

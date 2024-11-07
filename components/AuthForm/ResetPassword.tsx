import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { PasswordInput } from "./PasswordInput";

const schema = z.object({
  code: z.string().min(6),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

type ResetPasswordProps = {
  setClerkErrors: Dispatch<SetStateAction<ClerkAPIError[] | undefined>>;
};

const ResetPassword = ({ setClerkErrors }: ResetPasswordProps) => {
  const { signIn, setActive } = useSignIn();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: { password: "", code: "" },
    resolver: zodResolver(schema),
  });

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  const reset: SubmitHandler<FormFields> = async (formData) => {
    const { code, password } = formData;

    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setClerkErrors([]);
        }
      })
      .catch((err) => {
        if (isClerkAPIResponseError(err)) {
          setClerkErrors(err.errors);
          Sentry.withScope((scope) => {
            scope.setContext("reset password", {
              code: err.errors,
              message: err.errors,
              longMessage: err.errors,
            });
          });
        }

        Sentry.captureException(JSON.stringify(err, null, 2));
      });
  };

  return (
    <form className="mt-8 w-full" onSubmit={handleSubmit(reset)}>
      <h2 className="text-lg font-bold text-center mb-4">Verify your code</h2>

      <Input
        autoComplete="one-time-code"
        className="mb-4"
        errorMessage={errors?.code?.message || ""}
        isInvalid={!!errors.code}
        label="Enter your verification code"
        size="sm"
        variant={errors.code ? "bordered" : "flat"}
        {...register("code")}
      />

      <PasswordInput
        autoComplete="new-password"
        error={errors.password}
        label="New password"
        register={register("password")}
      />

      <Button
        fullWidth
        color="success"
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
      >
        Reset
      </Button>
    </form>
  );
};

export default ResetPassword;

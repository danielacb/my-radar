import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import * as Sentry from "@sentry/nextjs";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

type FormFields = z.infer<typeof schema>;

type CreateResetCodeProps = {
  setClerkErrors: Dispatch<SetStateAction<ClerkAPIError[] | undefined>>;
  setSuccessfulCreation: Dispatch<SetStateAction<boolean>>;
};

const CreateResetCode = ({
  setClerkErrors,
  setSuccessfulCreation,
}: CreateResetCodeProps) => {
  const { signIn } = useSignIn();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  });

  // Send the password reset code to the user's email
  const create: SubmitHandler<FormFields> = async (formData) => {
    const { email } = formData;

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setClerkErrors([]);
      })
      .catch((err) => {
        if (isClerkAPIResponseError(err)) {
          setClerkErrors(err.errors);
          Sentry.withScope((scope) => {
            scope.setContext("create reset code", {
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
    <form className="mt-8 w-full" onSubmit={handleSubmit(create)}>
      <h2 className="text-lg font-bold text-center mb-2">Send reset code</h2>
      <p className="text-md text-center mb-6">
        {`Enter your email, and we’ll send you instructions to reset your password!`}
      </p>

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

      <Button
        fullWidth
        color="success"
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
      >
        Send reset code
      </Button>
    </form>
  );
};

export default CreateResetCode;

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { useSignUp } from "@clerk/nextjs";
import { Input } from "@nextui-org/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { z } from "zod";

import { ErrorsCard } from "./ErrorsCard";

import { api } from "@/convex/_generated/api";

type VerifyEmailFormProps = {
  email: string;
  clerkErrors: ClerkAPIError[];
  setClerkErrors: Dispatch<SetStateAction<ClerkAPIError[]>>;
};

const schema = z.object({
  code: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

export const VerifyEmailForm = ({
  email,
  clerkErrors,
  setClerkErrors,
}: VerifyEmailFormProps) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const createUser = useMutation(api.users.create);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: { code: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    setClerkErrors([]);
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: formData.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete" && signUpAttempt.createdUserId) {
        await createUser({
          clerkId: signUpAttempt.createdUserId,
          email: signUpAttempt.emailAddress || "",
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/companies");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setClerkErrors(err.errors);
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="text-right">
      <h2 className="mt-4 text-lg font-bold text-center mb-2">
        Verify your email
      </h2>
      <p className="text-center text-medium mb-4">We sent a code to {email}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors?.code?.message || ""}
          isInvalid={!!errors.code}
          label="Enter your verification code"
          variant={!!errors.code ? "bordered" : "flat"}
          {...register("code")}
        />
        <Button
          className="mt-4"
          color="success"
          isDisabled={isSubmitting}
          type="submit"
        >
          Verify
        </Button>
      </form>

      <ErrorsCard errors={clerkErrors} />
    </div>
  );
};

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@nextui-org/card";
import { ClerkAPIError } from "@clerk/types";
import { useAuth, useSignIn } from "@clerk/nextjs";

import CreateResetCode from "@/components/AuthForm/CreateResetCode";
import ResetPassword from "@/components/AuthForm/ResetPassword";
import ErrorsCard from "@/components/AuthForm/ErrorsCard";

const ForgotPassword = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [ClerkErrors, setClerkErrors] = useState<ClerkAPIError[]>();

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    router.push("/companies");
  }

  return (
    <div className="flex items-center flex-col">
      <Card className="max-w-sm w-full">
        <CardBody className="flex items-center">
          <h1 className="text-2xl font-bold mt-4">Forgot password?</h1>

          {!successfulCreation && (
            <CreateResetCode
              setClerkErrors={setClerkErrors}
              setSuccessfulCreation={setSuccessfulCreation}
            />
          )}

          {successfulCreation && (
            <ResetPassword setClerkErrors={setClerkErrors} />
          )}

          <ErrorsCard errors={ClerkErrors} />
        </CardBody>
      </Card>
    </div>
  );
};

export default ForgotPassword;

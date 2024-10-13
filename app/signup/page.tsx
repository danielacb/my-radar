"use client";

import { useConvexAuth } from "convex/react";
import { Spinner } from "@nextui-org/spinner";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/AuthForm";

export default function SignUp() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isAuthenticated) redirect("/companies");

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center">
        <Spinner color="success" size="lg" />
      </div>
    );

  return <AuthForm activeTab="sign-up" />;
}

"use client";

import { Spinner } from "@nextui-org/spinner";
import { useConvexAuth } from "convex/react";

import { Companies } from "@/components/Companies";
import { AuthForm } from "@/components/AuthForm";

export default function CompaniesPage() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center">
        <Spinner color="success" size="lg" />
      </div>
    );

  if (!isAuthenticated) {
    return (
      <div className="w-full content-center text-center">
        <h4 className="font-bold text-2xl mb-8">
          Please log in to access and manage your companies
        </h4>

        <AuthForm />
      </div>
    );
  }

  return <Companies />;
}

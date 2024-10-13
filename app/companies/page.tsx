"use client";

import { Spinner } from "@nextui-org/spinner";
import { useConvexAuth } from "convex/react";

import { Companies } from "@/components/Companies";

export default function CompaniesPage() {
  const { isLoading } = useConvexAuth();

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center">
        <Spinner color="success" size="lg" />
      </div>
    );

  return <Companies />;
}
"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import toast, { ToastType, Toaster, resolveValue } from "react-hot-toast";
import { Chip, ChipProps } from "@nextui-org/chip";

import { AuthForm } from "@/components/AuthForm";
import { HomePage } from "@/components/HomePage";

export default function Home() {
  const getChipColor = (type: ToastType) => {
    const colors: Record<ToastType, ChipProps["color"]> = {
      success: "success",
      error: "danger",
      loading: "default",
      blank: "default",
      custom: "default",
    };

    return colors[type];
  };

  return (
    <>
      <Unauthenticated>
        <AuthForm />
      </Unauthenticated>
      <Authenticated>
        <HomePage />
      </Authenticated>

      <Toaster gutter={8} position="bottom-right">
        {(t) => (
          <Chip
            className="w-full max-w-xs px-2 py-4 h-12"
            color={getChipColor(t.type)}
            radius="sm"
            variant="faded"
            onClose={() => toast.dismiss(t.id)}
          >
            {resolveValue(t.message, t)}
          </Chip>
        )}
      </Toaster>
    </>
  );
}

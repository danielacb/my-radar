"use client";

import { useAuth } from "@clerk/nextjs";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";

import { AuthForm } from "@/components/AuthForm";

export default function Login() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  if (isSignedIn) router.push("/companies");

  if (!isLoaded)
    return (
      <div className="w-full h-full flex justify-center">
        <Spinner color="success" size="lg" />
      </div>
    );

  return <AuthForm activeTab="sign-up" />;
}

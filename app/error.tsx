"use client";

import { Button } from "@nextui-org/button";
import * as Sentry from "@sentry/nextjs";
import { Link } from "@nextui-org/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.withScope((scope) => {
      scope.setLevel("error");
      scope.setContext("error page", { error: error.message });
      Sentry.captureException(error);
    });
  }, [error]);

  return (
    <div className="h-full w-full content-center text-center">
      <h4 className="font-bold text-2xl">Something went wrong!</h4>
      <p className="text-md mt-2 mb-4">
        We have been notified and are working to fix the issue.
      </p>

      <Button as={Link} className="mr-2" href="/" variant="ghost">
        Go back home
      </Button>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}

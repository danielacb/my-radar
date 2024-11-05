"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
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
    <html lang="en-US">
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
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
      </body>
    </html>
  );
}

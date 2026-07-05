"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center">
      <h1 className="font-display text-3xl text-text-primary">
        Something went wrong.
      </h1>
      <p className="max-w-md text-text-muted">
        We hit an unexpected error loading this page. Try again, or head back
        home.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}

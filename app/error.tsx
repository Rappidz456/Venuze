"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex min-h-svh flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">Error</p>
      <h1 className="mt-3 text-4xl font-bold">This page failed to load</h1>
      <p className="mt-2 max-w-md text-neutral-500">
        It might be a network blip. Try again before rewriting the URL.
      </p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </Container>
  );
}

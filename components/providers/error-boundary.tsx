"use client";

import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="flex min-h-svh flex-col items-center justify-center py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Something snapped
          </p>
          <h1 className="mt-3 text-3xl font-bold">This view hit an unexpected error.</h1>
          <p className="mt-2 max-w-md text-neutral-500">
            Reload the page. If it keeps happening, the listing data may have failed to load.
          </p>
          <Button className="mt-6" onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

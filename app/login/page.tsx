import type { Metadata } from "next";
import { CoverImage } from "@/components/ui/image";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <CoverImage
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=80"
          alt="Evening event inside a venue"
          className="object-cover"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-neutral-800/55" />
        <div className="absolute inset-x-12 bottom-12 text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Hosts & planners
          </p>
          <h2 className="mt-3 max-w-md text-4xl font-bold">
            One login for hosts and planners.
          </h2>
        </div>
      </div>
      <div className="flex items-center bg-surface px-5 py-16">
        <Container className="max-w-md">
          <Logo />
          <h1 className="mt-8 text-4xl font-bold">Welcome back</h1>
          <p className="mt-2 text-md text-neutral-500">
            Sign in with the ReqRes demo account to continue.
          </p>
          <div className="mt-8">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </Container>
      </div>
    </div>
  );
}

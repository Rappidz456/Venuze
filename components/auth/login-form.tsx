"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { DEMO_LOGIN } from "@/lib/constants";
import { safeReturnPath } from "@/lib/auth-redirect";
import { loginSchema, type LoginValues } from "@/lib/validations";
import { useLoginMutation } from "@/hooks/use-auth";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = safeReturnPath(params.get("from"));
  const login = useLoginMutation();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: DEMO_LOGIN.email, password: "" },
  });

  const onSubmit = (values: LoginValues) => {
    login.mutate(values, {
      onSuccess: () => {
        router.replace(from);
        router.refresh();
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={form.formState.errors.email?.message}
        {...form.register("email")}
      />
      <Field
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="At least 6 characters"
        error={form.formState.errors.password?.message}
        {...form.register("password")}
      />
      <Button type="submit" className="w-full" size="lg" disabled={login.isPending}>
        {login.isPending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-sm text-neutral-500">
        Demo account: <span className="font-medium text-foreground">{DEMO_LOGIN.email}</span> /{" "}
        {DEMO_LOGIN.password}
      </p>
    </form>
  );
}

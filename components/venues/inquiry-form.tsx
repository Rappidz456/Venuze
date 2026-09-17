"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { inquirySchema, type InquiryValues } from "@/lib/validations";
import { useAuthStore } from "@/stores/auth-store";
import { ROUTES } from "@/lib/constants";
import { useRouter } from "next/navigation";

export function InquiryForm({ venueId, capacity }: { venueId: string; capacity: number }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { date: "", guests: 20, message: "" },
  });

  const onSubmit = () => {
    if (!isAuthenticated) {
      router.push(`${ROUTES.login}?from=/venues/${venueId}`);
      return;
    }

    toast.success("Request sent", {
      description: "The host will get back to you about this date.",
    });
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl bg-surface p-5 shadow-card"
    >
      <h2 className="text-xl font-semibold">Hold this date</h2>
      <Field
        id="date"
        label="Event date"
        type="date"
        error={form.formState.errors.date?.message}
        {...form.register("date")}
      />
      <Field
        id="guests"
        label="Guests"
        type="number"
        min={1}
        max={capacity}
        error={form.formState.errors.guests?.message}
        {...form.register("guests")}
      />
      <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-500">
        Note to host
        <textarea
          rows={3}
          className="rounded-md border border-neutral-200 bg-surface px-4 py-3 text-md text-foreground outline-none focus:border-brand"
          {...form.register("message")}
        />
      </label>
      <Button type="submit" className="w-full">
        Send inquiry
      </Button>
    </form>
  );
}

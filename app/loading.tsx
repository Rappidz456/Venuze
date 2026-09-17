import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <Skeleton className="size-10 rounded-full" />
    </div>
  );
}

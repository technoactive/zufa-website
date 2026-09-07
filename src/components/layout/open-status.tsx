"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus as Status } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * Live "open now / closed" badge. Runs only on the client after hydration so the
 * prerendered HTML stays deterministic (no Date access during server render).
 */
export function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!status) {
    return <span className={cn("inline-block h-5", className)} aria-hidden />;
  }

  return (
    <p className={cn("inline-flex items-center gap-2 text-sm", className)} aria-live="polite">
      <span
        aria-hidden
        className={cn("size-2 rounded-full", status.isOpen ? "bg-success shadow-[0_0_0_4px_rgb(61_191_122/0.2)]" : "bg-smoke")}
      />
      <span className={status.isOpen ? "text-cream" : "text-sand"}>{status.message}</span>
    </p>
  );
}

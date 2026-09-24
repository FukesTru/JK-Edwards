import type { ReactNode } from "react";
import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";

export function FormSuccess({
  title,
  children,
  tone = "light",
  onReset,
  resetLabel = "Send another message",
}: {
  title: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  onReset?: () => void;
  resetLabel?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-2xl border p-6 sm:p-8",
        tone === "dark" ? "border-white/10 bg-white/[0.04] text-white" : "border-line bg-paper text-ink",
      )}
    >
      <CircleCheckBig
        aria-hidden
        className={cn("h-9 w-9", tone === "dark" ? "text-gold" : "text-success")}
        strokeWidth={1.5}
      />
      <p className="mt-4 font-serif text-2xl font-semibold">{title}</p>
      {children && (
        <div className={cn("mt-2 leading-relaxed", tone === "dark" ? "text-mist" : "text-muted")}>{children}</div>
      )}
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className={cn(
            "mt-5 text-sm font-semibold underline underline-offset-4",
            tone === "dark" ? "text-gold" : "text-navy",
          )}
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}

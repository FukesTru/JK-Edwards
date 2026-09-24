"use client";

import type { ReactNode } from "react";
import { buttonClasses } from "@/components/ui/Button";

export function PrintButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      data-print-hide
      onClick={() => window.print()}
      className={buttonClasses("outline-dark", "sm")}
    >
      {children}
    </button>
  );
}

import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge aware of the brand color tokens so overrides resolve predictably. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "navy",
        "navy-2",
        "gold",
        "gold-hover",
        "gold-deep",
        "gold-light",
        "ink",
        "muted",
        "paper",
        "success",
        "mist",
        "line",
        "line-dark",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Strip [label](href) link markup down to plain text (for JSON-LD). */
export function stripLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

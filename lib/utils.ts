import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge aware of the brand color tokens so overrides resolve predictably. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "ink",
        "ink-soft",
        "charcoal",
        "steel",
        "accent",
        "accent-hover",
        "accent-light",
        "accent-strong",
        "paper",
        "mist",
        "line",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "09:00" -> "9 AM", "21:00" -> "9 PM", "15:30" -> "3:30 PM" */
export function formatHour(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Strip [label](href) link markup down to plain text (for JSON-LD). */
export function stripLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

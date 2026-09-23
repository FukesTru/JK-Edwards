import Image from "next/image";
import type { ReactNode } from "react";
import { getImage, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

/** Photo on one side, copy on the other. Image gets a soft accent offset frame. */
export function SplitFeature({
  image,
  children,
  imageSide = "left",
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  imageClassName,
  badge,
}: {
  image: ImageKey;
  children: ReactNode;
  imageSide?: "left" | "right";
  aspect?: string;
  sizes?: string;
  imageClassName?: string;
  badge?: ReactNode;
}) {
  const photo = getImage(image);
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className={cn("relative", imageSide === "right" && "lg:order-2")}>
        <div
          aria-hidden
          className={cn(
            "absolute -bottom-4 h-2/3 w-2/3 rounded-2xl bg-accent/15",
            imageSide === "left" ? "-left-4" : "-right-4",
          )}
        />
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-paper shadow-[0_40px_80px_-40px_rgba(22,24,27,0.55)]",
            aspect,
          )}
        >
          <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className={cn("object-cover", imageClassName)} />
        </div>
        {badge && <div className="absolute -right-2 bottom-6 sm:-right-6">{badge}</div>}
      </div>
      <div className={cn(imageSide === "right" && "lg:order-1")}>{children}</div>
    </div>
  );
}

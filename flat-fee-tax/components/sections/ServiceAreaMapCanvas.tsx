"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import type { FeatureCollection } from "geojson";
import type { Map as MapLibreMap } from "maplibre-gl";
import { brandColors } from "@/lib/brand";
import { directionsUrl, mapStyleUrl, withBasePath } from "@/lib/site";
import { cn } from "@/lib/utils";

export type MapPoint = {
  name: string;
  href: string;
  /** [longitude, latitude] */
  coordinates: [number, number];
  office?: boolean;
  /** Which side of the pin the name sits on, to keep neighbouring labels apart. */
  labelSide?: "left" | "right";
};

type Bounds = [[number, number], [number, number]];

/** Fayette + Coweta County (from content/service-area.json). */
const COUNTY_BOUNDS: Bounds = [
  [-85.0154, 33.191],
  [-84.3816, 33.5509],
];
/** Just the seven towns — used on narrow maps so the pins aren't crowded. */
const TOWN_BOUNDS: Bounds = [
  [-84.83, 33.27],
  [-84.44, 33.49],
];

const GOLD_DEEP = "#86661F";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Interactive MapLibre map of the service area: real county boundaries,
 * one pin per city (each links to its page) and the office highlighted.
 * MapLibre, its CSS and the boundary data load only when the map nears the
 * viewport, so they never delay the first paint.
 */
export function ServiceAreaMapCanvas({
  points,
  label,
  className,
}: {
  points: MapPoint[];
  label: string;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let map: MapLibreMap | undefined;
    let cancelled = false;

    const init = async () => {
      setStatus("loading");
      try {
        const [{ default: maplibregl }, { default: counties }] = await Promise.all([
          import("maplibre-gl"),
          import("@/content/service-area.json"),
          import("maplibre-gl/dist/maplibre-gl.css"),
        ]);
        if (cancelled) return;

        const narrow = element.clientWidth < 520;
        const instance = new maplibregl.Map({
          container: element,
          style: mapStyleUrl,
          bounds: narrow ? TOWN_BOUNDS : COUNTY_BOUNDS,
          // Extra room on the right for the labels of the easternmost towns.
          fitBoundsOptions: { padding: { top: 36, bottom: 36, left: 24, right: narrow ? 100 : 88 } },
          maxBounds: [
            [-86.4, 32.5],
            [-82.8, 34.3],
          ],
          minZoom: 7,
          maxZoom: 15,
          cooperativeGestures: true,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
        });
        map = instance;
        instance.touchZoomRotate.disableRotation();
        instance.keyboard.disableRotation();
        instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

        let styleReady = false;
        instance.on("style.load", () => {
          styleReady = true;
          // Our pins name the towns we serve, so hide the basemap's own place labels.
          for (const layer of instance.getStyle().layers) {
            if (layer.type === "symbol" && "source-layer" in layer && layer["source-layer"] === "place") {
              instance.setLayoutProperty(layer.id, "visibility", "none");
            }
          }
          // Draw the counties beneath the basemap's road labels so those stay crisp.
          const firstLabel = instance.getStyle().layers.find((layer) => layer.type === "symbol")?.id;
          instance.addSource("service-area", { type: "geojson", data: counties as FeatureCollection });
          instance.addLayer(
            {
              id: "service-area-fill",
              type: "fill",
              source: "service-area",
              paint: { "fill-color": brandColors.gold, "fill-opacity": 0.14 },
            },
            firstLabel,
          );
          instance.addLayer(
            {
              id: "service-area-outline",
              type: "line",
              source: "service-area",
              paint: { "line-color": GOLD_DEEP, "line-width": 2, "line-opacity": 0.85 },
            },
            firstLabel,
          );
        });
        instance.on("load", () => setStatus("ready"));
        // Individual tile errors are harmless; only a style that never loads is fatal.
        instance.on("error", () => {
          if (styleReady || cancelled) return;
          setStatus("error");
          // Tear the map down (after this event finishes) so only the fallback message shows.
          setTimeout(() => {
            if (map === instance) {
              instance.remove();
              map = undefined;
            }
          });
        });

        for (const point of points) {
          const pin = document.createElement("a");
          pin.href = withBasePath(point.href);
          pin.className = cn(
            "map-pin",
            point.office && "map-pin--office",
            point.labelSide === "left" && "map-pin--left",
          );
          pin.setAttribute("aria-label", point.office ? `${point.name}, our office` : point.name);
          pin.innerHTML = `<span class="map-pin__dot" aria-hidden="true"></span><span class="map-pin__label" aria-hidden="true">${escapeHtml(point.name)}${point.office ? '<span class="map-pin__tag">Our office</span>' : ""}</span>`;
          pin.addEventListener("click", (event) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey)
              return;
            event.preventDefault();
            router.push(point.href);
          });
          new maplibregl.Marker({ element: pin, anchor: point.labelSide === "left" ? "right" : "left" })
            .setLngLat(point.coordinates)
            .addTo(instance);
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void init();
      },
      { rootMargin: "300px" },
    );
    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
      map?.remove();
    };
  }, [points, router]);

  return (
    <div className={cn("relative isolate overflow-hidden rounded-2xl border border-line bg-[#EEF0F2]", className)}>
      <div
        ref={container}
        role="region"
        aria-label={label}
        className={cn("h-full w-full", status === "error" && "invisible")}
      />
      {status !== "ready" && (
        <div
          className="pointer-events-none absolute inset-0 grid place-items-center p-6 text-center"
          aria-live="polite"
          aria-busy={status === "loading"}
        >
          {status === "error" ? (
            <p className="pointer-events-auto max-w-xs text-sm text-muted">
              The interactive map couldn’t load.{" "}
              <a
                href={directionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 font-semibold text-navy underline underline-offset-4"
              >
                Open in Google Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          ) : (
            <span className="flex items-center gap-2 text-sm font-medium text-muted">
              <MapPin aria-hidden className="h-4 w-4 animate-pulse text-navy" strokeWidth={1.75} />
              Loading map…
            </span>
          )}
        </div>
      )}
    </div>
  );
}

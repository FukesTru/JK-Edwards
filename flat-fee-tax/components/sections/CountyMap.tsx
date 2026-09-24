import { cn } from "@/lib/utils";

/**
 * Stylized illustration of Fayette & Coweta County with the seven cities we
 * serve. City dots are plotted from real coordinates (x = longitude,
 * y = latitude, 600 units per degree); county outlines are simplified.
 */
const places = [
  { name: "Peachtree City", x: 272, y: 110, office: true, anchor: "start" as const, dx: 12, dy: 5 },
  { name: "Fayetteville", x: 357, y: 79, anchor: "start" as const, dx: 10, dy: 4 },
  { name: "Tyrone", x: 272, y: 65, anchor: "start" as const, dx: 10, dy: 4 },
  { name: "Brooks", x: 354, y: 174, anchor: "start" as const, dx: 10, dy: 4 },
  { name: "Newnan", x: 150, y: 119, anchor: "middle" as const, dx: 0, dy: -12 },
  { name: "Sharpsburg", x: 241, y: 145, anchor: "end" as const, dx: -10, dy: 4 },
  { name: "Senoia", x: 298, y: 166, anchor: "end" as const, dx: -10, dy: 16 },
];

const coweta =
  "M14 30 L60 22 L120 26 L170 18 L228 24 L256 22 L258 60 L254 92 L257 124 L286 130 L318 138 L322 176 L316 214 L250 220 L180 216 L110 222 L52 214 L20 206 L10 150 L16 96 Z";
const fayette =
  "M256 22 L300 26 L352 20 L404 28 L410 80 L404 132 L410 180 L398 210 L352 214 L316 214 L322 176 L318 138 L286 130 L257 124 L254 92 L258 60 Z";

export function CountyMap({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <svg
      viewBox="0 0 450 240"
      role="img"
      aria-label="Map of Fayette and Coweta County, Georgia, showing Peachtree City, Fayetteville, Tyrone, Brooks, Newnan, Sharpsburg and Senoia"
      className={cn("h-auto w-full", className)}
    >
      <path d={coweta} fill={dark ? "#1B2F4D" : "#EFEBE2"} stroke={dark ? "#3A5075" : "#D8D1C2"} strokeWidth="1.5" />
      <path d={fayette} fill={dark ? "#223A5E" : "#E6DFD0"} stroke={dark ? "#3A5075" : "#D8D1C2"} strokeWidth="1.5" />
      <path
        d="M256 22 L258 60 L254 92 L257 124 L286 130 L318 138 L322 176 L316 214"
        fill="none"
        stroke="#C9A24B"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.8"
      />

      <text x="70" y="200" fontSize="11" letterSpacing="2" fontWeight="600" fill={dark ? "#B7C1D1" : "#5B6472"}>
        COWETA COUNTY
      </text>
      <text
        x="336"
        y="46"
        fontSize="11"
        letterSpacing="2"
        fontWeight="600"
        fill={dark ? "#B7C1D1" : "#5B6472"}
        textAnchor="middle"
      >
        FAYETTE COUNTY
      </text>

      {places.map((place) => (
        <g key={place.name}>
          {place.office && <circle cx={place.x} cy={place.y} r="11" fill="#C9A24B" opacity="0.25" />}
          <circle
            cx={place.x}
            cy={place.y}
            r={place.office ? 6 : 4.5}
            fill={place.office ? "#C9A24B" : dark ? "#FFFFFF" : "#0F1E33"}
            stroke={dark ? "#0F1E33" : "#FFFFFF"}
            strokeWidth="1.5"
          />
          <text
            x={place.x + place.dx}
            y={place.y + place.dy}
            textAnchor={place.anchor}
            fontSize={place.office ? 13 : 12}
            fontWeight={place.office ? 700 : 500}
            fill={dark ? "#FFFFFF" : "#0F1E33"}
          >
            {place.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

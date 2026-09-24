/**
 * Logo geometry, shared by the React logo, the favicon/app icons and the
 * downloadable SVG/PNG logo files. The mark is a shield holding ledger lines
 * (a margin rule plus three entries) — "your return, checked and protected".
 * Coordinates use a 64×64 grid.
 */
export const brandColors = { navy: "#0F1E33", navy2: "#1B2F4D", gold: "#C9A24B", white: "#FFFFFF" } as const;

export const mark = {
  shield:
    "M32 8 51 14.4v14.4c0 12.4-7.9 21.9-19 26.2-11.1-4.3-19-13.8-19-26.2V14.4zm0 4.6L17 17.6v11.2c0 10 6.2 17.8 15 21.4 8.8-3.6 15-11.4 15-21.4V17.6z",
  margin: "M24.5 18.5v23.5",
  ledger: "M29 24h12.5M29 30h12.5M29 36h7.5",
  /** Tight bounds of the shield (no tile). */
  viewBox: "12 7 40 49",
};

/** Bolder, simplified mark for 16–32px favicons. */
export const markSmall = {
  shield:
    "M32 5 54 12.4v16.4c0 14.3-9.1 25.2-22 30.2-12.9-5-22-15.9-22-30.2V12.4zm0 6.2-16 5.4v12.2c0 10.9 6.6 19.5 16 23.5 9.4-4 16-12.6 16-23.5V16.6z",
  ledger: "M24 25h16M24 33h16M24 41h9",
};

/** Standalone SVG markup for the mark (used by icon routes and downloads). */
export function markSvg({ tile = true, small = false, color = brandColors.gold } = {}) {
  const tileRect = tile ? `<rect width="64" height="64" rx="${small ? 12 : 14}" fill="${brandColors.navy}"/>` : "";
  const body = small
    ? `<path fill="${color}" fill-rule="evenodd" d="${markSmall.shield}"/><path d="${markSmall.ledger}" stroke="${color}" stroke-width="4.2" stroke-linecap="round"/>`
    : `<path fill="${color}" fill-rule="evenodd" d="${mark.shield}"/><path d="${mark.margin}" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/><path d="${mark.ledger}" stroke="${color}" stroke-width="2.6" stroke-linecap="round"/>`;
  const viewBox = tile ? "0 0 64 64" : mark.viewBox;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">${tileRect}${body}</svg>`;
}

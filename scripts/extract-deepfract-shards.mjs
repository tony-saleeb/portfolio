import fs from "fs";

const src = fs.readFileSync(
  "c:/Users/ASUS/development/portfolio/public/deepfract-logo.svg",
  "utf8"
);

const clean = src
  .replace(/<metadata>[\s\S]*?<\/metadata>/, "")
  .replace(/\s+xmlns:c2pa="[^"]*"/, "")
  .replace(/\s+/g, " ")
  .replace(/> </g, "><")
  .trim();

fs.writeFileSync(
  "c:/Users/ASUS/development/portfolio/public/deepfract-logo.svg",
  clean
);

const SCALE = 0.25;

function scalePathD(d, s) {
  return d.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi, (raw) => {
    const v = parseFloat(raw) * s;
    if (!Number.isFinite(v)) return raw;
    return String(Number(v.toFixed(3)));
  });
}

/** Resolve url(#gradient_N) → a solid stop color for particle animation. */
const gradientPaint = new Map();
for (const m of clean.matchAll(
  /<linearGradient\b([^>]*)>([\s\S]*?)<\/linearGradient>/g
)) {
  const id = (m[1].match(/\bid="([^"]+)"/) || [])[1];
  const stops = [...m[2].matchAll(/stop-color="([^"]+)"/g)].map((s) => s[1]);
  if (id && stops.length) {
    // Prefer the brighter / second stop when available (crystal highlight)
    gradientPaint.set(id, stops[stops.length - 1] || stops[0]);
  }
}

function resolvePaint(fill) {
  const url = fill.match(/^url\(#([^)]+)\)$/);
  if (url) return gradientPaint.get(url[1]) || "#215093";
  return fill;
}

const paths = [...clean.matchAll(/<path\b([^>]*)\/?>/g)]
  .map((m) => {
    const attrs = m[1];
    const fill = (attrs.match(/fill="([^"]*)"/) || [])[1] || "#42E7F3";
    const dRaw = (attrs.match(/d="([^"]*)"/) || [])[1];
    if (!dRaw) return null;
    return {
      d: scalePathD(dRaw, SCALE),
      paint: resolvePaint(fill),
    };
  })
  .filter(Boolean);

const out = `/* Auto-generated from deepfract-logo.svg — do not edit by hand.
 * Particle shards use solid \`paint\` only. The assembled mark is the
 * pristine SVG at /deepfract-logo.svg — never re-render gradients under transforms.
 */
export const DEEPFRACT_VIEWBOX = "0 0 500 500";

export type DeepFractShard = {
  d: string;
  paint: string;
};

export const DEEPFRACT_SHARDS: DeepFractShard[] = ${JSON.stringify(paths)};
`;

fs.writeFileSync(
  "c:/Users/ASUS/development/portfolio/src/components/sections/deepfractShards.ts",
  out
);

console.log("shards", paths.length, "paints", [...new Set(paths.map((p) => p.paint))].length);

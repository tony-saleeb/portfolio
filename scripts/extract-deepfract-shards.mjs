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

const gradients = [...clean.matchAll(/<defs>([\s\S]*?)<\/defs>/g)]
  .map((m) => m[1])
  .join("");

const paths = [...clean.matchAll(/<path\b([^>]*)\/?>/g)]
  .map((m) => {
    const attrs = m[1];
    const fill = (attrs.match(/fill="([^"]*)"/) || [])[1] || "#42E7F3";
    const d = (attrs.match(/d="([^"]*)"/) || [])[1];
    const transform =
      (attrs.match(/transform="([^"]*)"/) || [])[1] || "scale(0.25 0.25)";
    return { fill, d, transform };
  })
  .filter((p) => p.d);

const out = `/* Auto-generated from deepfract-logo.svg — do not edit by hand */
export const DEEPFRACT_VIEWBOX = "0 0 500 500";

export const DEEPFRACT_GRADIENTS = ${JSON.stringify(gradients)};

export type DeepFractShard = {
  fill: string;
  d: string;
  transform: string;
};

export const DEEPFRACT_SHARDS: DeepFractShard[] = ${JSON.stringify(paths)};
`;

fs.writeFileSync(
  "c:/Users/ASUS/development/portfolio/src/components/sections/deepfractShards.ts",
  out
);

console.log(
  "shards",
  paths.length,
  "clean svg kb",
  Math.round(clean.length / 1024),
  "module kb",
  Math.round(out.length / 1024)
);

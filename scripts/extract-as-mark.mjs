import fs from "fs";

const src = fs.readFileSync(
  "c:/Users/ASUS/development/portfolio/public/AS.svg",
  "utf8"
);

const clean = src
  .replace(/<metadata>[\s\S]*?<\/metadata>/, "")
  .replace(/\s+xmlns:c2pa="[^"]*"/, "")
  .replace(/\s+/g, " ")
  .replace(/> </g, "><")
  .trim();

fs.writeFileSync(
  "c:/Users/ASUS/development/portfolio/public/as-mark.svg",
  clean
);

const gradients = [...clean.matchAll(/<defs>([\s\S]*?)<\/defs>/g)]
  .map((m) => m[1])
  .join("");

const paths = [...clean.matchAll(/<path\b([^>]*)\/?>/g)]
  .map((m) => {
    const attrs = m[1];
    const fill = (attrs.match(/fill="([^"]*)"/) || [])[1] || "#0C5AF5";
    const opacity = (attrs.match(/fill-opacity="([^"]*)"/) || [])[1];
    const d = (attrs.match(/d="([^"]*)"/) || [])[1];
    return { fill, opacity: opacity || undefined, d };
  })
  .filter((p) => p.d);

const out = `/* Auto-generated from public/AS.svg — do not edit by hand */
export const AS_VIEWBOX = "0 0 1536 1024";

export const AS_GRADIENTS = ${JSON.stringify(gradients)};

export type AsShard = {
  fill: string;
  opacity?: string;
  d: string;
};

export const AS_SHARDS: AsShard[] = ${JSON.stringify(paths)};
`;

fs.writeFileSync(
  "c:/Users/ASUS/development/portfolio/src/components/ui/asMarkShards.ts",
  out
);

console.log("shards", paths.length, "kb", Math.round(out.length / 1024));

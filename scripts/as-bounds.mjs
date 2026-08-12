import fs from "fs";

const m = fs.readFileSync(
  "c:/Users/ASUS/development/portfolio/src/components/ui/asMarkShards.ts",
  "utf8"
);
const json = m.match(/AS_SHARDS: AsShard\[\] = (\[[\s\S]*\]);/)?.[1];
if (!json) throw new Error("no shards");
const arr = JSON.parse(json);

let minX = 1e9,
  minY = 1e9,
  maxX = -1e9,
  maxY = -1e9;

for (const s of arr) {
  const nums = s.d.match(/-?\d*\.?\d+/g)?.map(Number) || [];
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];
    if (x < 0 || y < 0 || x > 2000 || y > 2000) continue;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
}

const pad = 28;
const vb = `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(
  maxX -
  minX +
  pad * 2
).toFixed(1)} ${(maxY - minY + pad * 2).toFixed(1)}`;
console.log({ minX, minY, maxX, maxY, vb });

const next = m.replace(
  /export const AS_VIEWBOX = "[^"]+";/,
  `export const AS_VIEWBOX = "${vb}";`
);
fs.writeFileSync(
  "c:/Users/ASUS/development/portfolio/src/components/ui/asMarkShards.ts",
  next
);

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const markRaw = readFileSync(join(root, "public/as-mark.svg"), "utf8");

// Tight content box from asMarkShards AS_VIEWBOX — fills more of the icon
const vb = { x: 20.2, y: 84.4, w: 1456.2, h: 816.4 };
const canvas = 512;
const pad = 0.03; // ~3% margin so the mark reads large
const maxW = canvas * (1 - pad * 2);
const maxH = canvas * (1 - pad * 2);
const scale = Math.min(maxW / vb.w, maxH / vb.h);
const drawW = vb.w * scale;
const drawH = vb.h * scale;
const ox = (canvas - drawW) / 2;
const oy = (canvas - drawH) / 2;

const inner = markRaw
  .replace(/^\s*<\?xml[^>]*>\s*/i, "")
  .replace(/^\s*<svg[^>]*>/i, "")
  .replace(/<\/svg>\s*$/i, "");

// Transparent — no plate behind the mark
const iconSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas} ${canvas}" width="${canvas}" height="${canvas}">
  <svg x="${ox.toFixed(2)}" y="${oy.toFixed(2)}" width="${drawW.toFixed(2)}" height="${drawH.toFixed(2)}" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}" preserveAspectRatio="xMidYMid meet">
${inner}
  </svg>
</svg>
`;

writeFileSync(join(root, "src/app/icon.svg"), iconSvg);
writeFileSync(join(root, "public/icon.svg"), iconSvg);

async function makePng(size) {
  return sharp(Buffer.from(iconSvg))
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

function pngToIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  let offset = 6 + count * 16;
  const dirs = [];
  for (let i = 0; i < count; i++) {
    dirs.push({ size: sizes[i], data: pngBuffers[i], offset });
    offset += pngBuffers[i].length;
  }
  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  let o = 6;
  for (const d of dirs) {
    buf.writeUInt8(d.size >= 256 ? 0 : d.size, o);
    buf.writeUInt8(d.size >= 256 ? 0 : d.size, o + 1);
    buf.writeUInt8(0, o + 2);
    buf.writeUInt8(0, o + 3);
    buf.writeUInt16LE(1, o + 4);
    buf.writeUInt16LE(32, o + 6);
    buf.writeUInt32LE(d.data.length, o + 8);
    buf.writeUInt32LE(d.offset, o + 12);
    o += 16;
  }
  for (const d of dirs) d.data.copy(buf, d.offset);
  return buf;
}

const png32 = await makePng(32);
const png180 = await makePng(180);
const png512 = await makePng(512);

writeFileSync(join(root, "src/app/icon.png"), png32);
writeFileSync(join(root, "public/icon.png"), png32);
writeFileSync(join(root, "src/app/apple-icon.png"), png180);
writeFileSync(join(root, "public/apple-icon.png"), png180);
writeFileSync(join(root, "public/as-avatar.png"), png512);

const ico = pngToIco(
  [await makePng(16), await makePng(32), await makePng(48)],
  [16, 32, 48]
);
writeFileSync(join(root, "src/app/favicon.ico"), ico);
writeFileSync(join(root, "public/favicon.ico"), ico);

console.log("transparent SVG favicon ready (large mark, no bg)");

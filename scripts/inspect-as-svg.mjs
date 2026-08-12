import fs from "fs";

const s = fs.readFileSync(
  "c:/Users/ASUS/development/portfolio/public/AS.svg",
  "utf8"
);

// Try to find the actual drawable SVG after metadata
const afterMeta = s.replace(/<metadata>[\s\S]*?<\/metadata>/, "");
console.log("after meta len", afterMeta.length);
console.log("tail", afterMeta.slice(-2000));

// Also look for nested svg in metadata (base64/xml escaped?)
const inner = s.match(/<svg[^>]*viewBox="0 0 716 716"[\s\S]*?<\/svg>/);
console.log("inner found", !!inner);
if (inner) console.log("inner len", inner[0].length, inner[0].slice(0, 400));

const paths = [...afterMeta.matchAll(/<path\b([^>]*)\/?>/g)].map((m) => m[0].slice(0, 100));
console.log("outer paths sample", paths.slice(0, 5));
console.log("path count after meta", (afterMeta.match(/<path\b/g) || []).length);

import { createElement } from "react";

export default function Image({
  src,
  alt,
}: {
  src: string | { src: string };
  alt: string;
}) {
  const resolved = typeof src === "string" ? src : src.src;
  return createElement("img", { src: resolved, alt });
}

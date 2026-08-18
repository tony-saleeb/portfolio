export const SITE_NAME = "Antony Saleeb";
export const SITE_TITLE = "Antony Saleeb | Full-Stack & Applied-AI Engineer";
export const SITE_DESCRIPTION =
  "Antony Saleeb — full-stack and applied-AI engineer in Cairo. Real-time systems, orchestrated PyTorch models, and the Flutter and Next.js apps that ship them.";

export const DEFAULT_SITE_URL = "https://antonysaleeb.me";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

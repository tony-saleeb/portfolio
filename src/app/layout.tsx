import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionRail } from "@/components/ui/SectionRail";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
  preload: true,
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  // Secondary face — avoid preload warnings when mono isn't painted immediately.
  preload: false,
});

// Set NEXT_PUBLIC_SITE_URL once this is deployed to its real domain -
// required for correct absolute OG/Twitter image URLs and sitemap entries.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://antony-saleeb-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Antony Saleeb | Full-Stack & Applied-AI Engineer",
  description:
    "Portfolio of Antony Saleeb — real-time systems and applied-AI products, from orchestrated PyTorch models to the Flutter and Next.js apps that ship them.",
  openGraph: {
    title: "Antony Saleeb | Full-Stack & Applied-AI Engineer",
    description:
      "Real-time systems and applied-AI products, built end to end.",
    type: "website",
    locale: "en_US",
    siteName: "Antony Saleeb Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antony Saleeb | Full-Stack & Applied-AI Engineer",
    description: "Real-time systems and applied-AI products, built end to end.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06080d" },
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${newsreader.className} min-h-full flex flex-col bg-background text-foreground selection:bg-accent/25 selection:text-foreground`}>
        {/*
          Framer Motion bakes `initial` state (opacity:0, transform:translate...)
          into the SSR'd HTML for animated elements, and only animates them in
          after hydration. If JS fails to load or execute, that content is
          permanently blank. This rule only applies when the browser has JS
          disabled, so it never affects the animated experience when JS works.
        */}
        <noscript>
          <style>{`[style*="opacity:0"], [style*="opacity: 0"] { opacity: 1 !important; transform: none !important; clip-path: none !important; filter: none !important; }`}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-accent focus:text-background focus:font-semibold"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          <Navbar />
          <SectionRail />
          <main id="main-content" className="relative z-2 grow flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

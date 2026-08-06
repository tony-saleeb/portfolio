import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antony Saleeb | Full-Stack Developer",
  description: "Portfolio of Antony Saleeb, a Full-Stack Developer specializing in AI-enhanced and real-time applications.",
  openGraph: {
    title: "Antony Saleeb | Full-Stack Developer",
    description: "Portfolio of Antony Saleeb, a Full-Stack Developer specializing in AI-enhanced and real-time applications.",
    type: "website",
    locale: "en_US",
    siteName: "Antony Saleeb Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antony Saleeb | Full-Stack Developer",
    description: "Portfolio of Antony Saleeb, a Full-Stack Developer specializing in AI-enhanced and real-time applications.",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent/30 selection:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

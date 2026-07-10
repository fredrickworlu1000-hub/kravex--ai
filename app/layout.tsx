import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://kravex.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kravex AI — AI Automation & Lead Systems for Modern Teams",
    template: "%s · Kravex AI",
  },
  description:
    "Kravex AI designs and builds AI-powered lead automation, CRM integration, and outreach systems that turn manual pipelines into self-running revenue engines.",
  keywords: [
    "AI automation agency",
    "lead automation",
    "CRM integration",
    "AI agents",
    "Make.com automation",
    "Kravex AI",
  ],
  authors: [{ name: "Kravex AI" }],
  openGraph: {
    title: "Kravex AI — AI Automation & Lead Systems",
    description:
      "We design AI-powered automation pipelines that capture, qualify, and convert leads on autopilot.",
    url: "https://kravex-ai-2wur.vercel.app/",
    images: ["/og-image.png"],
    siteName: "Kravex AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kravex AI — AI Automation & Lead Systems",
    description:
      "We design AI-powered automation pipelines that capture, qualify, and convert leads on autopilot.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0D",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

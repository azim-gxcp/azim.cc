import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SearchDialog } from "@/components/search-dialog";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://azim.cc"),
  title: {
    default: "M Azim Abdul Majeed | Blog",
    template: "%s | azim.cc",
  },
  description:
    "Economics, Islamic finance, monetary architecture, and first-principles thinking about how money should work.",
  authors: [{ name: "M Azim Abdul Majeed" }],
  creator: "M Azim Abdul Majeed",
  publisher: "M Azim Abdul Majeed",
  keywords: [
    "Islamic finance",
    "economics",
    "finance",
    "monetary systems",
    "Bitcoin",
    "cryptocurrency",
    "blockchain",
    "riba",
    "Shariah compliance",
    "monetary policy",
    "fiat currency",
    "tokenomics",
    "Islamic economics",
  ],
  openGraph: {
    title: "M Azim Abdul Majeed | Blog",
    description:
      "Economics, Islamic finance, monetary architecture, and first-principles thinking about how money should work.",
    type: "website",
    url: "https://azim.cc",
    siteName: "azim.cc",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    creator: "@EduTechOne",
  },
  alternates: {
    canonical: "https://azim.cc",
    types: {
      "application/rss+xml": "https://azim.cc/feed.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;500;600&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "azim.cc",
              url: "https://azim.cc",
              description:
                "Economics, Islamic finance, monetary architecture, and first-principles thinking about how money should work.",
              author: {
                "@type": "Person",
                name: "M Azim Abdul Majeed",
                url: "https://azim.cc/about",
                sameAs: [
                  "https://x.com/EduTechOne",
                  "https://www.linkedin.com/in/azim-gx/",
                ],
              },
            }),
          }}
        />
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <SearchDialog />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

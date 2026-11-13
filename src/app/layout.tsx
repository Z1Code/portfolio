import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://7uanf.com";
const TITLE = "Juan Fernandez — AI Pipeline Engineer in Santiago, Chile";
const DESCRIPTION =
  "Juan Fernandez is an AI Pipeline Engineer based in Santiago, Chile. He builds production AI agents, multi-agent systems and LLM pipelines (Claude, GPT, MCP), and the full-stack apps around them. Ingeniero de pipelines de IA en Santiago, Chile.";

const SAME_AS = [
  "https://www.linkedin.com/in/juan-fernandez7",
  "https://x.com/7uanF",
  "https://github.com/Z1Code",
  "https://www.instagram.com/7uanf/",
  "https://www.tiktok.com/@7uanf",
  "https://passionfroot.me/juan",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Juan Fernandez", url: SITE_URL }],
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Juan Fernandez",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["es_CL"],
    firstName: "Juan",
    lastName: "Fernandez",
    username: "7uanF",
  },
  twitter: {
    card: "summary_large_image",
    site: "@7uanF",
    creator: "@7uanF",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    shortcut: "/icon.svg?v=2",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Juan Fernandez",
      alternateName: ["Juan Fernández", "7uanF"],
      url: SITE_URL,
      jobTitle: "AI Pipeline Engineer",
      description: DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
      homeLocation: { "@type": "City", name: "Santiago, Chile" },
      knowsAbout: [
        "AI agents",
        "Multi-agent systems",
        "LLM pipelines",
        "Model Context Protocol (MCP)",
        "Function calling",
        "Claude",
        "GPT",
        "Next.js",
        "TypeScript",
        "PostgreSQL",
      ],
      knowsLanguage: ["es", "en"],
      sameAs: SAME_AS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Juan Fernandez",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

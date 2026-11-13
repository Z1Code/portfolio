import type { Metadata } from "next";
import AboutPage from "../components/AboutPage";

const title = "About — Juan Fernandez, AI Pipeline Engineer in Santiago, Chile";
const description =
  "Juan Fernandez is an AI Pipeline Engineer in Santiago, Chile: production AI agents, multi-agent systems and LLM pipelines with Claude, GPT and MCP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
    languages: { "es-CL": "/sobre-mi", en: "/about", "x-default": "/about" },
  },
  openGraph: {
    type: "profile",
    url: "https://7uanf.com/about",
    siteName: "Juan Fernandez",
    title,
    description,
    locale: "en_US",
    alternateLocale: ["es_CL"],
  },
  twitter: { card: "summary", creator: "@7uanF", title, description },
};

export default function Page() {
  return <AboutPage lang="en" />;
}

import type { Metadata } from "next";
import AboutPage from "../components/AboutPage";

const title = "Sobre mí — Juan Fernández, ingeniero de IA en Santiago, Chile";
const description =
  "Juan Fernández es AI Pipeline Engineer en Santiago, Chile: agentes de IA en producción, sistemas multi-agente y pipelines de LLM con Claude, GPT y MCP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/sobre-mi",
    languages: { "es-CL": "/sobre-mi", en: "/about", "x-default": "/about" },
  },
  openGraph: {
    type: "profile",
    url: "https://7uanf.com/sobre-mi",
    siteName: "Juan Fernandez",
    title,
    description,
    locale: "es_CL",
    alternateLocale: ["en_US"],
  },
  twitter: { card: "summary", creator: "@7uanF", title, description },
};

export default function Page() {
  return <AboutPage lang="es" />;
}

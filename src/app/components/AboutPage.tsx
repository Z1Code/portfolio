import Link from "next/link";

const SITE_URL = "https://7uanf.com";

type Lang = "es" | "en";

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/juan-fernandez7" },
  { label: "X (@7uanF)", href: "https://x.com/7uanF" },
  { label: "GitHub (Z1Code)", href: "https://github.com/Z1Code" },
  { label: "Instagram", href: "https://www.instagram.com/7uanf/" },
  { label: "TikTok", href: "https://www.tiktok.com/@7uanf" },
  { label: "WhatsApp", href: "https://wa.me/56937111513" },
  { label: "Passionfroot", href: "https://passionfroot.me/juan" },
];

const content = {
  es: {
    path: "/sobre-mi",
    otherPath: "/about",
    otherLabel: "Read in English",
    eyebrow: "Sobre mí",
    h1: "Juan Fernández, ingeniero de IA en Santiago, Chile",
    lead:
      "Juan Fernández es un AI Pipeline Engineer (ingeniero de pipelines de IA) radicado en Santiago, Chile. Diseña y construye agentes de IA en producción, sistemas multi-agente y pipelines de LLM con Claude, GPT y Model Context Protocol (MCP), además de las aplicaciones full stack que los rodean.",
    sections: [
      {
        h2: "Qué hago",
        items: [
          "Agentes de IA en producción: patrones de delegación, memoria persistente y LLMs conectados a herramientas reales mediante function calling y MCP.",
          "Pipelines de LLM y automatización: scraping, enriquecimiento y procesamiento de datos con modelos de lenguaje, de punta a punta.",
          "Productos full stack con Next.js, TypeScript y PostgreSQL: desde el esquema de la base de datos hasta el despliegue.",
          "Contenido técnico sobre IA en X: empresas de IA me contratan para mostrar sus productos haciendo trabajo real.",
        ],
      },
      {
        h2: "Experiencia",
        items: [
          "AI Pipeline Engineer en una startup respaldada por Y Combinator (en modo stealth): llevo un producto de 0 a 1 sobre una arquitectura de agentes.",
          "Web Team Leader / AI en Globant: lideré un equipo de 8 ingenieros y diseñé sistemas multi-agente en producción.",
          "Creador de contenido de IA para viktor, Gamma, Luma AI, Replit, Modulate, Replay, Pollo.ai, Skygen y Matrix OS.",
        ],
      },
      {
        h2: "Proyectos",
        items: [
          "iCopy: copia de seguridad de iCloud Fotos para Windows, completa, verificada y sin cortes. Es mi proyecto open source más popular en GitHub.",
          "PokeScan: radar de precios de cartas TCG sobre más de 14.000 cartas, con pipelines de datos que se actualizan a diario.",
          "APR Transports: sitio web y panel de despacho para una transportista de carga en Estados Unidos.",
          "FashionModelAI: de una foto de una prenda a imágenes de modelo listas para producción en 4K.",
          "gcp-oauth-automator: automatiza la creación de clientes OAuth 2.0 de Google Cloud con Playwright.",
        ],
      },
    ],
    stackH2: "Tecnologías",
    faqH2: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Dónde está basado Juan Fernández?",
        a: "En Santiago, Chile. Trabaja de forma remota con equipos de Chile, Latinoamérica y Estados Unidos.",
      },
      {
        q: "¿En qué se especializa?",
        a: "En ingeniería de IA aplicada: agentes de IA, sistemas multi-agente, pipelines de LLM, MCP y la infraestructura full stack para ponerlos en producción.",
      },
      {
        q: "¿Cómo contactarlo?",
        a: "Por LinkedIn, por X (@7uanF) o por WhatsApp. Para colaboraciones con marcas, en passionfroot.me/juan.",
      },
    ],
    linksH2: "Enlaces",
    back: "Volver al portafolio",
  },
  en: {
    path: "/about",
    otherPath: "/sobre-mi",
    otherLabel: "Leer en español",
    eyebrow: "About",
    h1: "Juan Fernandez, AI Pipeline Engineer in Santiago, Chile",
    lead:
      "Juan Fernandez is an AI Pipeline Engineer based in Santiago, Chile. He designs and builds production AI agents, multi-agent systems and LLM pipelines with Claude, GPT and the Model Context Protocol (MCP), plus the full-stack applications around them.",
    sections: [
      {
        h2: "What I do",
        items: [
          "Production AI agents: delegation patterns, persistent memory, and LLMs wired to real tools through function calling and MCP.",
          "LLM pipelines and automation: scraping, enrichment and data processing with language models, end to end.",
          "Full-stack products with Next.js, TypeScript and PostgreSQL, from the database schema to deployment.",
          "Technical AI content on X: AI companies hire me to show their products doing real work.",
        ],
      },
      {
        h2: "Experience",
        items: [
          "AI Pipeline Engineer at a YC-backed startup (stealth), taking a product from 0 to 1 on an agent architecture.",
          "Web Team Leader / AI at Globant: led a team of 8 engineers and architected production multi-agent systems.",
          "AI content creator for viktor, Gamma, Luma AI, Replit, Modulate, Replay, Pollo.ai, Skygen and Matrix OS.",
        ],
      },
      {
        h2: "Projects",
        items: [
          "iCopy: complete, verified and uninterrupted iCloud Photos backup for Windows. My most popular open-source project on GitHub.",
          "PokeScan: TCG card price radar across 14,000+ cards, with data pipelines updated daily.",
          "APR Transports: website and dispatch panel for a US freight carrier.",
          "FashionModelAI: one garment photo to production-ready model imagery in 4K.",
          "gcp-oauth-automator: automates Google Cloud OAuth 2.0 client creation with Playwright.",
        ],
      },
    ],
    stackH2: "Stack",
    faqH2: "FAQ",
    faq: [
      {
        q: "Where is Juan Fernandez based?",
        a: "Santiago, Chile. He works remotely with teams in Chile, Latin America and the United States.",
      },
      {
        q: "What does he specialize in?",
        a: "Applied AI engineering: AI agents, multi-agent systems, LLM pipelines, MCP and the full-stack infrastructure to run them in production.",
      },
      {
        q: "How can I contact him?",
        a: "On LinkedIn, on X (@7uanF) or by WhatsApp. For brand collaborations, at passionfroot.me/juan.",
      },
    ],
    linksH2: "Links",
    back: "Back to portfolio",
  },
} as const;

const STACK = [
  "Claude", "GPT", "MCP", "Python", "Playwright",
  "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker",
];

export default function AboutPage({ lang }: { lang: Lang }) {
  const c = content[lang];
  const url = `${SITE_URL}${c.path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: c.h1,
        inLanguage: lang === "es" ? "es-CL" : "en",
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang === "es" ? "es-CL" : "en",
        mainEntity: c.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main lang={lang === "es" ? "es-CL" : "en"} className="min-h-screen bg-black px-6 py-16 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-2xl">
        <nav className="mb-12 flex items-center justify-between text-sm text-white/50">
          <Link href="/" className="transition hover:text-white">← {c.back}</Link>
          <Link href={c.otherPath} hrefLang={lang === "es" ? "en" : "es-CL"} className="transition hover:text-white">
            {c.otherLabel}
          </Link>
        </nav>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">{c.eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{c.h1}</h1>
        <p className="mt-6 text-lg leading-8 text-white/70">{c.lead}</p>

        {c.sections.map((s) => (
          <section key={s.h2} className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">{s.h2}</h2>
            <ul className="space-y-3 text-white/70">
              {s.items.map((it) => (
                <li key={it} className="flex gap-3 leading-7">
                  <span aria-hidden className="mt-3 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">{c.stackH2}</h2>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((t) => (
              <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/70">{t}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">{c.faqH2}</h2>
          <dl className="space-y-5">
            {c.faq.map((f) => (
              <div key={f.q}>
                <dt className="font-medium">{f.q}</dt>
                <dd className="mt-1 leading-7 text-white/70">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">{c.linksH2}</h2>
          <ul className="flex flex-wrap gap-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}

/**
 * Catálogo de los tiles de la portada.
 *
 * Es la **única lista**: la portada ordena sus tarjetas con el orden guardado desde
 * el panel (`project-order.json`) y el panel arma su lista desde acá. El orden de
 * este array es el **orden por defecto**, el que se ve mientras nadie haya guardado
 * uno propio.
 *
 * Las miniaturas son el primer cuadro de cada tile (las secuencias de imágenes ya
 * son cuadros sueltos en `public/`), para que la lista del panel se parezca a la
 * portada sin montar los doce componentes animados a la vez.
 */

export const PROJECT_KEYS = [
  "velocity",
  "prolevelcode",
  "ivania",
  "l2j",
  "gcpOauth",
  "garru",
  "doblez",
  "sosvenezuela",
  "pokescan",
  "apr",
  "caiena",
  "knead",
] as const;

export type ProjectKey = (typeof PROJECT_KEYS)[number];

export type Project = {
  key: ProjectKey;
  /** Nombre que se ve en la tarjeta de la portada y en la lista del panel. */
  name: string;
  /** Miniatura para el panel: el primer cuadro del tile. */
  thumb: string;
};

export const PROJECTS: Project[] = [
  { key: "velocity", name: "VelocitySetups", thumb: "/sequence/ezgif-frame-001.webp" },
  { key: "prolevelcode", name: "ProLevelCode", thumb: "/sequence3/ezgif-frame-001.jpg" },
  { key: "ivania", name: "IvaniaBeauty", thumb: "/sequence2/ezgif-frame-001.jpg" },
  { key: "l2j", name: "L2J · Online Game Servers", thumb: "/sequence-l2j/frame-01.webp" },
  { key: "gcpOauth", name: "gcp-oauth-automator", thumb: "" },
  { key: "garru", name: "Garru", thumb: "/garru-hero-bear.png" },
  { key: "doblez", name: "Doblez Empanadas", thumb: "/doblez-empanadas.png" },
  { key: "sosvenezuela", name: "SOS Venezuela 2026", thumb: "/sosvenezuela-banner.png" },
  { key: "pokescan", name: "PokeScan", thumb: "/pokescan-dashboard.png" },
  { key: "apr", name: "APR Transports", thumb: "/apr-hero-poster.jpg" },
  { key: "caiena", name: "Caiena Nails", thumb: "/caiena-nails.webp" },
  { key: "knead", name: "Knead & Feed Sourdough", thumb: "/knead-sourdough.webp" },
];

export const DEFAULT_ORDER: ProjectKey[] = PROJECTS.map((project) => project.key);

const esClave = (value: unknown): value is ProjectKey =>
  typeof value === "string" && (PROJECT_KEYS as readonly string[]).includes(value);

/**
 * Deja un orden guardado en algo utilizable.
 *
 * Nunca devuelve una lista incompleta: descarta lo que no sea una clave conocida,
 * quita repetidos y agrega al final los proyectos que falten, en el orden por
 * defecto. Así un archivo viejo (guardado antes de agregar un proyecto) no puede
 * hacer desaparecer una tarjeta de la portada.
 */
export function normalizeOrder(value: unknown): ProjectKey[] {
  const lista = Array.isArray(value) ? value : [];
  const vistas = new Set<ProjectKey>();
  const orden: ProjectKey[] = [];

  for (const item of lista) {
    if (!esClave(item) || vistas.has(item)) continue;
    vistas.add(item);
    orden.push(item);
  }

  for (const key of DEFAULT_ORDER) {
    if (!vistas.has(key)) orden.push(key);
  }

  return orden;
}

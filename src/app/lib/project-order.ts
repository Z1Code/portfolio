import { promises as fs } from "node:fs";
import path from "node:path";
import { DEFAULT_ORDER, normalizeOrder, type ProjectKey } from "../projects";

/**
 * Datos que sobreviven a los despliegues.
 *
 * Viven **fuera de la imagen** (Docker monta una carpeta del VPS en `/data`): cada
 * deploy reconstruye la imagen y arranca un contenedor nuevo, así que lo que se
 * guarde dentro del contenedor se pierde. Acá van dos archivos:
 *
 * - `project-order.json` — el orden de los tiles de la portada (lo escribe el panel).
 * - `admin-password` — la contraseña del panel; la crea el dueño en el servidor y la
 *   aplicación solo la lee (así el secreto nunca pasa por el repositorio).
 */

export const DATA_DIR = process.env.DATA_DIR ?? "/data";

const ORDER_FILE = path.join(DATA_DIR, "project-order.json");
const PASSWORD_FILE = process.env.ADMIN_PASSWORD_FILE ?? path.join(DATA_DIR, "admin-password");

/** Orden guardado; si no hay archivo (o está roto) devuelve el de por defecto. */
export async function readProjectOrder(): Promise<ProjectKey[]> {
  try {
    const raw = await fs.readFile(ORDER_FILE, "utf8");
    return normalizeOrder(JSON.parse(raw));
  } catch {
    return DEFAULT_ORDER;
  }
}

/** Guarda el orden y devuelve el que quedó escrito (ya normalizado). */
export async function writeProjectOrder(value: unknown): Promise<ProjectKey[]> {
  const order = normalizeOrder(value);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(ORDER_FILE, `${JSON.stringify(order, null, 2)}\n`, "utf8");
  return order;
}

/**
 * La contraseña del panel, o `null` si todavía no está configurada.
 *
 * Se exige un mínimo de 8 caracteres para que un archivo vacío o de prueba no deje
 * el panel abierto: sin contraseña, el panel queda deshabilitado (no hay login).
 */
export async function readAdminPassword(): Promise<string | null> {
  try {
    const raw = (await fs.readFile(PASSWORD_FILE, "utf8")).trim();
    return raw.length >= 8 ? raw : null;
  } catch {
    return null;
  }
}

export const ADMIN_PASSWORD_PATH = PASSWORD_FILE;

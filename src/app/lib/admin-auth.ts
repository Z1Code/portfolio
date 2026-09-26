import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { readAdminPassword } from "./project-order";

/**
 * Acceso al panel.
 *
 * No hay usuarios ni base de datos: el panel lo abre **una sola persona**, así que
 * la contraseña vive en un archivo del servidor (`/data/admin-password`) y la sesión
 * es una cookie firmada con esa misma contraseña. Nada de secretos en el repositorio
 * y nada extra que configurar en el despliegue.
 *
 * Detalles que importan:
 * - La comparación de la contraseña es de **tiempo constante** (`timingSafeEqual`):
 *   comparar con `===` filtra la contraseña por el tiempo de respuesta.
 * - La cookie lleva la fecha de vencimiento firmada; si alguien la edita, la firma no
 *   cierra. Cambiar la contraseña invalida todas las sesiones (la clave de firma sale
 *   de ella).
 * - `HttpOnly` + `SameSite=Lax` + `Secure`: no la lee el navegador y no viaja en
 *   peticiones de otros sitios.
 */

const COOKIE = "portfolio_admin";
const DIAS = 30;

const claveDeFirma = (password: string) =>
  createHmac("sha256", "portfolio-admin-v1").update(password).digest();

const firmaDe = (expira: number, password: string) =>
  createHmac("sha256", claveDeFirma(password))
    .update(String(expira))
    .digest("base64url");

/** ¿Es la contraseña correcta? Sin contraseña configurada, siempre que no. */
export async function checkPassword(candidate: string): Promise<boolean> {
  const real = await readAdminPassword();
  if (!real) return false;

  const esperada = Buffer.from(real);
  const recibida = Buffer.from(candidate);
  if (esperada.length !== recibida.length) return false;
  return timingSafeEqual(esperada, recibida);
}

/** Abre sesión: cookie firmada que vence en 30 días. */
export async function createSession(password: string): Promise<void> {
  const expira = Date.now() + DIAS * 24 * 60 * 60 * 1000;
  const store = await cookies();

  store.set(COOKIE, `${expira}.${firmaDe(expira, password)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: DIAS * 24 * 60 * 60,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

/** ¿La petición viene de una sesión válida? */
export async function isAdmin(): Promise<boolean> {
  const [password, store] = await Promise.all([readAdminPassword(), cookies()]);
  if (!password) return false;

  const valor = store.get(COOKIE)?.value;
  if (!valor) return false;

  const [expiraTexto, firma] = valor.split(".");
  const expira = Number(expiraTexto);
  if (!Number.isFinite(expira) || expira < Date.now() || !firma) return false;

  const esperada = Buffer.from(firmaDe(expira, password));
  const recibida = Buffer.from(firma);
  if (esperada.length !== recibida.length) return false;
  return timingSafeEqual(esperada, recibida);
}

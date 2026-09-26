import { NextResponse } from "next/server";
import { checkPassword, createSession, destroySession } from "../../../lib/admin-auth";
import { readAdminPassword } from "../../../lib/project-order";

/** Abre la sesión del panel con la contraseña del archivo del servidor. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";

  // Sin contraseña configurada el panel no existe: no hay nada que comparar.
  if (!(await readAdminPassword())) {
    return NextResponse.json({ error: "sin-configurar" }, { status: 503 });
  }

  if (!(await checkPassword(password))) {
    return NextResponse.json({ error: "clave" }, { status: 401 });
  }

  await createSession(password);
  return NextResponse.json({ ok: true });
}

/** Cierra la sesión. */
export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}

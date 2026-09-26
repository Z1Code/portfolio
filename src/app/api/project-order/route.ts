import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdmin } from "../../lib/admin-auth";
import { readProjectOrder, writeProjectOrder } from "../../lib/project-order";

/** Orden vigente de los tiles (lo lee la portada y la lista del panel). */
export async function GET() {
  return NextResponse.json({ order: await readProjectOrder() });
}

/** Guarda el orden que mandó el panel. Solo con sesión abierta. */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "sin-sesion" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { order?: unknown } | null;

  try {
    const order = await writeProjectOrder(body?.order);
    // La portada se armó con el orden viejo: se invalida para que el próximo
    // visitante (y el propio panel, si abre la portada) la vea ya ordenada.
    revalidatePath("/");
    return NextResponse.json({ ok: true, order });
  } catch (error) {
    return NextResponse.json(
      { error: "escritura", detalle: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

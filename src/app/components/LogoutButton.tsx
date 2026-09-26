"use client";

import { useState } from "react";

/** Cierra la sesión del panel y vuelve a mostrar el formulario de entrada. */
export default function LogoutButton() {
  const [saliendo, setSaliendo] = useState(false);

  return (
    <button
      type="button"
      disabled={saliendo}
      onClick={async () => {
        setSaliendo(true);
        await fetch("/api/admin/session", { method: "DELETE" }).catch(() => {});
        window.location.reload();
      }}
      className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-bold text-white/60 transition-colors hover:text-white disabled:opacity-40"
    >
      {saliendo ? "Saliendo…" : "Cerrar sesión"}
    </button>
  );
}

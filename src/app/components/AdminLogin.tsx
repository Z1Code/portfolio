"use client";

import { useState } from "react";

/** Formulario de entrada al panel: una sola contraseña, sin usuarios. */
export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function entrar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      const respuesta = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (respuesta.ok) {
        // La cookie ya viajó: se recarga para que el servidor arme el panel.
        window.location.reload();
        return;
      }

      setError(
        respuesta.status === 503
          ? "El panel todavía no tiene contraseña configurada en el servidor."
          : "Contraseña incorrecta."
      );
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={entrar}
      className="grid max-w-sm gap-3 rounded-xl border border-white/10 bg-[#0b0f16] p-5"
    >
      <label className="grid gap-1.5">
        <span className="text-xs font-semibold text-white/60">Contraseña</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          autoFocus
          className="rounded-md border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-blue-400"
        />
      </label>

      <button
        type="submit"
        disabled={enviando || password.length === 0}
        className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {enviando ? "Entrando…" : "Entrar"}
      </button>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}

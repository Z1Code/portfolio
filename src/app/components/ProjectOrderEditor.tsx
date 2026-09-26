"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reorder, useDragControls } from "motion/react";
import { DEFAULT_ORDER, type Project, type ProjectKey } from "../projects";

type Estado = "listo" | "guardando" | "guardado" | "error";

/**
 * Orden de los tiles de la portada, arrastrando.
 *
 * El arrastre empieza en el **asa** y no en toda la fila: si la fila entera fuera
 * arrastrable, en el teléfono no se podría desplazar la lista con el dedo (cada
 * intento movería un tile).
 */
function Fila({
  proyecto,
  posicion,
}: {
  proyecto: Project;
  posicion: number;
}) {
  const controls = useDragControls();
  const [arrastrando, setArrastrando] = useState(false);

  return (
    <Reorder.Item
      value={proyecto.key}
      dragListener={false}
      dragControls={controls}
      onDragStart={() => setArrastrando(true)}
      onDragEnd={() => setArrastrando(false)}
      className={`flex items-center gap-4 rounded-xl border bg-[#0b0f16] p-3 transition-colors ${
        arrastrando ? "border-blue-400/60 shadow-lg" : "border-white/10"
      }`}
    >
      <span className="w-6 shrink-0 text-center text-xs font-bold tabular-nums text-white/30">
        {posicion + 1}
      </span>

      <span className="relative h-[54px] w-24 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/0">
        {proyecto.thumb ? (
          <Image
            src={proyecto.thumb}
            alt=""
            width={96}
            height={54}
            className="h-full w-full object-cover"
          />
        ) : null}
      </span>

      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
        {proyecto.name}
      </span>

      <button
        type="button"
        onPointerDown={(event) => controls.start(event)}
        aria-label={`Mover ${proyecto.name}`}
        className="shrink-0 cursor-grab touch-none rounded-md border border-white/10 px-3 py-2 text-white/50 transition-colors hover:border-white/30 hover:text-white active:cursor-grabbing"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <circle cx="7" cy="5" r="1.4" />
          <circle cx="13" cy="5" r="1.4" />
          <circle cx="7" cy="10" r="1.4" />
          <circle cx="13" cy="10" r="1.4" />
          <circle cx="7" cy="15" r="1.4" />
          <circle cx="13" cy="15" r="1.4" />
        </svg>
      </button>
    </Reorder.Item>
  );
}

export function ProjectOrderEditor({
  order,
  projects,
}: {
  order: ProjectKey[];
  projects: Project[];
}) {
  const [items, setItems] = useState<ProjectKey[]>(order);
  const [guardado, setGuardado] = useState<ProjectKey[]>(order);
  const [estado, setEstado] = useState<Estado>("listo");

  const catalogo = useMemo(() => new Map(projects.map((p) => [p.key, p])), [projects]);

  const cambiado = items.join("|") !== guardado.join("|");
  const enDefecto = items.join("|") === DEFAULT_ORDER.join("|");

  async function guardar(nuevo: ProjectKey[]) {
    setEstado("guardando");
    try {
      const respuesta = await fetch("/api/project-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: nuevo }),
      });
      if (!respuesta.ok) throw new Error(String(respuesta.status));

      const datos = (await respuesta.json()) as { order: ProjectKey[] };
      setItems(datos.order);
      setGuardado(datos.order);
      setEstado("guardado");
    } catch {
      setEstado("error");
    }
  }

  return (
    <div className="grid gap-5">
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="grid gap-2"
        aria-label="Orden de los proyectos"
      >
        {items.map((key, index) => {
          // Un orden guardado siempre pasa por `normalizeOrder`, así que todas las
          // claves existen en el catálogo; si alguna igual faltara, se saltea la fila
          // en vez de romper la pantalla.
          const proyecto = catalogo.get(key);
          if (!proyecto) return null;
          return <Fila key={key} proyecto={proyecto} posicion={index} />;
        })}
      </Reorder.Group>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => guardar(items)}
          disabled={!cambiado || estado === "guardando"}
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {estado === "guardando" ? "Guardando…" : "Guardar orden"}
        </button>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-white/15 px-5 py-3 text-sm font-bold text-white/70 transition-colors hover:text-white"
        >
          Ver la portada
        </a>

        <button
          type="button"
          onClick={() => setItems([...DEFAULT_ORDER])}
          disabled={enDefecto || estado === "guardando"}
          className="text-sm font-semibold text-white/40 transition-colors hover:text-white/80 disabled:opacity-40"
        >
          Volver al orden original
        </button>

        <span className="text-sm text-white/50" aria-live="polite">
          {estado === "guardado" && !cambiado ? "Orden guardado." : null}
          {estado === "error" ? (
            <span className="text-red-400">
              No se pudo guardar. Revise que la carpeta de datos sea escribible.
            </span>
          ) : null}
          {cambiado && estado !== "guardando" ? "Hay cambios sin guardar." : null}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-white/35">
        La portada muestra los tiles en este orden, de arriba a abajo (en pantallas anchas
        se reparte en tres columnas, leyendo de izquierda a derecha).
      </p>
    </div>
  );
}

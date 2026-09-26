"use client";

import { memo } from "react";

/**
 * Tile animado del proyecto APR Transports.
 *
 * La animación es **la del propio sitio**: la banda del hero, el camión en la ruta.
 * Se sirve recortada a 960x540 y sin audio (497 KB en vez de 1,34 MB) porque en la
 * tarjeta se ve a unos 380x192; el póster (27 KB) evita el cuadro negro mientras
 * carga el video, y `muted` + `playsInline` son la condición para que el navegador
 * permita el autoplay.
 */
function AprTileInner() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/apr-hero-poster.jpg"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
        <source src="/apr-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </>
  );
}

const AprTile = memo(AprTileInner);
AprTile.displayName = "AprTile";

export default AprTile;

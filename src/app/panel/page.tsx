import { redirect } from "next/navigation";

/**
 * El panel vivió unas horas en `/panel`; la ruta buena es `/admin`.
 * Esto queda para que un enlace guardado no termine en un 404.
 */
export default function PanelViejo() {
  redirect("/admin");
}

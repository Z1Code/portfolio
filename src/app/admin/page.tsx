import type { Metadata } from "next";
import { AdminLogin } from "../components/AdminLogin";
import { ProjectOrderEditor } from "../components/ProjectOrderEditor";
import { isAdmin } from "../lib/admin-auth";
import { ADMIN_PASSWORD_PATH, readAdminPassword, readProjectOrder } from "../lib/project-order";
import { PROJECTS } from "../projects";
import LogoutButton from "../components/LogoutButton";

/**
 * Panel de la portada.
 *
 * Vive en `/admin`. Ojo con esta ruta en el servidor: el vhost de nginx tenía
 * `location /admin/` apuntando a otro panel (Clawbot, puerto 3010) que ya no existe, y
 * por eso `/admin/` daba 502. Ahora nginx le pasa las dos formas a esta aplicación
 * (`location = /admin` + `location ^~ /admin/`), como está hecho con /empanadas y /garru:
 * redirigir en nginx armaría un bucle con el 308 que responde Next.
 *
 * Lee la contraseña y el orden del disco en cada visita: no se cachea nada.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel · 7uanf.com",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const [authed, order, password] = await Promise.all([
    isAdmin(),
    readProjectOrder(),
    readAdminPassword(),
  ]);

  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-14 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
              7uanf.com
            </p>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight">Panel</h1>
            <p className="mt-2 text-sm text-white/50">
              Orden de los proyectos en la portada. Arrastre cada tile desde el asa.
            </p>
          </div>
          {authed && <LogoutButton />}
        </div>

        <div className="mt-8">
          {!password ? (
            // Sin contraseña el panel no se puede abrir, y decirlo es más útil que
            // mostrar un formulario que no va a funcionar.
            <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-5">
              <h2 className="text-sm font-bold text-amber-300">Falta configurar la contraseña</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                El panel lee la clave de <code className="text-white/80">{ADMIN_PASSWORD_PATH}</code>{" "}
                en el servidor. Se crea una vez, por SSH, sin pasar por el repositorio:
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-black/50 p-3 text-[12px] leading-relaxed text-white/70">
                {`mkdir -p /var/www/7uanf-data
printf '%s' "$(openssl rand -base64 18)" | tee /var/www/7uanf-data/admin-password
chmod 600 /var/www/7uanf-data/admin-password
chown 1001:1001 /var/www/7uanf-data /var/www/7uanf-data/admin-password`}
              </pre>
              <p className="mt-3 text-[12px] text-white/40">
                El comando imprime la clave: guárdela, es la que se escribe en el panel.
              </p>
            </div>
          ) : authed ? (
            <ProjectOrderEditor order={order} projects={PROJECTS} />
          ) : (
            <AdminLogin />
          )}
        </div>
      </div>
    </main>
  );
}

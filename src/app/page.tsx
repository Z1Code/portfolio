import { LanguageProvider } from "./i18n/LanguageContext";
import PortfolioHome from "./components/PortfolioHome";
import { readProjectOrder } from "./lib/project-order";

/**
 * La portada lee acá el orden de los tiles y se lo pasa a la parte de cliente.
 *
 * Es dinámica a propósito: el orden lo cambia el panel en cualquier momento y tiene
 * que verse en la próxima visita, sin esperar a un despliegue.
 */
export const dynamic = "force-dynamic";

export default async function Home() {
  const order = await readProjectOrder();

  return (
    <LanguageProvider>
      <PortfolioHome order={order} />
    </LanguageProvider>
  );
}

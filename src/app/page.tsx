"use client";

import { LanguageProvider } from "./i18n/LanguageContext";
import PortfolioHome from "./components/PortfolioHome";

export default function Home() {
  return (
    <LanguageProvider>
      <PortfolioHome />
    </LanguageProvider>
  );
}

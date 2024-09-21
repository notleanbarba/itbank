import Header from "@app/homebanking/Header.tsx";
import Footer from "@app/homebanking/Footer.tsx";

import type { ReactNode } from "react";

export default function HomebankingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>
      <main className="flex-grow">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

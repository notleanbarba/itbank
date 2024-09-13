import Header from "@app/homebanking/Header.tsx";
import Footer from "@app/homebanking/Footer.tsx";

import type { ReactNode } from "react";

export default function HomebankingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

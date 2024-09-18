import { Roboto_Mono } from "next/font/google";
import "@app/global.scss";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ITBANK homebanking",
  description:
    "Banco Futuro ofrece cuentas flexibles, préstamos accesibles y herramientas de inversión innovadoras. Disfruta de banca en línea segura y atención personalizada para lograr tus objetivos financieros.",
};

const roboto = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}

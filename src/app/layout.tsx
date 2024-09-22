import { Roboto_Mono } from "next/font/google";
import "@app/global.scss";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Argentarius homebanking",
  description:
    "Banco Argentarius ofrece cuentas flexibles, préstamos accesibles y herramientas de inversión innovadoras. Disfruta de banca en línea segura y atención personalizada para lograr tus objetivos financieros.",
  robots: {
    index: true,
    follow: true,
  },
};

const roboto = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}

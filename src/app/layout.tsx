import { Roboto_Mono } from "next/font/google";
import "@app/global.scss";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ClientProvider } from "@/app/context/ClienteContext";

export const metadata: Metadata = {
  title: "ITBANK homebanking",
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
      <body className={roboto.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

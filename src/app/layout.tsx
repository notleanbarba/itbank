import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@app/global.scss";

import Login from "@app/page.tsx";
import HomebankingLayout from "@app/homebanking/layout.tsx";
import Home from "@app/homebanking/page.tsx";
import Cuentas from "@app/homebanking/cuentas/page.tsx";
import Inversiones from "@app/homebanking/inversiones/page.tsx";
import Pagos from "@app/homebanking/pagos/page.tsx";
import Prestamos from "@app/homebanking/prestamos/page.tsx";
import Transferencias from "@app/homebanking/transferencias/page.tsx";

const router = createBrowserRouter(
  [
    {
      index: true,
      element: <Login />,
    },
    {
      path: "homebanking",
      element: <HomebankingLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cuentas",
          element: <Cuentas />,
        },
        {
          path: "inversiones",
          element: <Inversiones />,
        },
        {
          path: "pagos",
          element: <Pagos />,
        },
        {
          path: "prestamos",
          element: <Prestamos />,
        },
        {
          path: "transferencias",
          element: <Transferencias />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

createRoot(
  document.getElementById("root") ??
    document.body.appendChild(
      Object.assign(document.createElement("div"), { id: "root" }),
    ),
).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

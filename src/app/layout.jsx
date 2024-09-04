import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./global.scss";

import Login from "./page.tsx";
import HomebankingLayout from "./homebanking/layout.tsx";
import Home from "./homebanking/page.tsx";
import Cuentas from "./homebanking/cuentas/page.tsx";
import Inversiones from "./homebanking/inversiones/page.tsx";
import Pagos from "./homebanking/pagos/page.tsx";
import Prestamos from "./homebanking/prestamos/page.tsx";
import Transferencias from "./homebanking/transferencias/page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
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
]);

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

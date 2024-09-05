import {Route, Routes } from "react-router-dom";
import Cuentas from "./cuentas/page.tsx";
import Home from "./page.tsx";
import Inversiones from "./inversiones/page.tsx";
import Pagos from "./pagos/page.tsx";
import Prestamos from "./prestamos/page.tsx";
import Transferencias from "./transferencias/page.tsx";


export default function HomebankingLayout() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cuentas" element={<Cuentas />} />
      <Route path="inversiones" element={<Inversiones />} />
      <Route path="pagos" element={<Pagos />} />
      <Route path="prestamos" element={<Prestamos />} />
      <Route path="transferencias" element={<Transferencias />} />
    </Routes>
    </>
  );
}

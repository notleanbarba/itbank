import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/page.tsx';
import Cuentas from './cuentas/page.tsx';
import Home from './home/page.tsx';
import Inversiones from './inversiones/page.tsx';
import Pagos from './pagos/page.tsx';
import Prestamos from './prestamos/page.tsx';
import Transferencias from './transferencias/page.tsx';

export default function Homebankinglayou(){
    return (
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cuentas" element={<Cuentas />} />
            <Route path="/home" element={<Home />} />
            <Route path="/inversiones" element={<Inversiones />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/prestamos" element={<Prestamos />} />
            <Route path="/transferencias" element={<Transferencias />} />
            </Routes>
      );
}

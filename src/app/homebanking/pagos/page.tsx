import { useState } from 'react';
import "../../assets/styles/sass/responsive.scss";
import "../../global.scss";
import Footer from "../footer.tsx"; 
import Encabezado from '../header.tsx';

export default function Pagos() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Encabezado toggleNavbar={toggleNavbar} toggleModal={() => {}} /> 
      
      <section className="content secondary">
          <div className="summary-menu">
            <div className="menu">
              <div className="content-title">Todos tus pagos</div>
              <button type="button" className="menu-selector" aria-label="operaciones">
                <span>Consultas y Operaciones</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            </div>
            <div className="summary"></div>
            <div className="tag-group">
              <div className="tag active">Calendario de pagos</div>
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

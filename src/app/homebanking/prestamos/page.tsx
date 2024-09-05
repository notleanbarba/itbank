import React, { useState } from 'react';
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
    <div className="min-h-screen flex flex-col justify-between">
      <Encabezado toggleNavbar={toggleNavbar} toggleModal={() => {}} /> 
      
      
      

      
      <Footer />
    </div>
  );
};
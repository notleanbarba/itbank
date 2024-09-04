import React, { useState } from 'react'
import {NavLink} from "react-router-dom";
import '../assets/styles/sass/login.scss'
import '../assets/styles/sass/responsive.scss'
import '../assets/fontawesome/js/fontawesome'
import '../assets/fontawesome/js/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import Encabezado from './header'
import Footer from './footer'

import '../global.scss'

export interface HeaderProps {
  toggleNavbar: () => void;
  toggleModal: () => void;
}

const Home:React.FC = () =>{
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCvv, setShowCvv] = useState(false);

    const toggleNavbar = () => {
      setIsNavbarOpen(!isNavbarOpen);
    };

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const toggleCvv = () => {
      setShowCvv(!showCvv);
    }

return(
  <div className='bg-white'>
    <Encabezado toggleModal={toggleModal} toggleNavbar={toggleNavbar}/>
    <section className="content main">
      <div className="welcome-message">
        Hola <span id="username">XXXX</span>
        <h2>Estado de tus cuentas</h2>
      </div>
      <section className="main-section font-roboto-mono">
        <div className="cards-group">
          <div className="card">
            <div>
              <span className="account-type" id="accountType">Cuenta única</span>
              <span className="account-number" id="accountNumber">123-45678/1</span>
            </div>
            <div className="account-balance">
              <span className="balance-symbol">$</span>
              <span id="balanceARS">1000000</span>
            </div>
            <div className="account-balance">
              <span className="balance-symbol">U$D</span>
              <span id="balanceUSD">10000</span>
            </div>
            <NavLink to='./transferencia'>Ver movimientos</NavLink>
          </div>
          <div className="card debit">
            <span id="cardtype">Tarjeta de débito</span>
            <span id="idCard">5412 7512 3416 7890</span>
              <div>
                <span id="debitCvv">{showCvv ? '123' : '***'}</span>
                <button type='button' className='' aria-label={showCvv ? 'Hide Cvv' : 'Show Cvv'} onClick={toggleCvv} >
                  <FontAwesomeIcon icon={showCvv ? faEyeSlash : faEye} size="xs" style={{color: "#fff", paddingLeft:'8px'}} />
                </button>
              </div>
          </div>
        </div>
        <h2>Acceso rápido</h2>
        <div className="quick-access">
          <button aria-label="enviar"></button>
          <button aria-label="enviar"></button>
          <button aria-label="enviar"></button>
          <button aria-label="enviar"></button>
        </div>
      </section>
    </section>
    <Footer/>
  </div>
  )
}

export default Home;

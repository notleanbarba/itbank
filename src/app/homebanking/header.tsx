import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import logoCompleto from "../assets/images/logoCompleto.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faBars, faChartLine, faExchangeAlt, faHandHoldingUsd, faHome, faMoneyCheck, faWallet } from "@fortawesome/free-solid-svg-icons";

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleNavbar = () => {
    setOpen(!open);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleNavbar}
        className="text-black text-xl p-4 focus:outline-none"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={toggleNavbar}></div>
          <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-20 transform ${open ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <button className="text-black text-xl p-4 focus:outline-none" onClick={toggleNavbar}>
              <FontAwesomeIcon icon={faXmarkCircle} />
            </button>

            <ul className="mt-8 space-y-4">
              <li>
                <NavLink className="flex items-center px-6 py-3 text-lg font-semibold hover:bg-gray-200 transition-colors" to="/homebanking">
                  <FontAwesomeIcon icon={faHome} className="mr-3" />
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center px-6 py-3 text-lg font-semibold hover:bg-gray-200 transition-colors" to="/homebanking/cuentas">
                  <FontAwesomeIcon icon={faWallet} className="mr-3" />
                  Cuentas
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center px-6 py-3 text-lg font-semibold hover:bg-gray-200 transition-colors" to="/homebanking/transferencias">
                  <FontAwesomeIcon icon={faExchangeAlt} className="mr-3" />
                  Transferencias
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center px-6 py-3 text-lg font-semibold hover:bg-gray-200 transition-colors" to="/homebanking/pagos">
                  <FontAwesomeIcon icon={faMoneyCheck} className="mr-3" />
                  Pagos
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center px-6 py-3 text-lg font-semibold hover:bg-gray-200 transition-colors" to="/homebanking/inversiones">
                  <FontAwesomeIcon icon={faChartLine} className="mr-3" />
                  Inversiones
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center px-6 py-3 text-lg font-semibold hover:bg-gray-200 transition-colors" to="/homebanking/prestamos">
                  <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-3" />
                  Préstamos
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function Usuario() {
  const [userProfile, setUserProfile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleProfileMenu = () => {
    setUserProfile(!userProfile);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="user-open"
        aria-label="Usuario"
        onClick={toggleProfileMenu}
      >
        <FontAwesomeIcon icon={faUser} />
        <i className="fa-solid fa-user fa-2xl" />
      </button>

      {userProfile && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
          <NavLink
            to="/"
            className="block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
          >
            Cerrar Sesión
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  return (
    <div className="flex justify-between border-b border-black items-center bg-white">
      <DropdownMenu />
      <div className="logoCompleto">
        <img
          src={logoCompleto}
          alt="Logo de Argentarius"
          className="w-[70px) h-[70px]"
        />
      </div>
      <div className="border border-slate-950 rounded-full p-2">
        <Usuario />
      </div>
    </div>
  );
}

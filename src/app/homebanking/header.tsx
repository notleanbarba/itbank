import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import logoCompleto from "../assets/images/logoCompleto.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

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

  return (
    <div
      className="text-black p-1 border border-black rounded-full"
      ref={dropdownRef}
    >
      <i className="fa-solid fa-bars" />
      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
        className="bg-white px-1 py-1 rounded-md focus:outline-none"
      >
        Menu
      </button>
      {open && (
        <div className="absolute left-0 top-0 h-screen bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <button type="button" onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faXmarkCircle} className="w-5 h-5 m-4" />
          </button>
          <NavLink
            to="/homebanking"
            className="block px-4 py-4 text-black hover:bg-gray-100"
          >
            Inicio
          </NavLink>
          <NavLink
            to="/homebanking/cuentas"
            className="block px-4 py-4 hover:bg-gray-100"
          >
            Cuentas
          </NavLink>
          <NavLink
            to="/homebanking/transferencias"
            className="block px-4 py-4 hover:bg-gray-100"
          >
            Transferencias
          </NavLink>
          <NavLink
            to="/homebanking/pagos"
            className="block px-4 py-4 hover:bg-gray-100"
          >
            Pagos
          </NavLink>
          <NavLink
            to="/homebanking/inversiones"
            className="block px-4 py-4 hover:bg-gray-100"
          >
            Inversiones
          </NavLink>
          <NavLink
            to="/homebanking/prestamos"
            className="block px-4 py-4 hover:bg-gray-100"
          >
            Préstamos
          </NavLink>
        </div>
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

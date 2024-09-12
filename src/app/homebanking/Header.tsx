import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import logoCompleto from "@app/assets/images/logoCompleto.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLElement>(null);

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
    <>
      <button
        type="button"
        aria-label="Navigation Bar"
        onClick={() => {
          setOpen(true);
        }}
        className="bg-white p-2 text-black rounded-full border border-black border-solid"
      >
        <FontAwesomeIcon icon={faBars} className="mr-2" />
        Menu
      </button>
      <nav
        className={`flex flex-col fixed left-0 top-0 h-screen bg-white border border-gray-300 border-solid shadow-float z-10 w-min *:overflow-x-clip  ${open ? "max-w-full visible ease-in transition-max_w duration-200" : "max-w-0 ease-out transition-delay-close invisible"}`}
        ref={dropdownRef}
      >
        <button
          type="button"
          tabIndex={-1}
          className="size-7 m-4"
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faXmarkCircle} className="size-full" />
        </button>
        <NavLink
          to="/homebanking"
          className="px-4 py-4 text-black hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/homebanking/cuentas"
          className="px-4 py-4 hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Cuentas
        </NavLink>
        <NavLink
          to="/homebanking/transferencias"
          className="px-4 py-4 hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Transferencias
        </NavLink>
        <NavLink
          to="/homebanking/pagos"
          className="px-4 py-4 hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Pagos
        </NavLink>
        <NavLink
          to="/homebanking/inversiones"
          className="px-4 py-4 hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Inversiones
        </NavLink>
        <NavLink
          to="/homebanking/prestamos"
          className="px-4 py-4 hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Préstamos
        </NavLink>
      </nav>
    </>
  );
}

function Usuario() {
  const [openUsermenu, setOpenUsermenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenUsermenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative h-full aspect-square" ref={dropdownRef}>
      <button
        type="button"
        className="bg-white box-border p-2 text-black rounded-full size-full text-center border-[1.2px] border-solid border-black self-center"
        aria-label="Usuario"
        onClick={() => {
          setOpenUsermenu(!openUsermenu);
        }}
      >
        <FontAwesomeIcon icon={faUser} className="size-full" />
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10 ${openUsermenu ? "visible" : "invisible"}`}
      >
        <Link
          to="/"
          replace={true}
          className="block px-4 py-2 text-black text-lg hover:bg-gray-100 w-full text-left"
        >
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className="flex justify-between border-b border-b-[rgba(0,0,0,0.3)] items-center bg-white h-[7vh] py-[1vh] px-[1.5rem]">
      <DropdownMenu />
      <img
        src={logoCompleto}
        alt="Logo de Argentarius"
        className="w-auto h-full"
      />
      <Usuario />
    </div>
  );
}

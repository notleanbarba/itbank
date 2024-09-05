import React, {useState, useRef, useEffect} from "react";
import {NavLink} from "react-router-dom";
import DropdownMenu from "./menu.tsx";
import { HeaderProps } from "./page";
import logoCompleto from '../assets/images/logoCompleto.png'

const Usuario: React.FC = () => {
  const [userProfile,setUserProfile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleProfileMenu = () => {
    setUserProfile(!userProfile);
  }

  const handleClickOutside = (event: MouseEvent)=>{
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
      setUserProfile(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return(
    <div className="relative" ref={dropdownRef}>
      <button 
        type="button" 
        className="user-open" 
        aria-label="Usuario" 
        onClick={toggleProfileMenu}>
        <i className="fa-solid fa-user fa-2xl"></i>
      </button>
      
      {userProfile && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
          <NavLink to='/'
            className="block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
          >
            Cerrar Sesión
          </NavLink>
        </div>
      )}
    </div>
  );
};


export const Encabezado: React.FC <HeaderProps> = () =>{
    return (
      <div className='flex justify-between border-b border-black items-center bg-white'>
          <DropdownMenu/>
          <div className="logoCompleto">
            <img
              src={logoCompleto}
              alt="Logo de Argentarius"
              className='w-[70px) h-[70px]'
            />
          </div>
          <div className="border border-slate-950 rounded-full p-2">
            <Usuario/>
          </div>
      </div>
    );
  };

export default Encabezado;
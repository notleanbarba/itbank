import React, { useState, useRef, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../global.scss'
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

const DropdownMenu: React.FC = () => {
    const [isOpen , setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () =>{
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }

    useEffect(() =>{
        document.addEventListener('mousedown', handleClickOutside);
        return() => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    },[]);

    return(
        <div className='text-black p-1 border border-black rounded-full' ref={dropdownRef}>
            <i className="fa-solid fa-bars"></i>
            <button onClick={toggleMenu} 
            className='bg-white px-1 py-1 rounded-md focus:outline-none'
            >
            Menu
            </button>
            {isOpen&& (
                <div className="absolute left-0 top-0 h-screen bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <button onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faXmarkCircle} className='w-5 h-5 m-4'/>
                    </button>
                    <NavLink to="/homebanking" className="block px-4 py-4 text-black hover:bg-gray-100">
                    Inicio
                    </NavLink>
                    <NavLink to="/cuentas" className="block px-4 py-4 hover:bg-gray-100">
                    Cuentas
                    </NavLink>
                    <NavLink to="/transferencias" className="block px-4 py-4 hover:bg-gray-100">
                    Transferencias
                    </NavLink>
                    <NavLink to="/pagos" className="block px-4 py-4 hover:bg-gray-100">
                    Pagos
                    </NavLink>
                    <NavLink to="/inversiones" className="block px-4 py-4 hover:bg-gray-100">
                    Inversiones
                    </NavLink>
                    <NavLink to="/prestamos" className="block px-4 py-4 hover:bg-gray-100">
                    Préstamos
                    </NavLink>
              </div>
            )}
        </div>
    )

}

export default DropdownMenu
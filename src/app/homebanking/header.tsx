import { useState } from "react";
import LogoArg from "../assets/images/logoCompleto.png"
export default function Header() {
    const [OpenNavBar, setOpenNavBar] = useState ("")
    return (

        <>
<header>
    <button
      className="navbar-open"
      id="open-menu"
      onClick={() => {setOpenNavBar ("open")}}
    >
      <i className="fa-solid fa-bars" />
      MENU
    </button>
    <div className="logoCompleto">
      <img
        alt="Logo de Argentarius"
        height="50px"
        src={LogoArg}
        width="90px"
      />
    </div>
    <button
      aria-label="Usuario"
      className="user-open"
      type="button"
    >
      <i className="fa-solid fa-user fa-2xl" />
    </button>
  </header>

   <nav
   className={"navbar "+OpenNavBar}
   id="navbar"
 >
   <button
     aria-label="menú"
     className="navbar-close"
     onClick={() => {setOpenNavBar ("")}}
     id="close-menu"
     tabIndex={-1}
     type="button"
   >
     <i className="fa-solid fa-xmark" />
   </button>
   <a
     href="../home"
     tabIndex={-1}
   >
     Inicio
   </a>
   <a
     href="../cuentas"
     tabIndex={-1}
   >
     Cuentas
   </a>
   <a
     href="../transferencias"
     tabIndex={-1}
   >
     Transferencias
   </a>
   <a
     href="../pagos"
     tabIndex={-1}
   >
     Pagos
   </a>
   <a
     href="../inversiones"
     tabIndex={-1}
   >
     Inversiones
   </a>
   <a
     href="../prestamos"
     tabIndex={-1}
   >
     Préstamos
   </a>
 </nav>
 </>
  );
}
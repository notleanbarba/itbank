import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  return (
    <>
      <footer className="text-white bg-[#222222] py-2 px-8 h-min no-underline sm:text-sm md:text-base">
        <div className="flex flex-row flex-wrap justify-around [&_li]:my-1 [&_li]:text-nowrap">
          <div className="flex flex-col gap-1 w-min">
            <h3 className="text-lg font-bold">Nosotros</h3>
            <Link href="/about-us">Sobre nosotros</Link>
            <Link href="/faq">FAQ</Link>
            <button type="button" className="block md:hidden">
              Contacto
            </button>
            <dialog className="modal">
              <div className="modal-dialog" role="dialog">
                <button type="button" className="modal-close" tabIndex={-1}>
                  <FontAwesomeIcon icon={faXmarkCircle} />
                </button>
                <h3 className="text-lg font-bold">Información de contacto</h3>
                <ul>
                  <li>
                    Dirección:<span>Calle falsa 1234</span>
                  </li>
                  <li>
                    Email:<span>itbank@corpo.com</span>
                  </li>
                  <li>
                    Número:<span>+54 9 123456789</span>
                  </li>
                </ul>
              </div>
            </dialog>
          </div>
          <div className="hidden md:flex flex-col gap-1 w-min">
            <h3 className="text-lg font-bold">Contacto</h3>
            <address>
              <ul>
                <li>
                  Dirección: <span>Calle falsa 1234</span>
                </li>
                <li>
                  Email: <span>itbank@corpo.com</span>
                </li>
                <li>
                  Número: <span>+54 9 123456789</span>
                </li>
              </ul>
            </address>
          </div>
          <div className="flex flex-col gap-1 w-min">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p>
              Suscribite a nuestro Newsletter para recibir ofertas especiales
            </p>
            <form className="flex items-center">
              <input
                type="email"
                className="p-1 border-none rounded-md mr-2"
                name="newsletter_email"
                placeholder="Tu email"
                aria-label="Email"
                required
              />
              <button
                type="submit"
                className="w-12 aspect-square bg-[#9aa7bf] rounded-full flex justify-center items-center cursor-pointer"
                aria-label="enviar"
              >
                <FontAwesomeIcon icon={faNewspaper} />
              </button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
}

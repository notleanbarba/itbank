"use client";
import Link from "next/link";
import { useState } from "react";
import Modal from "../../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  function toggleContactModal() {
    setIsContactModalOpen(!isContactModalOpen);
  }

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
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleContactModal();
              }}
            >
              <span className="text-blue-500 hover:text-blue-300 cursor-pointer">
                Formulario Contacto
              </span>
            </Link>
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
      <Modal
        open={isContactModalOpen}
        onClose={toggleContactModal}
        title="Formulario de Contacto"
      >
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Asunto:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contact-reason"
              className="block text-sm font-medium text-gray-700"
            >
              Motivo del Contacto:
            </label>
            <select
              id="contact-reason"
              name="contact-reason"
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Selecciona una opción</option>
              <option value="support">Soporte Técnico</option>
              <option value="general">Consultas Generales</option>
              <option value="sales">Ventas</option>
              <option value="feedback">Comentarios/Sugerencias</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono (opcional):
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="(Código de país) Número"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Mensaje:
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="newsletter"
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-700">
                Suscribirme al Newsletter
              </span>
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

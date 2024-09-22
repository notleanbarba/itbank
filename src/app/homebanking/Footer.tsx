"use client";
import Link from "next/link";
import { useState } from "react";
import Modal from "../../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  function toggleContactModal() {
    setIsContactModalOpen(!isContactModalOpen);
  }

  return (
    <>
      <footer className="text-white bg-[#222222] py-6 px-4 sm:px-8 min-h-[150px] w-full overflow-hidden">
        <div className="flex flex-col md:flex-row justify-around items-start gap-4 max-w-full mx-auto">
          {/* Sección Nosotros */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <h3 className="text-lg font-bold">Nosotros</h3>
            <Link href="/about-us" className="hover:text-gray-400">
              Sobre nosotros
            </Link>
            <Link href="/faq" className="hover:text-gray-400">
              FAQ
            </Link>
            <button
              type="button"
              className="block md:hidden text-blue-500 hover:text-blue-300"
              onClick={toggleContactModal}
            >
              Contacto
            </button>
          </div>

          {/* Sección Contacto */}
          <div className="hidden md:flex flex-col gap-2 w-full md:w-auto">
            <h3 className="text-lg font-bold">Contacto</h3>
            <address className="not-italic">
              <ul>
                <li>
                  <strong>Dirección:</strong> Calle falsa 1234
                </li>
                <li>
                  <strong>Email:</strong> itbank@corpo.com
                </li>
                <li>
                  <strong>Número:</strong> +54 9 123456789
                </li>
              </ul>
            </address>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleContactModal();
              }}
              className="text-sky-400 hover:text-blue-500 cursor-pointer"
            >
              Formulario Contacto
            </Link>
          </div>

          {/* Sección Newsletter */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p>Suscribite para recibir ofertas especiales</p>
            <form className="flex flex-col sm:flex-row sm:flex-wrap w-full items-center">
              <input
                type="email"
                className="p-2 border border-gray-300 rounded-md mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto flex-1 box-border"
                name="newsletter_email"
                placeholder="Tu email"
                aria-label="Email"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-12 h-12 bg-[#9aa7bf] rounded-full flex justify-center items-center cursor-pointer hover:bg-[#7a8abf] box-border"
                aria-label="Enviar"
              >
                <FontAwesomeIcon icon={faNewspaper} />
              </button>
            </form>
          </div>
        </div>
      </footer>

      {/* Modal de Contacto */}
      <Modal
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Formulario de Contacto"
      >
        {/* Ajustes para modal */}
        <div className="p-4 sm:p-6 bg-white rounded-md max-w-lg mx-auto">
          <form className="space-y-4">
            <div>
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
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
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
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
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
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
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
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona una opción</option>
                <option value="support">Soporte Técnico</option>
                <option value="general">Consultas Generales</option>
                <option value="sales">Ventas</option>
                <option value="feedback">Comentarios/Sugerencias</option>
              </select>
            </div>

            <div>
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
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(Código de país) Número"
              />
            </div>

            <div>
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
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <label
                htmlFor="newsletter"
                className="ml-2 text-sm text-gray-700"
              >
                Suscribirme al Newsletter
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

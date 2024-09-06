import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>Nosotros</h3>
            <a href="../about-us">Sobre nosotros</a>
            <a href="../faq">FAQ</a>
            <button type="button" className="modal-open" name="contact-modal">
              Contacto
            </button>
            <dialog className="modal" id="contact-modal">
              <div className="modal-dialog" role="dialog">
                <button type="button" className="modal-close" tabIndex={-1}>
                  <FontAwesomeIcon icon={faXmarkCircle} />
                </button>
                <h3>Información de contacto</h3>
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
          <div id="footer-contact">
            <h3>Contacto</h3>
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
          <div className="newsletter">
            <h3>Newsletter</h3>
            <p>
              Suscribite a nuestro Newsletter para recibir ofertas especiales
            </p>
            <form className="newsletter-input">
              <input
                type="email"
                name="newsletter_email"
                placeholder="Tu email"
                aria-label="Email"
                required
              />
              <button
                type="submit"
                className="submit-button"
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

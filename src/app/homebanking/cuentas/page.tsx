export default function Cuentas() {
  return (
    <div>

  <section className="content secondary">
    <div className="summary-menu">
      <div className="menu">
        <div className="content-title">
          Cuenta 123-45678/1
        </div>
        <button
          aria-label="operaciones"
          className="menu-selector"
          id="menu-selector"
          type="button"
        >
          <span>
            Consultas y Operaciones{' '}
          </span>
          <i className="fa-solid fa-chevron-down" />
        </button>
        <nav
          className="menu-list"
          id="menu-list"
        >
          <button
            className="modal-open"
            name="exchange-modal"
          >
            Convertir divisas
          </button>
        </nav>
      </div>
      <div className="summary">
        <div className="data-with-header">
          Saldo en pesos
          <div className="data">
            <span className="balance-symbol">
              $
            </span>
            <span id="balanceARS">
              1000000
            </span>
          </div>
        </div>
        <div className="data-with-header">
          Saldo en dólares
          <div className="data">
            <span className="balance-symbol">
              U$D
            </span>
            <span id="balanceARS">
              1000000
            </span>
          </div>
        </div>
        <div className="account-info">
          <div className="account-param">
            CBU:
            <span id="account-cbu">
              0000000000000000000000
            </span>
          </div>
          <div className="account-param">
            ALIAS:
            <span id="account-alias">
              itbank.account
            </span>
          </div>
        </div>
      </div>
      <div className="tag-group">
        <div className="tag active">
          Movimientos en pesos
        </div>
        <div className="tag">
          Movimientos en dólares
        </div>
      </div>
    </div>
    <div className="page-data">
      <main>
        <p>
          No tenés movimientos en los últimos 7 días.
        </p>
        <p>
          Podés consultar los movimientos de los últimos 60 días.
        </p>
      </main>
    </div>
  </section>
  <footer className="footer">
    <div className="footer-content">
      <div>
        <h3>
          Nosotros
        </h3>
        <a href="../about-us">
          Sobre nosotros
        </a>
        <a href="../faq">
          FAQ
        </a>
        <button
          className="modal-open"
          name="contact-modal"
          type="button"
        >
          Contacto
        </button>
        <dialog
          className="modal"
          id="contact-modal"
        >
          <div
            className="modal-dialog"
            role="dialog"
          >
            <button
              className="modal-close"
              tabIndex={-1}
              type="button"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            <h3>
              Información de contacto
            </h3>
            <ul>
              <li>
                Dirección:
                <span>
                  Calle falsa 1234
                </span>
              </li>
              <li>
                Email:
                <span>
                  itbank@corpo.com
                </span>
              </li>
              <li>
                Número:
                <span>
                  +54 9 123456789
                </span>
              </li>
            </ul>
          </div>
        </dialog>
      </div>
      <div id="footer-contact">
        <h3>
          Contacto
        </h3>
        <address>
          <ul>
            <li>
              Dirección:{' '}
              <span>
                Calle falsa 1234
              </span>
            </li>
            <li>
              Email:{' '}
              <span>
                itbank@corpo.com
              </span>
            </li>
            <li>
              Número:{' '}
              <span>
                +54 9 123456789
              </span>
            </li>
          </ul>
        </address>
      </div>
      <div className="newsletter">
        <h3>
          Newsletter
        </h3>
        <p>
          Suscribite a nuestro Newsletter para recibir ofertas especiales
        </p>
        <form className="newsletter-input">
          <input
            aria-label="Email"
            name="newsletter_email"
            placeholder="Tu email"
            required
            type="email"
          />
          <button
            aria-label="enviar"
            className="submit-button"
            type="submit"
          >
            <i className="fa-solid fa-newspaper" />
          </button>
        </form>
      </div>
    </div>
  </footer>
  <dialog
    className="modal"
    id="exchange-modal"
  >
    <div
      className="modal-dialog"
      role="dialog"
    >
      <button
        className="modal-close"
        tabIndex={-1}
        type="button"
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <h1>
        Convertir divisas
      </h1>
      <form id="exchange-calculator">
        <label htmlFor="from_currency">
          De
        </label>
        <select id="from_currency" />
        <label htmlFor="give_currency">
          Monto a convertir
        </label>
        <input
          id="give_currency"
          type="number"
        />
        <label htmlFor="to_currency">
          A
        </label>
        <select id="to_currency" />
        <label htmlFor="receive_currency">
          Monto a recibir
        </label>
        <output
          id="receive_currency"
        >
        </output>
      </form>
    </div>
  </dialog>
</div>
  );
}


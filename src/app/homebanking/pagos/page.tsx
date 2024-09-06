import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Pagos() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <section className="content secondary">
        <div className="summary-menu">
          <div className="menu">
            <div className="content-title">Todos tus pagos</div>
            <button
              type="button"
              className="menu-selector"
              aria-label="operaciones"
            >
              <span>Consultas y Operaciones</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className="summary" />
          <div className="tag-group">
            <div className="tag active">Calendario de pagos</div>
          </div>
        </div>
      </section>
    </div>
  );
}

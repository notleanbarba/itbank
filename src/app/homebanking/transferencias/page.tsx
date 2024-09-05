import Footer from '../footer';
import Encabezado from '../header';

export default function Transferencias() {
  return (
    <div>
    <Encabezado toggleNavbar={() => { } } toggleModal={function (): void {
      throw new Error('Function not implemented.');
    } } /><section className="content secondary bg-white">
        <div className="summary-menu">
          <div className="menu">
            <div className="content-title">
              Transferencias
            </div>
            <button
              aria-label="operaciones"
              className="menu-selector"
              type="button"
            >

              Consultas y Operaciones{' '}

              <i className="fa-solid fa-chevron-down" />
            </button>
          </div>
          <div className="summary" />
          <div className="tag-group">
            <div className="tag active">
              Transferencias agendadas
            </div>
            <div className="tag">
              Mis destinatarios frecuentes
            </div>
          </div>
        </div>
        <div className="page-data">
          <main>
            <table>
              <thead>
                <tr>
                  <th>
                    Fecha
                  </th>
                  <th>
                    Destinatario
                  </th>
                  <th>
                    Tipo
                  </th>
                  <th>
                    Importe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    01/01/2024
                  </td>
                  <td>
                    Lionel Messi
                  </td>
                  <td>
                    Transferencia automática
                  </td>
                  <td>
                    $10000
                  </td>
                </tr>
                <tr>
                  <td>
                    02/01/2024
                  </td>
                  <td>
                    Jorge Luis Borges
                  </td>
                  <td>
                    Transferencia automática
                  </td>
                  <td>
                    $100
                  </td>
                </tr>
                <tr>
                  <td>
                    04/01/2024
                  </td>
                  <td>
                    Juan Pérez
                  </td>
                  <td>
                    DEBIN
                  </td>
                  <td>
                    $1234
                  </td>
                </tr>
                <tr>
                  <td>
                    11/08/2024
                  </td>
                  <td>
                    María González
                  </td>
                  <td>
                    E-Cheq
                  </td>
                  <td>
                    $993
                  </td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
      </section>
      <Footer />
      </div>
  );
}

import React from 'react';

const LoanTable: React.FC = () => {
  return (
    <div className="loan-table-container">
      <h2 className="loan-table-title">Historial de Préstamos</h2>
      <table className="loan-table">
        <thead>
          <tr>
            <th>ID Préstamo</th>
            <th>Monto</th>
            <th>Plazo</th>
            <th>Tasa de Interés</th>
            <th>Cuota Mensual</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>$10,000</td>
            <td>24 meses</td>
            <td>8%</td>
            <td>$450</td>
            <td>Aprobado</td>
          </tr>
          <tr>
            <td>002</td>
            <td>$5,000</td>
            <td>12 meses</td>
            <td>7%</td>
            <td>$230</td>
            <td>En Proceso</td>
          </tr>
          <tr>
            <td>003</td>
            <td>$20,000</td>
            <td>36 meses</td>
            <td>9%</td>
            <td>$780</td>
            <td>Pagado</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable
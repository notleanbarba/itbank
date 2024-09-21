import { useAccounts } from "@components/transferComponents/AccountProvider";
import jsPDF from "jspdf"; // Importamos la librería para crear PDFs
import { FaDownload } from "react-icons/fa"; // Icono para descargar el PDF

const TransferHistory = () => {
  const { transferHistory } = useAccounts();

  const downloadPDF = (transfer) => {
    const doc = new jsPDF();
    doc.text(`Comprobante de Transferencia`, 20, 10);
    doc.text(`Fecha: ${transfer.date}`, 20, 20);
    doc.text(`Cuenta Origen: ${transfer.sender}`, 20, 30);
    doc.text(`Cuenta Destino: ${transfer.recipient}`, 20, 40);
    doc.text(`Monto: $${transfer.amount}`, 20, 50);
    doc.save(`Comprobante_Transferencia_${transfer.date}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Historial de Transferencias</h2>
      {transferHistory.length === 0 ? (
        <p>No se han realizado transferencias.</p>
      ) : (
        <div className="overflow-auto max-h-80 shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Cuenta Origen
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Cuenta Destino
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 bg-gray-200"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transferHistory.map((transfer, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.sender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.recipient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${transfer.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                      onClick={() => downloadPDF(transfer)}
                    >
                      <FaDownload className="mr-2" /> Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransferHistory;

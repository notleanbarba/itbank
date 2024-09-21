import React, { useState } from "react";

interface AddFacturaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (factura: FacturaType) => void;
}

export interface FacturaType {
  id: string;
  servicio: string;
  cliente: string;
  total: number;
  estado: string;
}

const AddFacturaModal: React.FC<AddFacturaModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [servicio, setServicio] = useState("");
  const [cliente, setCliente] = useState("");
  const [total, setTotal] = useState<number>(0);
  const [estado, setEstado] = useState("Pendiente");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaFactura: FacturaType = {
      id: Date.now().toString(),
      servicio,
      cliente,
      total,
      estado,
    };
    onAdd(nuevaFactura);
    setServicio("");
    setCliente("");
    setTotal(0);
    setEstado("Pendiente");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Agregar Nueva Factura</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Servicio</label>
            <input
              type="text"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Saldo a Pagar</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(parseFloat(e.target.value))}
              required
              min="0"
              step="0.01"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacturaModal;

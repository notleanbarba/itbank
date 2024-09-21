"use client";
import { useParams, useRouter } from 'next/navigation'; 
import { useAccounts } from "@/components/transferComponents/AccountProvider";
import RealTimeTransfer from "@/components/transferComponents/RealTimeTransfer";
import WithHeader from "@app/homebanking/WithHeader";
import { FaArrowLeft, FaMoneyCheck } from 'react-icons/fa'; // Cambié FaMoneyBillTransfer a FaMoneyCheck
import { useState } from "react";

export default function TransferDetails() {
  const { id } = useParams(); // Obtiene el ID de la cuenta desde la URL
  const { accounts } = useAccounts(); // Accede a las cuentas
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Busca la cuenta por ID
  const account = accounts.find((acc) => acc.id === parseInt(id, 10));

  if (!account) {
    return <div>Cargando detalles de la cuenta...</div>;
  }

  const handleTransferClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    router.push('/homebanking/transferencias');
  };

  return (
    <WithHeader title={`Detalles de la Cuenta ${account.accountNumber}`} submenuOptions={[]}>
      <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md">

        {/* Botón para volver atrás */}
        <button
          onClick={handleBackClick}
          className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
          aria-label="Volver a Transferencias"
        >
          <FaArrowLeft className="mr-2" /> Volver a Transferencias
        </button>

        {/* Detalles de la cuenta */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Cuenta: {account.accountNumber}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-6">Saldo: ${account.balance.toLocaleString()}</p>

          {/* Detalles adicionales */}
          <div className="mb-4">
            <p className="text-lg text-gray-600">Tipo de Cuenta: Corriente</p>
            <p className="text-lg text-gray-600">Último Movimiento: TBD</p>
          </div>

          {/* Botón para abrir el modal de transferencia */}
          <button
            onClick={handleTransferClick}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-blue-600 transition-all"
          >
            <FaMoneyCheck className="mr-2" /> Transferir
          </button>
        </div>

        {/* Mostrar el modal de transferencia si está abierto */}
        {isModalOpen && (
          <div className="modal-backdrop">
            <div className="modal">
              <button onClick={closeModal} className="modal-close">X</button>
              <RealTimeTransfer account={account} onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    </WithHeader>
  );
}

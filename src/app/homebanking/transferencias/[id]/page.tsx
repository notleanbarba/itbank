"use client";
import { useParams } from 'next/navigation';
import WithHeader from "@app/homebanking/WithHeader";
import { useState } from "react";
import RealTimeTransfer from "@/components/transferComponents/RealTimeTransfer";
import  { useAccounts }  from "@/components/transferComponents/AccountProvider";

interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountHolder: string;
}

export default function TransferDetails() {
  const { id } = useParams();
  const { accounts } = useAccounts() as { accounts: Account[] }; 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const account = accounts.find((acc: Account) => acc.id === parseInt(id as string, 10));

  if (!account) {
    return <div>Cargando detalles de la cuenta...</div>;
  }

  const handleTransferClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <WithHeader title={`Detalles de la Cuenta ${account.accountNumber}`} submenuOptions={[]}>
      <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Cuenta: {account.accountNumber}</h1>
        <p className="text-2xl font-semibold text-green-600 mb-6">Saldo: ${account.balance.toLocaleString()}</p>

        <button
          onClick={handleTransferClick}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-blue-600 transition-all"
        >
          Transferir
        </button>

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

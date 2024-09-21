"use client";
import { useRouter } from 'next/navigation';
import { useAccounts } from "@/components/transferComponents/AccountProvider";
import { useState } from 'react';

const TransferAccountList = () => {
  const { accounts } = useAccounts(); 
  const router = useRouter(); 
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleAccountSelect = (accountId) => {
    router.push(`/homebanking/transferencias/${accountId}`);
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Selecciona la cuenta de origen
      </h1>
      
      <input
        type="text"
        placeholder="Buscar por titular o número de cuenta..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />

      <ul className="bg-white shadow-md rounded-md overflow-hidden">
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((account) => (
            <li
              key={account.id}
              className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
              onClick={() => handleAccountSelect(account.id)}
            >
              <h2 className="text-xl font-semibold">{account.accountHolder}</h2>
              <p className="text-gray-600">Número de cuenta: {account.accountNumber}</p>
              <p className="text-gray-600">Saldo: ${account.balance.toLocaleString('es-AR')}</p>
            </li>
          ))
        ) : (
          <li className="p-4 text-center text-gray-600">
            No se encontraron cuentas.
          </li>
        )}
      </ul>
    </div>
  );
};

export default TransferAccountList;

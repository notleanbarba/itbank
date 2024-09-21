// TransferAccountList.tsx

"use client";
import { useState } from 'react'; // Solo mantener las importaciones que estás usando.

interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountHolder: string;
}

interface TransferAccountListProps {
  accounts: Account[];
  onSelectAccount: (account: Account) => void;
}

const TransferAccountList: React.FC<TransferAccountListProps> = ({ accounts, onSelectAccount }) => {
  const [searchTerm, setSearchTerm] = useState(""); 

  const filteredAccounts = accounts.filter(
    (account) =>
      account.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
        Selecciona la cuenta de origen
      </h1>

      <input
        type="text"
        placeholder="Buscar por titular o número de cuenta..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />

      <ul className="bg-white shadow-xl rounded-lg overflow-hidden">
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((account) => (
            <li
              key={account.id}
              className="p-6 border-b border-gray-100 cursor-pointer hover:bg-gradient-to-r from-blue-50 to-blue-100 transform transition duration-300 ease-in-out hover:scale-105"
              onClick={() => onSelectAccount(account)}
            >
              <h2 className="text-2xl font-semibold text-blue-800">{account.accountHolder}</h2>
              <p className="text-gray-700">
                Número de cuenta: <span className="font-bold">{account.accountNumber}</span>
              </p>
              <p className="text-gray-700">
                Saldo: <span className="text-green-600 font-bold">${account.balance.toLocaleString('es-AR')}</span>
              </p>
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


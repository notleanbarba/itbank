"use client";
import { useAccounts } from "@components/transferComponents/AccountProvider";
import Link from "next/link"; 
import { FaEye, FaMoneyCheckAlt } from "react-icons/fa"; 

interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountHolder: string;
}

const BankAccountList: React.FC = () => {
  const { accounts } = useAccounts() as { accounts: Account[] };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center tracking-wide">
        Mis Cuentas Bancarias
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {accounts.map((account: Account) => (
          <div
            key={account.id}
            className="relative group bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute -top-6 -right-6 bg-green-500 text-white p-3 rounded-full shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
              <FaMoneyCheckAlt size={30} />
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-white group-hover:text-gray-300 transition-colors">
              {account.accountHolder}
            </h2>
            <p className="text-white text-opacity-80 mb-2">Número de cuenta:</p>
            <p className="text-xl font-medium text-white mb-4">{account.accountNumber}</p>
            <p className="text-white text-opacity-80 mb-2">Saldo disponible:</p>
            <p className="text-3xl font-bold text-yellow-400 mb-6">${account.balance.toLocaleString("es-ES")}</p>
            
            <Link href={`/homebanking/cuentas/${account.id}`}>
              <button className="w-full bg-yellow-400 text-blue-900 py-3 px-6 rounded-md shadow-lg hover:bg-yellow-300 hover:text-white transition-all flex items-center justify-center transform group-hover:translate-y-1 duration-300">
                <FaEye className="mr-2" /> Ver Detalles
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-blue-100 to-transparent opacity-10 pointer-events-none"></div>
    </div>
  );
};

export default BankAccountList;

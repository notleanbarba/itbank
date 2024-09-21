"use client";
import { createContext, useState, useContext, ReactNode } from 'react';

const AccountContext = createContext(null);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState([
    { id: 1, accountNumber: "1234567890", balance: 5000, accountHolder: "John Doe" },
    { id: 2, accountNumber: "0987654321", balance: 7500, accountHolder: "Jane Smith" },
    { id: 3, accountNumber: "1122334455", balance: 10000, accountHolder: "Alice Johnson" }
  ]);

  // Añadimos un estado para guardar el historial de transferencias
  const [transferHistory, setTransferHistory] = useState([]);

  const handleTransfer = (amount: number, recipientAccountNumber: string, senderAccountNumber: string) => {
    console.log("Transferencia ejecutada:", { amount, recipientAccountNumber, senderAccountNumber });

    // Actualizar las cuentas
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) => {
        if (account.accountNumber === senderAccountNumber && account.balance >= amount) {
          return { ...account, balance: account.balance - amount };
        }
        if (account.accountNumber === recipientAccountNumber) {
          return { ...account, balance: account.balance + amount };
        }
        return account;
      })
    );

    // Guardamos los detalles de la transferencia
    setTransferHistory((prevHistory) => [
      ...prevHistory,
      {
        sender: senderAccountNumber,
        recipient: recipientAccountNumber,
        amount,
        date: new Date().toLocaleString()
      }
    ]);
  };

  return (
    <AccountContext.Provider value={{ accounts, handleTransfer, transferHistory }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => useContext(AccountContext);

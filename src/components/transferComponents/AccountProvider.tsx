"use client";
import { createContext, useContext, ReactNode, useState } from 'react';

interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountHolder: string;
}

interface Transfer {
  sender: string;
  recipient: string;
  amount: number;
  date: string;
}

interface AccountContextProps {
  accounts: Account[];
  transferHistory: Transfer[];
  handleTransfer: (amount: number, recipientAccountNumber: string, senderAccountNumber: string) => void;
}

const AccountContext = createContext<AccountContextProps | null>(null);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, accountNumber: "1234567890", balance: 5000, accountHolder: "Jisus Crais" },
    { id: 2, accountNumber: "0987654321", balance: 7500, accountHolder: "Olga Mariana" },
    { id: 3, accountNumber: "1122334455", balance: 10000, accountHolder: "Cesar Moises Grillo Izquierdo" }
  ]);

  const [transferHistory, setTransferHistory] = useState<Transfer[]>([]);

  const handleTransfer = (amount: number, recipientAccountNumber: string, senderAccountNumber: string) => {
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

    setTransferHistory((prevHistory) => [
      ...prevHistory,
      { sender: senderAccountNumber, recipient: recipientAccountNumber, amount, date: new Date().toLocaleString() }
    ]);
  };

  return (
    <AccountContext.Provider value={{ accounts, transferHistory, handleTransfer }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountProvider");
  }
  return context;
};

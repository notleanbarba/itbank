import React, { createContext, useContext, useState, ReactNode } from "react";

type Cliente = {
  id: string;
  nombre: string;
} | null;

type ClienteContextType = {
  cliente: Cliente;
  setCliente: (cliente: Cliente) => void;
};

const ClienteContext = createContext<ClienteContextType | undefined>(undefined);

export const useCliente = () => {
  const context = useContext(ClienteContext);

  if (!context) {
    throw new Error("useCliente esta mal usado :p ");
  }

  return context;
};

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [cliente, setCliente] = useState<Cliente>(null);

  return (
    <ClienteContext.Provider value={{ cliente, setCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};

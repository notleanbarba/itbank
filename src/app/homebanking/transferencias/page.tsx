"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Usamos useRouter para la redirección
import WithHeader from "@app/homebanking/WithHeader";
import TransferAccountList from "@components/transferComponents/TransferAccountList";
import TransferHistory from "@components/transferComponents/TransferHistory";
import { useAccounts } from "@/components/transferComponents/AccountProvider";

export default function Transferencias() {
  const { accounts } = useAccounts(); 
  const [activeTab, setActiveTab] = useState(0); // Para manejar las tabs
  const router = useRouter(); // Inicializamos useRouter para redirigir

  // Función que redirige a la página dinámica de la cuenta seleccionada
  const handleAccountSelect = (account) => {
    router.push(`/homebanking/transferencias/${account.id}`);
  };

  return (
    <WithHeader
      title="Transferencias"
      submenuOptions={[]}
      tags={[
        { text: "Nueva Transferencia", callback: () => setActiveTab(0) },
        { text: "Historial", callback: () => setActiveTab(1) }
      ]}
    >
      {activeTab === 0 ? (
        <main>
          <TransferAccountList accounts={accounts} onSelectAccount={handleAccountSelect} />
        </main>
      ) : (
        <TransferHistory />
      )}
    </WithHeader>
  );
}

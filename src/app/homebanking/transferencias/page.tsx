"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WithHeader from "@app/homebanking/WithHeader";
import TransferAccountList from "@components/transferComponents/TransferAccountList";
import TransferHistory from "@components/transferComponents/TransferHistory";
import { useAccounts } from "@/components/transferComponents/AccountProvider";

interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountHolder: string;
}

export default function Transferencias() {
  const { accounts } = useAccounts();
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const handleAccountSelect = (account: Account) => {
    router.push(`/homebanking/transferencias/${account.id}`);
  };

  return (
    <WithHeader
      title="Transferencias"
      submenuOptions={[]}
      tags={[
        { text: "Nueva Transferencia", callback: () => setActiveTab(0) },
        { text: "Historial", callback: () => setActiveTab(1) },
      ]}
    >
      {activeTab === 0 ? (
        <main>
          <TransferAccountList
            accounts={accounts}
            onSelectAccount={handleAccountSelect}
          />
        </main>
      ) : (
        <TransferHistory />
      )}
    </WithHeader>
  );
}

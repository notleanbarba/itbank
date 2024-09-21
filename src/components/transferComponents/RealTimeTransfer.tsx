"use client";
import { useState } from "react";
import { useAccounts } from "@components/transferComponents/AccountProvider";
import Modal from "../Modal";

interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountHolder: string;
}

interface TransferStatus {
  success: boolean;
  message: string;
}

const RealTimeTransfer: React.FC<{ account: Account; onClose: () => void }> = ({
  account,
  onClose,
}) => {
  const { accounts, handleTransfer } = useAccounts();
  const [recipientAccount, setRecipientAccount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transferStatus, setTransferStatus] = useState<TransferStatus | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleTransferClick = () => {
    const parsedAmount = parseFloat(amount);

    if (!recipientAccount || recipientAccount.length < 10) {
      setTransferStatus({
        success: false,
        message: "Número de cuenta inválido.",
      });
      return;
    }

    if (parsedAmount <= 0) {
      setTransferStatus({
        success: false,
        message: "El monto debe ser mayor a 0.",
      });
      return;
    }

    if (account?.accountNumber === recipientAccount) {
      setTransferStatus({
        success: false,
        message: "No puedes transferir a la misma cuenta.",
      });
      return;
    }

    if (account?.balance < parsedAmount) {
      setTransferStatus({ success: false, message: "Saldo insuficiente." });
      return;
    }

    setIsSubmitting(true);
    setTransferStatus(null);

    setTimeout(() => {
      handleTransfer(parsedAmount, recipientAccount, account.accountNumber);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccessMessage(false);
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Realizar Transferencia
        </h2>

        <div className="mb-4">
          <label
            htmlFor="recipient"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cuenta de Destino
          </label>
          <select
            id="recipient"
            value={recipientAccount}
            onChange={(e) => setRecipientAccount(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Seleccione una cuenta de destino</option>
            {accounts
              .filter(
                (acc: Account) => acc.accountNumber !== account.accountNumber,
              ) // Correctly typed acc
              .map(
                (
                  acc: Account, // Correctly typed acc
                ) => (
                  <option key={acc.id} value={acc.accountNumber}>
                    {acc.accountHolder} - {acc.accountNumber}
                  </option>
                ),
              )}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Monto
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isSubmitting}
            placeholder="Monto"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          />
        </div>

        <button
          onClick={handleTransferClick}
          disabled={isSubmitting}
          className={`w-full p-3 rounded-md text-white font-semibold transition-colors duration-300 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Transfiriendo..." : "Transferir"}
        </button>

        {showSuccessMessage && (
          <div className="mt-4 p-3 rounded-md text-center bg-green-100 text-green-800">
            Transferencia exitosa.
          </div>
        )}

        {transferStatus && !showSuccessMessage && (
          <div
            className={`mt-4 p-3 rounded-md text-center ${
              transferStatus.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {transferStatus.message}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RealTimeTransfer;

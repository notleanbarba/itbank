import { useState } from "react";
import WithHeader from "@app/homebanking/WithHeader";
import Table from "@components/Table";
import LoanSimulator from "./LoanSimulator";

export default function Prestamos() {
  const [openLoanModal, setOpenLoanModal] = useState(false);

  return (
    <>
      <WithHeader
        title="Préstamos"
        submenuOptions={[
          {
            id: 1,
            text: "Simular préstamo",
            callback: () => {
              setOpenLoanModal(true);
            },
          },
        ]}
        tags={[
          {
            text: "Historial de préstamos",
          },
        ]}
      >
        <main>
          <Table
            thead={[
              "ID Préstamo",
              "Monto",
              "Plazo",
              "Tasa de Interés",
              "Cuota Mensual",
              "Estado",
            ]}
            tbody={[
              ["001", "$10,000", "24 meses", "8%", "$450", "Aprobado"],
              ["002", "$5,000", "12 meses", "7%", "$230", "En Proceso"],
              ["003", "$20,000", "36 meses", "9%", "$780", "Pagado"],
            ]}
          />
        </main>
      </WithHeader>
      <LoanSimulator
        open={openLoanModal}
        onClose={() => setOpenLoanModal(false)}
      />
    </>
  );
}

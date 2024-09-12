import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { useEffect, useState } from "react";

const interestRate = 8;

type LoanSimulationDefinition = {
  amount: number | null;
  term: number | null;
  payment: number | null;
  amortizationSystem: "french" | "german" | "bullet";
  schedule: string[][];
  calculate: boolean;
};

export default function LoanSimulator({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loan, setLoan] = useState<LoanSimulationDefinition>({
    amount: null,
    term: null,
    payment: null,
    amortizationSystem: "french",
    schedule: [],
    calculate: false,
  });

  useEffect(() => {
    if (loan.amount === null || loan.term === null) return;
    if (!loan.calculate) return;

    let remainingLoan = loan.amount;
    let average_pmt = 0;
    let tmp = 0;
    const amortizationSchedule: string[][] = [];

    switch (loan.amortizationSystem) {
      case "french": {
        const pmt =
          (loan.amount *
            (interestRate / 12) *
            (1 + interestRate / 12) ** (12 * loan.term)) /
          ((1 + interestRate / 12) ** (12 * loan.term) - 1);

        for (let i = 1; i <= loan.term * 12; i++) {
          const interesti = (remainingLoan * interestRate) / 12;
          remainingLoan -= pmt - interesti;
          if (i === loan.term * 12) remainingLoan = 0;
          amortizationSchedule.push([
            i.toString(),
            pmt.toFixed(2),
            (pmt - interesti).toFixed(2),
            interesti.toFixed(2),
            remainingLoan.toFixed(2),
          ]);
        }
        average_pmt = pmt;
        break;
      }
      case "german": {
        const pmtPrincipal = loan.amount / (loan.term * 12);
        tmp = 0;
        for (let i = 1; i <= loan.term * 12; i++) {
          const interesti = (remainingLoan * interestRate) / 12;
          remainingLoan -= pmtPrincipal;
          if (i === loan.term * 12) remainingLoan = 0;
          const pmt = pmtPrincipal + interesti;
          tmp += pmt;
          amortizationSchedule.push([
            i.toString(),
            pmt.toFixed(2),
            (pmt - interesti).toFixed(2),
            interesti.toFixed(2),
            remainingLoan.toFixed(2),
          ]);
        }
        average_pmt = tmp / (loan.term * 12);
        break;
      }
      case "bullet": {
        tmp = 0;
        for (let i = 1; i <= loan.term * 12; i++) {
          const interesti = (loan.amount * interestRate) / 12;
          let pmt = interesti;
          if (i === loan.term * 12) {
            pmt += loan.amount;
            remainingLoan = 0;
          }
          tmp += pmt;
          amortizationSchedule.push([
            i.toString(),
            pmt.toFixed(2),
            (pmt - interesti).toFixed(2),
            interesti.toFixed(2),
            remainingLoan.toFixed(2),
          ]);
        }
        average_pmt = (tmp + loan.amount) / (loan.term * 12);
        break;
      }
    }
    setLoan({
      ...loan,
      payment: average_pmt,
      schedule: amortizationSchedule,
      calculate: false,
    });
  }, [loan]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setLoan({
          amount: null,
          term: null,
          payment: null,
          amortizationSystem: "french",
          schedule: [],
          calculate: false,
        });
        onClose();
      }}
      title="Simular un Préstamo"
    >
      <form className="flex flex-col w-full [&>*]:mt-2 first:mt-0">
        <label className="text-base font-medium" htmlFor="loan-amount">
          Importe
        </label>
        <input
          id="loan-amount"
          className="input-default"
          type="number"
          min="0"
          required
          value={loan.amount ?? ""}
          onChange={(e) => {
            setLoan({ ...loan, amount: +e.target.value, calculate: true });
          }}
        />
        <label className="text-base font-medium" htmlFor="loan-term">
          Plazo
        </label>
        <input
          id="loan-term"
          className="input-default"
          type="number"
          min="0"
          required
          value={loan.term ?? ""}
          onChange={(e) => {
            setLoan({ ...loan, term: +e.target.value, calculate: true });
          }}
        />
        <label className="text-base font-medium" htmlFor="loan-interest">
          Tasa de interés
        </label>
        <input
          id="loan-interest"
          className="input-default"
          type="number"
          value={interestRate}
          disabled
          min="0"
          required
        />
        <label className="text-base font-medium" htmlFor="loan-amortization">
          Sistema de amortización
        </label>
        <select
          id="loan-amortization"
          className="input-default"
          value={loan.amortizationSystem}
          onChange={(e) => {
            const value = e.target.value;
            if (["french", "german", "bullet"].includes(value)) {
              setLoan({
                ...loan,
                amortizationSystem: value as "french" | "german" | "bullet",
                calculate: true,
              });
            }
          }}
        >
          <option value={"french"}>Francés</option>
          <option value={"german"}>Alemán</option>
          <option value={"bullet"}>Bullet</option>
        </select>
        <label className="text-base font-medium" htmlFor="loan-payment">
          Cuota mensual promedio
        </label>
        <output
          id="loan-payment"
          hidden={!loan.payment}
          className="input-default"
        >
          {loan.payment}
        </output>
        <label className="text-base font-medium" htmlFor="loan-table">
          Tabla de amortización
        </label>
        <Table
          id="loan-table"
          hidden={loan.schedule.length === 0}
          thead={["Mes", "Cuota", "Principal", "Interés", "Balance"]}
          tbody={loan.schedule}
        />
      </form>
    </Modal>
  );
}

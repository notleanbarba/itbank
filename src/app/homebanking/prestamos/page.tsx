import { useState } from "react";
import LoanTable from "../../components/LoanTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Prestamos() {
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(0);
  const [loanPayment, setLoanPayment] = useState<number>(0);
  const [amortizationSystem, setAmortizationSystem] =
    useState<string>("Francés");

  const interestRate = 8; // Tasa de interés fija

  // Simulación del préstamo
  const simulateLoan = () => {
    const monthlyInterest = interestRate / 100 / 12;
    let payment = 0; // Inicializa con un valor por defecto

    if (amortizationSystem === "Francés") {
      payment =
        loanAmount *
        (monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -loanTerm)));
    } else if (amortizationSystem === "Alemán") {
      const capitalPayment = loanAmount / loanTerm;
      payment = capitalPayment + loanAmount * monthlyInterest;
    } else if (amortizationSystem === "Bullet") {
      payment = loanAmount * monthlyInterest;
    }

    // Verifica si payment es un número válido antes de llamarlo con toFixed
    if (!isNaN(payment)) {
      setLoanPayment(parseFloat(payment.toFixed(2)));
    } else {
      setLoanPayment(0); // Si hay algún error, asigna 0 como valor predeterminado
    }
  };

  const toggleLoanModal = () => {
    setIsLoanModalOpen(!isLoanModalOpen);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <section className="content secondary p-6 bg-white">
        <div className="summary-menu">
          <div className="menu">
            <div className="content-title">Préstamos</div>
            <button
              type="button"
              id="menu-selector"
              className="bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
              onClick={toggleLoanModal}
            >
              Simular Préstamo
            </button>
          </div>
          <div className="summary">
            <h2 className="text-lg font-bold" />
          </div>
        </div>
        <div className="summary">
          <h2 className="text-lg font-bold">Tus préstamos activos</h2>
          <LoanTable />
        </div>
        {isLoanModalOpen && (
          <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="modal-dialog bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
              <button
                type="button"
                className="modal-close absolute top-2 right-2 text-xl"
                onClick={toggleLoanModal}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <h1 className="text-xl font-bold text-gray-800 mb-4">
                Simular un Préstamo
              </h1>
              <form className="flex flex-col gap-4">
                <label htmlFor="loan-amount" className="text-gray-700">
                  Importe
                </label>
                <input
                  id="loan-amount"
                  type="number"
                  className="p-2 border border-gray-300 rounded"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  min="0"
                  required
                />
                <label htmlFor="loan-term" className="text-gray-700">
                  Plazo en meses
                </label>
                <input
                  id="loan-term"
                  type="number"
                  className="p-2 border border-gray-300 rounded"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  min="0"
                  required
                />
                <label htmlFor="loan-interest" className="text-gray-700">
                  Tasa de interés (%)
                </label>
                <input
                  id="loan-interest"
                  type="number"
                  className="p-2 border border-gray-300 rounded"
                  value={interestRate}
                  disabled
                />
                <label htmlFor="loan-amortization" className="text-gray-700">
                  Sistema de amortización
                </label>
                <select
                  id="loan-amortization"
                  className="p-2 border border-gray-300 rounded"
                  value={amortizationSystem}
                  onChange={(e) => setAmortizationSystem(e.target.value)}
                >
                  <option value="Francés">Francés</option>
                  <option value="Alemán">Alemán</option>
                  <option value="Bullet">Bullet</option>
                </select>

                <button
                  type="button"
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors"
                  onClick={simulateLoan}
                >
                  Calcular Cuota
                </button>
              </form>
              {loanPayment > 0 && (
                <div className="mt-4">
                  <p className="text-lg font-bold">
                    Cuota mensual: ${loanPayment}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

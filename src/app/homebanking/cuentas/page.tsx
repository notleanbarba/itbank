import React, { useState, useEffect } from 'react';




const currenciesList = ["ARS", "USD", "CLP", "BRL", "UYU"];

const fetchCurrencyRates = async (currency: string) => {
  const response = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
  const data = await response.json();
  return data.rates;
};

const Cuentas: React.FC = () => {
  const [rates, setRates] = useState<{ [key: string]: { [key: string]: number } }>({});
  const [fromCurrency, setFromCurrency] = useState<string>("ARS");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadRates = async () => {
      try {
        const fetchedRates = await Promise.all(
          currenciesList.map(async (currency) => {
            const rates = await fetchCurrencyRates(currency);
            return { [currency]: rates };
          })
        );

        const ratesObject = fetchedRates.reduce((acc, item) => {
          const [currency, rates] = Object.entries(item)[0];
          acc[currency] = rates;
          return acc;
        }, {} as { [key: string]: { [key: string]: number } });

        setRates(ratesObject);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    };

    loadRates();
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
      setConvertedAmount(amount * rates[fromCurrency][toCurrency]);
    } else {
      setConvertedAmount(0);
    }
  }, [fromCurrency, toCurrency, amount, rates]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <section className="content secondary bg-white">
        <div className="summary-menu">
          <div className="menu">
            <div className="content-title">
              Cuenta 123-45678/1
            </div>
            <button
              aria-label="operaciones"
              className="menu-selector"
              id="menu-selector"
              type="button"
              onClick={openModal}
            >
              Consultas y Operaciones{' '}
              <i className="fa-solid fa-chevron-down" />
            </button>
            <nav className="menu-list" id="menu-list">
              <button
                className="modal-open"
                name="exchange-modal"
                onClick={openModal}
              >
                Convertir divisas
              </button>
            </nav>
          </div>
          <div className="summary">
            <div className="data-with-header">
              Saldo en pesos
              <div className="data">
                <span className="balance-symbol">$</span>
                <span id="balanceARS">1000000</span>
              </div>
            </div>
            <div className="data-with-header">
              Saldo en dólares
              <div className="data">
                <span className="balance-symbol">U$D</span>
                <span id="balanceUSD">1000000</span>
              </div>
            </div>
            <div className="account-info">
              <div className="account-param">
                CBU:
                <span id="account-cbu">0000000000000000000000</span>
              </div>
              <div className="account-param">
                ALIAS:
                <span id="account-alias">itbank.account</span>
              </div>
            </div>
          </div>
          <div className="tag-group">
            <div className="tag active">Movimientos en pesos</div>
            <div className="tag">Movimientos en dólares</div>
          </div>
        </div>
        <div className="page-data">
          <main>
            <p>No tenés movimientos en los últimos 7 días.</p>
            <p>Podés consultar los movimientos de los últimos 60 días.</p>
          </main>
        </div>
      </section>

      {/* Modal for currency exchange */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" tabIndex={-1} type="button" onClick={closeModal}>
              <i className="fa-solid fa-xmark" />
            </button>
            <h1>Convertir divisas</h1>
            <form id="exchange-calculator">
              <label htmlFor="from_currency">De</label>
              <select
                id="from_currency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currenciesList.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

              <label htmlFor="give_currency">Monto a convertir</label>
              <input
                id="give_currency"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              />

              <label htmlFor="to_currency">A</label>
              <select
                id="to_currency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currenciesList.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

              <label htmlFor="receive_currency">Monto a recibir</label>
              <output id="receive_currency">{convertedAmount.toFixed(2)}</output>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cuentas;




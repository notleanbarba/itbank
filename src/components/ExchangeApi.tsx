import { useEffect, useState } from "react";
import StockChart from "@components/StockChart";
import TickerSearch from "@components/TickerSearch";

import type { StockAggregateDefinition, TickerDefinition } from "@types";

type StockDataDefinition = TickerDefinition & {
  querying: boolean;
  history: StockAggregateDefinition[];
  error: {
    state: boolean;
    message?: string;
  };
};

type Transaction = {
  symbol: string;
  type: "buy" | "sell";
  price: number;
  date: string;
};

const API_KEY = "asfJOmsqHTFWIJp2hd8wXtjpR9psLlWa";

const fetchStockData = async (
  ticker: string,
): Promise<StockAggregateDefinition[]> => {
  return new Promise((res, rej) => {
    fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-01/2023-12-31?adjusted=true&sort=desc&limit=120&apiKey=${API_KEY}`,
    )
      .then((response) => {
        if (!response.ok) return rej("Error de la API");
        return response.json();
      })
      .then((data) => {
        if (data.status !== "OK") return rej("Error de la API");
        if (data.results.length === 0) return rej("No se encontraron datos");
        return res(data.results.reverse() as StockAggregateDefinition[]);
      })
      .catch((e) => {
        return rej(`Error inesperado: ${e}`);
      });
  });
};

export default function StockData() {
  const [stockData, setStockData] = useState<StockDataDefinition>({
    ticker: "AAPL",
    name: "Apple Inc.",
    querying: true,
    history: [],
    error: {
      state: false,
    },
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (stockData.querying) {
      fetchStockData(stockData.ticker)
        .then((results) => {
          setStockData({
            ...stockData,
            querying: false,
            history: results,
            error: { state: false },
          });
        })
        .catch((error) => {
          setStockData({
            ...stockData,
            querying: false,
            error: {
              state: true,
              message: error,
            },
          });
        });
    }
  }, [stockData]);

  const handleSearchSelect = (selectedTicker: TickerDefinition) => {
    setStockData({ ...stockData, ...selectedTicker, querying: true });
  };

  const handleTransaction = (type: "buy" | "sell") => {
    if (stockData.history.length > 0) {
      const latestPrice = stockData.history[0].c;
      const newTransaction: Transaction = {
        symbol: stockData.ticker,
        type,
        price: latestPrice,
        date: new Date().toLocaleDateString(),
      };
      setTransactions([...transactions, newTransaction]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="p-4 bg-gray-100 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Datos de {stockData.name} | ${stockData.ticker}
        </h1>
        <TickerSearch onSelect={handleSearchSelect} />
        <StockChart
          loading={stockData.querying}
          data={stockData.history}
          error={stockData.error.message}
        />
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-lg">
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => handleTransaction("buy")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Comprar
          </button>
          <button
            type="button"
            onClick={() => handleTransaction("sell")}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Vender
          </button>
        </div>
        <h3 className="font-bold text-lg mb-2">Historial de Transacciones</h3>
        {/*transactions.length > 0 ? (
            <ul>
              {transactions.map((t, i) => (
                <li key={i}>
                  {t.type === "buy" ? "Compró" : "Vendió"} {t.symbol} a $
                  {t.price} el {t.date}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay transacciones registradas.</p>
          )*/}
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StockDataType = {
  c: number;
  v: number;
  t: number;
};
type SymbolType = {
  ticker: string;
  name: string;
};
type Transaction = {
  symbol: string;
  type: "buy" | "sell";
  price: number;
  date: string;
};

// Hook para obtener datos de acciones
const useFetchStockData = (symbol: string, apiKey: string) => {
  const [stockData, setStockData] = useState<StockDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2023-01-01/2023-12-31?adjusted=true&sort=desc&limit=120&apiKey=${apiKey}`,
      );
      const data = await response.json();
      if (response.ok && data.results.length)
        return setStockData(data.results.reverse());
      throw new Error("No se encontraron datos.");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [symbol, apiKey]);

  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);
  return { stockData, loading, error };
};

// Hook para obtener símbolos
const useFetchSymbols = (apiKey: string, query: string) => {
  const [symbols, setSymbols] = useState<SymbolType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSymbols = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.polygon.io/v3/reference/tickers?search=${query}&apiKey=${apiKey}&limit=50`,
      );
      const data = await response.json();
      if (response.ok && data.results) setSymbols(data.results);
      else throw new Error("No se encontraron símbolos.");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [query, apiKey]);

  useEffect(() => {
    const debounce = setTimeout(() => fetchSymbols(), 500);
    return () => clearTimeout(debounce);
  }, [fetchSymbols]);
  return { symbols, loading, error };
};

export default function StockData() {
  const API_KEY = "asfJOmsqHTFWIJp2hd8wXtjpR9psLlWa";
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [inputSymbol, setInputSymbol] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { stockData, loading, error } = useFetchStockData(symbol, API_KEY);
  const {
    symbols,
    loading: symbolsLoading,
    error: symbolsError,
  } = useFetchSymbols(API_KEY, inputSymbol);

  const handleTransaction = (type: "buy" | "sell") => {
    if (stockData.length > 0) {
      const latestPrice = stockData[0].c;
      const newTransaction: Transaction = {
        symbol,
        type,
        price: latestPrice,
        date: new Date().toLocaleDateString(),
      };
      setTransactions([...transactions, newTransaction]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Datos de {symbol}</h1>
      <div className="flex items-center mb-4 relative">
        <input
          type="text"
          value={inputSymbol}
          onChange={(e) => setInputSymbol(e.target.value)}
          placeholder="Ingresa un símbolo"
          className="p-2 border border-gray-300 rounded-md focus:outline-none w-full"
        />
        {inputSymbol && (
          <ul className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full max-h-40 overflow-y-auto z-50">
            {symbolsLoading ? (
              <li>Cargando...</li>
            ) : symbolsError ? (
              <li>{symbolsError}</li>
            ) : (
              symbols.map((sym) => (
                <li
                  key={sym.ticker}
                  className="p-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => {
                    setSymbol(sym.ticker);
                    setInputSymbol("");
                  }}
                >
                  {sym.ticker} - {sym.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {loading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        stockData &&
        stockData.length > 0 && (
          <div className="p-4 bg-gray-100 rounded-md shadow-lg">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={stockData
                  .filter((_, index) => index % 10 === 0)
                  .map((item) => ({
                    c: item.c,
                    v: item.v,
                    date: new Date(item.t).toLocaleDateString(),
                  }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="c"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
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
          </div>
        )
      )}

      <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-lg">
        <h3 className="font-bold text-lg mb-2">Historial de Transacciones</h3>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((t, i) => (
              <li key={i}>
                {t.type === "buy" ? "Compró" : "Vendió"} {t.symbol} a ${t.price}{" "}
                el {t.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay transacciones registradas.</p>
        )}
      </div>
    </div>
  );
}

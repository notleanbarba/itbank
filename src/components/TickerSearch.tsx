import { useState, useEffect } from "react";
import { Combobox } from "react-widgets/esm";

import type { TickerDefinition } from "@types";
type stateDefinition = {
  query: string;
  querying: boolean;
  results: {
    queries: string[];
    data: TickerDefinition[];
    error: {
      state: boolean;
      message?: string;
    };
  };
};

const API_KEY = "asfJOmsqHTFWIJp2hd8wXtjpR9psLlWa";

const fetchSymbols = async (query: string): Promise<TickerDefinition[]> => {
  return new Promise((res, rej) => {
    fetch(
      `https://api.polygon.io/v3/reference/tickers?search=${query}&apiKey=${API_KEY}&limit=50`,
    )
      .then((response) => {
        if (!response.ok) return rej("Error de la API");
        return response.json();
      })
      .then((data) => {
        if (data.status !== "OK") return rej("Error de la API");
        if (data.results.length === 0) return rej("No se encontraron datos");
        return res(data.results as TickerDefinition[]);
      })
      .catch((e) => {
        return rej(`Error inesperado: ${e}`);
      });
  });
};

export default function TickerSearch({
  onSelect,
}: {
  onSelect: (ticker: TickerDefinition) => void;
}) {
  const [state, setState] = useState<stateDefinition>({
    query: "",
    querying: false,
    results: {
      queries: [],
      data: [],
      error: {
        state: false,
      },
    },
  });
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (state.querying) {
      fetchSymbols(state.query)
        .then((symbols) => {
          setState({
            ...state,
            querying: false,
            results: {
              queries: [...state.results.queries, state.query],
              data: [...state.results.data, ...symbols].filter(
                (value, index, arr) =>
                  arr.findIndex((v) => v.ticker === value.ticker) === index,
              ),
              error: {
                state: false,
              },
            },
          });
        })
        .catch((e) => {
          setState({
            ...state,
            querying: false,
            results: {
              ...state.results,
              error: {
                state: true,
                message: e,
              },
            },
          });
        });
    }
  }, [state]);

  return (
    <>
      <search className="flex items-center mb-4 relative">
        <label
          className="text-nowrap pr-2 w-full"
          htmlFor="TickerSearch_searchinput"
        >
          Buscar un símbolo
          <Combobox
            id="TickerSearch_searchinput"
            inputProps={{
              type: "search",
              className:
                "w-full p-2 border border-gray-300 rounded-md focus:border-2",
            }}
            listProps={{
              className:
                "border border-gray-300 rounded-md shadow-lg w-full max-h-40 overflow-y-auto z-50",
            }}
            value={state.query ?? ""}
            placeholder="AAPL"
            data={state.results.data}
            dataKey="ticker"
            textField="ticker"
            busy={state.querying}
            onChange={(value) => {
              if (typeof value === "string") {
                setState({
                  ...state,
                  query: value,
                  querying:
                    value !== "" &&
                    !state.results.queries.includes(state.query),
                });
                setDropdown(value !== "");
              }
            }}
            onSelect={(dataItem) => {
              onSelect(dataItem as TickerDefinition);
              setState({
                ...state,
                query: "",
              });
              setDropdown(false);
            }}
            renderListItem={({ item }) => (
              <div className="p-2 cursor-pointer hover:bg-blue-100 aria-selected:bg-blue-100 text-wrap">
                {item.ticker} - {item.name}
              </div>
            )}
            open={dropdown}
            hideEmptyPopup={true}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                setDropdown(true);
              }
              if (e.key === "Escape") {
                setDropdown(false);
              }
            }}
            focusFirstItem={true}
          />
        </label>
      </search>
    </>
  );
}

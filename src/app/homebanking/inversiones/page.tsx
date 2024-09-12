import { useState } from "react";

import WithHeader from "@app/homebanking/WithHeader";
import StockData from "@components/ExchangeApi";
import Table from "@components/Table";

export default function Inversiones() {
  const [tab, setTab] = useState(0);

  return (
    <WithHeader
      title="Inversiones"
      submenuOptions={[]}
      tags={[
        {
          text: "Tus tenencias",
          callback: () => setTab(0),
        },
        {
          text: "Operar",
          callback: () => setTab(1),
        },
      ]}
    >
      <main>
        {tab === 0 && (
          <>
            <section className="assets-summary">
              <div className="bg-[#d9d9d999] rounded-t-xl p-4 flex flex-row flex-wrap shadow-float [&_div]:mt-3 [&_div]:mr-4 [&_div]:text-base [&_div_span]:mt-1 [&_div_span]:block [&_div_span]:text-lg">
                <h2 className="w-full text-2xl font-medium">
                  Tenencias en pesos
                </h2>
                <div>
                  Valor actual <span>$0,00</span>
                </div>
                <div>
                  Valor de compra <span>$0,00</span>
                </div>
                <div>
                  Ganancia <span>$0,00</span> <span>0%</span>
                </div>
              </div>
              <div className="my-4 h-80 text-center content-center shadow-float">
                Sin datos
              </div>
              <Table
                thead={[
                  "Producto",
                  "Tenencia valuada al costo",
                  "Tenencia valuada a hoy",
                  "Resultado",
                ]}
                tbody={[
                  ["Plazo fijo", "$0,00", "$0,00", "$0,00"],
                  ["FCI", "$0,00", "$0,00", "$0,00"],
                  ["Acciones", "$0,00", "$0,00", "$0,00"],
                ]}
                tfoot={["Total", "$0,00", "$0,00", "$0,00"]}
              />
            </section>
            <section>
              <div className="bg-[#d9d9d999] rounded-t-xl p-4 flex flex-row flex-wrap shadow-float [&_div]:mt-3 [&_div]:mr-4 [&_div]:text-base [&_div_span]:mt-1 [&_div_span]:block [&_div_span]:text-lg">
                <h2 className="w-full text-2xl font-medium">
                  Tenencias en dólares
                </h2>
                <div>
                  Valor actual <span>$0,00</span>
                </div>
                <div>
                  Valor de compra <span>$0,00</span>
                </div>
                <div>
                  Ganancia <span>$0,00</span> <span>0%</span>
                </div>
              </div>
              <div className="my-4 h-80 text-center content-center shadow-float">
                Sin datos
              </div>
              <Table
                thead={[
                  "Producto",
                  "Tenencia valuada al costo",
                  "Tenencia valuada a hoy",
                  "Resultado",
                ]}
                tbody={[
                  ["Plazo fijo", "U$D0,00", "U$D0,00", "U$D0,00"],
                  ["FCI", "U$D0,00", "U$D0,00", "U$D0,00"],
                  ["Acciones", "U$D0,00", "U$D0,00", "U$D0,00"],
                ]}
                tfoot={["Total", "U$D0,00", "U$D0,00", "U$D0,00"]}
              />
            </section>
          </>
        )}
        {tab === 1 && <StockData />}
      </main>
    </WithHeader>
  );
}

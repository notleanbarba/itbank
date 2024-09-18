"use client";

import { useState, useEffect } from "react";
import WithHeader from "@app/homebanking/WithHeader";
import Factura from "./factura.tsx";
import { FacturaType } from "@types";

export default function Pagos() {
  const [selectedFacturaId, setSelectedFacturaId] = useState<string | null>(
    null,
  );
  const [facturas, setFacturas] = useState<FacturaType[]>([]);

  useEffect(() => {
    async function fetchFacturas() {
      const res = await fetch("/facturas.json");

      if (res.ok) {
        const data = (await res.json()) as FacturaType[];
        setFacturas(data);
      } else {
        console.error("no cargo la factura");
      }
    }
    fetchFacturas();
  }, []);

  return (
    <>
      <WithHeader
        title="Todos tus pagos"
        submenuOptions={[]}
        tags={[
          {
            text: "Calendario de pagos",
          },
        ]}
      >
        <div>
          <h2>Seleccione una factura:</h2>
          {facturas.length === 0 ? (
            <p>Cargando facturas...</p>
          ) : (
            <ul>
              {facturas.map((factura) => (
                <li key={factura.id} className="m-7 p-5 bg-slate-200 w-2/4 h-3">
                  <button onClick={() => setSelectedFacturaId(factura.id)}>
                    Factura {factura.servicio} - {factura.cliente}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedFacturaId && <Factura id={selectedFacturaId} />}
        <main />
      </WithHeader>
    </>
  );
}

"use client";

/* import { useState, useEffect } from "react"; */
import WithHeader from "@app/homebanking/WithHeader";
/* import Factura from "./factura.tsx";
import { FacturaType } from "@types"; */
import Table from "@components/Table.tsx";

/* export default function Pagos() {
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
 */
export default function Pagos() {
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
          <Table
            thead={["Servicio", "Cliente", "Total", "Estado"]}
            tbody={[
              ["Edenor", "Juan Perez", "1000", "Pendiente"],
              ["Aysa", "Juan Perez", "2000", "Pagado"],
              ["Edenor", "Juan Perez", "3000", "Pendiente"],
              ["Impuesto municipal", "Juan Perez", "500", "Pagado"],
              ["Aysa", "Juan Perez", "5000", "Pagado"],
              ["Impuesto municipal", "Juan Perez", "1000", "Pagado"],
              ["Impuesto municipal", "Juan Perez", "500", "Pagado"],
            ]}
          />
        </div>
        {/* {{selectedFacturaId && <Factura id={selectedFacturaId} />}} */}
        <main />
      </WithHeader>
    </>
  );
}

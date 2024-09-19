"use client";

import { useState, useEffect, useRef } from "react";
import WithHeader from "@app/homebanking/WithHeader";
import Factura from "./factura.tsx";
import { FacturaType } from "@types";
import Table from "@components/Table.tsx";

export default function Pagos() {
  const [selectedFacturaId, setSelectedFacturaId] = useState<string | null>(
    null,
  );
  const [facturas, setFacturas] = useState<FacturaType[]>([]);
  const tableRef = useRef<HTMLDivElement>(null); // Create a ref for the table container

  // Fetch facturas from the JSON file
  useEffect(() => {
    async function fetchFacturas() {
      const res = await fetch("/facturas.json");

      if (res.ok) {
        const data = (await res.json()) as FacturaType[];
        setFacturas(data);
      } else {
        console.error("Error loading facturas.");
      }
    }
    fetchFacturas();
  }, []);

  // Handle row click to select or deselect a factura by ID
  const handleRowClick = (rowIndex: number) => {
    const facturaId = facturas[rowIndex].id;
    // Toggle selectedFacturaId
    setSelectedFacturaId((prevId) => (prevId === facturaId ? null : facturaId));
  };

  // Close factura details if clicked outside the table
  const handleClickOutside = (event: MouseEvent) => {
    if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
      setSelectedFacturaId(null);
    }
  };

  // Set up the event listener
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Map facturas data to the table rows (only essential info)
  const tableData = facturas.map((factura) => [
    factura.servicio,
    factura.cliente,
  ]);

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
        <div ref={tableRef}>
          {" "}
          {/* Attach ref to the table container */}
          <h2>Seleccione una factura:</h2>
          {/* Dynamically generate the table with essential information */}
          <Table
            thead={["Servicio", "Cliente"]}
            tbody={tableData}
            onRowClick={handleRowClick} // Add row click handler here
          />
        </div>

        {/* Conditionally show the Factura component only when a factura is selected */}
        {selectedFacturaId && (
          <div className="mt-4 mb-10">
            {" "}
            {/* Added margin to push the footer down */}
            <Factura id={selectedFacturaId} />
          </div>
        )}
      </WithHeader>
    </>
  );
}

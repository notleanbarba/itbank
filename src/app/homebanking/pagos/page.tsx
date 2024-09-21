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
  const [clienteNombre, setClienteNombre] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedClienteNombre = localStorage.getItem("clienteNombre");

    if (!storedClienteNombre) {
      console.error("No se encontró el nombre del cliente");
      return;
    }

    setClienteNombre(storedClienteNombre);

    async function fetchFacturas() {
      const res = await fetch("/facturas.json");
      if (res.ok) {
        const data = (await res.json()) as FacturaType[];

        const facturasFiltradas = data.filter(
          (factura) => factura.cliente === storedClienteNombre,
        );
        setFacturas(facturasFiltradas);
      } else {
        console.error("Error cargando las facturas.");
      }
    }

    fetchFacturas();
  }, []);

  const handleRowClick = (rowIndex: number) => {
    const facturaId = facturas[rowIndex].id;
    setSelectedFacturaId((prevId) => (prevId === facturaId ? null : facturaId));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
      setSelectedFacturaId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const tableData = facturas.map((factura) => [
    factura.servicio,
    factura.cliente,
  ]);

  if (!clienteNombre) {
    return <div>No se encontró el cliente o no ha iniciado sesión.</div>;
  }

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
          <h2>Seleccione una factura:</h2>
          <Table
            thead={["Servicio", "Cliente"]}
            tbody={tableData}
            onRowClick={handleRowClick}
          />
        </div>

        {selectedFacturaId && (
          <div className="mt-4 mb-10">
            <Factura id={selectedFacturaId} />
          </div>
        )}
      </WithHeader>
    </>
  );
}

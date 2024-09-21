"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import WithHeader from "@app/homebanking/WithHeader";
import Factura from "./factura";
import { FacturaType } from "@types";
import Table from "@components/Table";

export default function Pagos() {
  const [selectedFacturaId, setSelectedFacturaId] = useState<string | null>(
    null,
  );
  const [facturas, setFacturas] = useState<FacturaType[]>([]);
  const [clienteNombre, setClienteNombre] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedClienteNombre = localStorage.getItem("clienteNombre");

    if (!clienteNombre) {
    }
    if (!storedClienteNombre) {
      setError("No se encontró el nombre del cliente.");
      setLoading(false);
      return;
    }

    setClienteNombre(storedClienteNombre);

    async function fetchFacturas() {
      try {
        const res = await fetch("/facturas.json");

        if (res.ok) {
          const data = (await res.json()) as FacturaType[];

          const facturasFiltradas = data.filter(
            (factura) => factura.cliente === storedClienteNombre,
          );
          setFacturas(facturasFiltradas);
        } else {
          setError("Error al cargar las facturas.");
        }
      } catch (error) {
        setError("Ocurrió un error al obtener las facturas.");
      } finally {
        setLoading(false);
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

  const tableData = useMemo(
    () => facturas.map((factura) => [factura.servicio, factura.cliente]),
    [facturas],
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <WithHeader
      title="Todos tus pagos"
      submenuOptions={[]}
      tags={[
        {
          text: "Calendario de pagos",
        },
      ]}
    >
      <div ref={tableRef} className="p-4 bg-white shadow rounded">
        <h2 className="text-lg font-semibold mb-4">Seleccione una factura:</h2>
        {facturas.length > 0 ? (
          <Table
            thead={["Servicio", "Cliente"]}
            tbody={tableData}
            onRowClick={handleRowClick}
          />
        ) : (
          <div>No hay facturas disponibles.</div>
        )}
      </div>

      {selectedFacturaId && (
        <div className="mt-4 mb-10 p-4 bg-slate-200 rounded shadow">
          <Factura id={selectedFacturaId} />
        </div>
      )}
    </WithHeader>
  );
}

"use client";

import { useEffect, useState } from "react";
import { FacturaType } from "@types";

interface FacturaProps {
  id: string;
}

export default function Factura({ id }: FacturaProps) {
  const [factura, setFactura] = useState<FacturaType | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const storedClienteNombre = localStorage.getItem("clienteNombre");
    if (storedClienteNombre) {
      async function fetchFactura() {
        try {
          const res = await fetch("/facturas.json");
          if (res.ok) {
            const data = (await res.json()) as FacturaType[];
            const facturaEncontrada = data.find(
              (f) => f.id === id && f.cliente === storedClienteNombre,
            );
            setFactura(facturaEncontrada || undefined);
          } else {
            setError("Error al obtener las facturas.");
          }
        } catch (err) {
          setError("Ocurrió un error al conectar con el servidor.");
        } finally {
          setLoading(false);
        }
      }

      fetchFactura();
    } else {
      setError("Cliente no encontrado en el almacenamiento local.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <svg
          className="animate-spin h-8 w-8 text-blue-600 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span className="text-blue-600 font-medium">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (factura === undefined) {
    return (
      <div
        className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Atención: </strong>
        <span className="block sm:inline">No se encontraron facturas.</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Detalles de la Factura
        </h2>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Servicio:</span>
          <span className="ml-2 text-gray-600">{factura?.servicio}</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Cliente:</span>
          <span className="ml-2 text-gray-600">{factura?.cliente}</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Saldo a Pagar:</span>
          <span className="ml-2 text-gray-600">
            ${factura?.total.toFixed(2)}
          </span>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Estado:</span>
          <span
            className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              factura?.estado === "Pagado"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {factura?.estado}
          </span>
        </div>
      </div>
    </div>
  );
}

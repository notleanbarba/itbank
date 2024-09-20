import { useEffect, useState } from "react";
import { FacturaType, Cliente } from "@types";

interface FacturaProps {
  id: string;
}

export default function Factura({ id }: FacturaProps) {
  const [factura, setFactura] = useState<FacturaType | null | undefined>(null);

  useEffect(() => {
    if (!id) return;

    const storedCliente = localStorage.getItem("cliente");
    if (storedCliente) {
      const cliente: Cliente = JSON.parse(storedCliente);

      async function fetchFactura() {
        const res = await fetch(`/facturas.json`);
        if (res.ok) {
          const data = (await res.json()) as FacturaType[];

          const facturaEncontrada = data.find(
            (f) => f.id === id && f.cliente === cliente.nombre,
          );

          setFactura(facturaEncontrada || undefined);
        } else {
          setFactura(undefined);
        }
      }

      fetchFactura();
    }
  }, [id]);

  if (factura === null) {
    return <div>Cargando...</div>;
  }

  if (factura === undefined) {
    return <div>No se encontraron facturas.</div>;
  }

  return (
    <div className="m-1/12 bg-slate-200">
      <h1 className="m-2">Detalles de la factura:</h1>
      <p className="m-2">Servicio: {factura.servicio}</p>
      <p className="m-2">Cliente: {factura.cliente}</p>
      <p className="m-2">Saldo a pagar: {factura.total}</p>
      <p className="m-2">Estado: {factura.estado}</p>
    </div>
  );
}

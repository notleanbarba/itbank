"use client";
import { useState, useEffect } from "react";
import { obtenerClientes } from "@/app/data/cliente";
import { Cliente, datoTarjeta } from "@/types";
import { Cartas } from "@components/credito";

export default function Tarjeta() {
  const [clienteAutenticado, setClienteAutenticado] = useState<Cliente | null>(
    null,
  );

  useEffect(() => {
    const fetchClientes = async () => {
      const storedClienteId = localStorage.getItem("clienteId");

      if (storedClienteId) {
        const clientes = await obtenerClientes();
        const cliente =
          clientes.find((cliente) => cliente.id === storedClienteId) || null;
        setClienteAutenticado(cliente);
      }
    };

    fetchClientes();
  }, []);

  if (!clienteAutenticado) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex justify-center pt-10 h-auto bg-gray-100">
      <div className="block">
        {clienteAutenticado.tarjeta.map((tarjeta: datoTarjeta) => (
          <Cartas key={`tarjeta_${tarjeta.numeroTarjeta}`} tarjeta={tarjeta} />
        ))}
      </div>
    </div>
  );
}

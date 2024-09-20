"use client";
import { useState, useEffect } from "react";
import { obtenerClientes } from "@/app/data/cliente";
import { Cliente, datoTarjeta } from "@/types";
import { Cartas } from "@components/credito";

export default function Tarjeta() {
  const [clienteAutenticado, setClienteAutenticado] = useState<Cliente | null>(
    null,
  );

  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClienteAutenticado = async () => {
      try {
        const storedClienteId = localStorage.getItem("clienteId");

        if (storedClienteId) {
          const clientes: Cliente[] = await obtenerClientes();
          const cliente =
            clientes.find((cliente) => cliente.id === storedClienteId) || null;
          setClienteAutenticado(cliente);
        } else {
          setError("No se encontró el ID del cliente en localStorage.");
        }
      } catch (err) {
        console.error("Error al obtener el cliente autenticado:", err);
        setError("Error al cargar los datos del cliente.");
      } finally {
        setCargando(false);
      }
    };

    fetchClienteAutenticado();
  }, []);
  if (cargando) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (!clienteAutenticado) {
    return <div>No se encontró el cliente autenticado.</div>;
  }

  return (
    <div className="flex justify-center pt-10 min-h-screen bg-gray-100">
      {clienteAutenticado.tarjeta.map((tarjeta: datoTarjeta) => (
        <Cartas key={`tarjeta_${tarjeta.numeroTarjeta}`} tarjeta={tarjeta} />
      ))}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import Clientes from "@/app/data/cliente"; // Datos de los clientes
import { Cliente, datoTarjeta } from "@/types"; // Asegúrate de importar los tipos adecuados
import { Cartas } from "@components/credito"; // Importar el componente Cartas

export default function Tarjeta() {
  const [clienteAutenticado, setClienteAutenticado] = useState<Cliente | null>(
    null,
  );

  useEffect(() => {
    // Obtener el cliente ID de localStorage
    const storedClienteId = localStorage.getItem("clienteId");

    if (storedClienteId) {
      const cliente =
        Clientes.find((cliente) => cliente.id === storedClienteId) || null;
      setClienteAutenticado(cliente);
    }
  }, []);

  // Si no se encuentra el cliente autenticado, mostramos "Cargando..."
  if (!clienteAutenticado) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex justify-center pt-10 min-h-screen bg-gray-100">
      {clienteAutenticado.tarjeta.map((tarjeta: datoTarjeta) => (
        <Cartas key={`tarjeta_${tarjeta.numeroTarjeta}`} tarjeta={tarjeta} />
      ))}
    </div>
  );
}

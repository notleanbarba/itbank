"use client";
import { useState, useEffect } from "react";
import { obtenerClientes } from "@/app/data/cliente"; // Asegúrate de importar correctamente
import { Cliente, datoTarjeta } from "@/types"; // Asegúrate de importar los tipos adecuados
import { Cartas } from "@components/credito"; // Importar el componente Cartas

export default function Tarjeta() {
  const [clienteAutenticado, setClienteAutenticado] = useState<Cliente | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      const storedClienteId = localStorage.getItem("clienteId");

      if (storedClienteId) {
        const clientes = await obtenerClientes(); // Llama a la función asíncrona para obtener clientes
        const cliente = clientes.find((cliente) => cliente.id === storedClienteId) || null;
        setClienteAutenticado(cliente);
      }
    };

    fetchClientes();
  }, []);

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

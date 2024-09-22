"use client";
import { useState, useEffect } from "react";
import { obtenerClientes } from "@/app/data/cliente";
import { Cliente, datoTarjeta } from "@/types";
import { Cartas } from "@/components/credito";

export default function Tarjeta() {
  const [clienteAutenticado, setClienteAutenticado] = useState<Cliente | null>(
    null,
  );

  useEffect(() => {
    const fetchClientes = async () => {
      const storedClienteId = localStorage.getItem("clienteId");

      if (storedClienteId) {
        const storedClientes = localStorage.getItem("clientes");
        let clientes: Cliente[] = [];

        if (storedClientes) {
          clientes = JSON.parse(storedClientes);
        } else {
          clientes = await obtenerClientes();
          localStorage.setItem("clientes", JSON.stringify(clientes));
        }

        const cliente =
          clientes.find((cliente) => cliente.id === storedClienteId) || null;
        setClienteAutenticado(cliente);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    if (clienteAutenticado) {
      const storedClientes = localStorage.getItem("clientes");
      if (storedClientes) {
        const clientes: Cliente[] = JSON.parse(storedClientes);
        const updatedClientes = clientes.map((cliente) =>
          cliente.id === clienteAutenticado.id ? clienteAutenticado : cliente,
        );
        localStorage.setItem("clientes", JSON.stringify(updatedClientes));
      }
    }
  }, [clienteAutenticado]);

  if (!clienteAutenticado) {
    return <div>Cargando...</div>;
  }

  const solicitarAumento = (numeroTarjeta: string) => {
    const updatedTarjetas = clienteAutenticado.tarjeta.map((tarjeta) => {
      if (tarjeta.numeroTarjeta === numeroTarjeta) {
        return { ...tarjeta, limiteSolicitado: true };
      }
      return tarjeta;
    });

    setClienteAutenticado({ ...clienteAutenticado, tarjeta: updatedTarjetas });

    alert(
      `Solicitud de aumento de límite enviada para la tarjeta ${numeroTarjeta}`,
    );
  };

  const togglePause = (numeroTarjeta: string) => {
    const updatedTarjetas = clienteAutenticado.tarjeta.map((tarjeta) => {
      if (tarjeta.numeroTarjeta === numeroTarjeta) {
        return { ...tarjeta, pausada: !tarjeta.pausada };
      }
      return tarjeta;
    });

    setClienteAutenticado({ ...clienteAutenticado, tarjeta: updatedTarjetas });
  };

  return (
    <div className="flex flex-col items-center pt-10 h-auto bg-gray-100">
      <div className="block">
        {clienteAutenticado.tarjeta.map((tarjeta: datoTarjeta) => (
          <div
            key={`tarjeta_${tarjeta.numeroTarjeta}`}
            className={`mb-6 p-4 rounded shadow-md ${
              tarjeta.pausada ? "bg-gray-300 opacity-70" : "bg-white"
            }`}
          >
            <Cartas tarjeta={tarjeta} />
            {!tarjeta.pausada && !tarjeta.limiteSolicitado && (
              <button
                onClick={() => solicitarAumento(tarjeta.numeroTarjeta)}
                className="mt-2 mr-2 px-4 py-2 bg-indigo-300 text-white rounded hover:bg-indigo-400"
              >
                Solicitar Aumento de Límite
              </button>
            )}
            {tarjeta.limiteSolicitado && (
              <div className="mt-2 text-sm text-gray-700">
                Solicitud enviada. En breve nos contactaremos.
              </div>
            )}
            <button
              onClick={() => togglePause(tarjeta.numeroTarjeta)}
              className={`mt-2 px-4 py-2 rounded ${
                tarjeta.pausada
                  ? "bg-blue-500 text-white"
                  : "bg-red-500 text-white hover:bg-red-700"
              }`}
            >
              {tarjeta.pausada ? "Descongelar Tarjeta" : "Congelar Tarjeta"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

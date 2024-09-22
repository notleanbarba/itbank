"use client";
import { useEffect, useState } from "react";
import { Cartas } from "@components/credito";
import { Cuentas } from "@components/credito";
import { Cliente } from "@types";
import { obtenerClientes } from "@/app/data/cliente";

export default function Home() {
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [clienteNombre, setClienteNombre] = useState<string | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const storedClienteId = localStorage.getItem("clienteId");
    const storedClienteNombre = localStorage.getItem("clienteNombre");

    if (storedClienteId && storedClienteNombre) {
      setClienteId(storedClienteId);
      setClienteNombre(storedClienteNombre);
    }

    // Cargar los clientes desde obtenerClientes
    obtenerClientes().then(setClientes).catch(console.error);
  }, []);

  if (!clienteId || !clienteNombre) {
    return <div>Cargando...</div>;
  }

  const cliente = clientes.find((cliente) => cliente.id === clienteId);

  return (
    <section className="bg-white flex-grow h-auto py-8 px-6 md:py-16 md:px-40 ">
      <div className="mb-4 text-xl md:mb-8">
        Hola <span className="font-semibold">{clienteNombre}</span>
        <h2 className="mt-1">Estado de tus cuentas</h2>
      </div>
      <section className="main-section flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-auto">
          {cliente && cliente.cuentas.length > 0 && (
            <Cuentas tarjetas={cliente.cuentas[0]} />
          )}
        </div>

        <div className="w-full md:w-auto">
          {cliente && cliente.tarjeta.length > 0 && (
            <Cartas tarjeta={cliente.tarjeta[0]} />
          )}
        </div>
      </section>
      <section>
        <h2 className="mt-6 mb-4 text-xl">Acceso rápido</h2>
        <div className="flex flex-row flex-wrap gap-4">
          <button
            className="w-24 aspect-square bg-[#d9d9d9] shadow-float rounded-lg"
            type="button"
            aria-label="enviar"
          />
          <button
            className="w-24 aspect-square bg-[#d9d9d9] shadow-float rounded-lg"
            type="button"
            aria-label="enviar"
          />
          <button
            className="w-24 aspect-square bg-[#d9d9d9] shadow-float rounded-lg"
            type="button"
            aria-label="enviar"
          />
          <button
            className="w-24 aspect-square bg-[#d9d9d9] shadow-float rounded-lg"
            type="button"
            aria-label="enviar"
          />
        </div>
      </section>
    </section>
  );
}

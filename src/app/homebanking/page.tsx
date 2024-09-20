"use client";
import Cards from "@components/Cards";
import { useCliente } from "@/app/context/ClienteContext";

export default function Home() {
  const { cliente } = useCliente();

  if (!cliente) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="bg-white flex-grow h-auto py-8 px-6 md:py-16 md:px-40 ">
      <div className="mb-4 text-xl md:mb-8">
        Hola <span className="font-semibold">{cliente.nombre}</span>
        <h2 className="mt-1">Estado de tus cuentas</h2>
      </div>
      <section className="main-section">
        <Cards
          cardsDefinition={[
            {
              id: 1,
              type: "account",
              card: {
                accountType: "Cuenta única",
                accountNumber: "123-45678/1",
                balances: [
                  {
                    name: "ARS Balance",
                    unit: "$",
                    balance: 1000000,
                  },
                  {
                    name: "USD Balance",
                    unit: "U$D",
                    balance: 10000,
                  },
                ],
                button: {
                  text: "Ver movimientos",
                  url: "./cuentas",
                },
              },
            },
            {
              id: 2,
              type: "creditCard",
              card: {
                cardType: "Tarjeta de débito",
                cardNumber: 5412751234167890,
                cvv: 123,
              },
            },
          ]}
        />
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

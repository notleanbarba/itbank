"use client";
import { datoTarjeta } from "@/types";
import { Cuenta } from "@types";
import Link from "next/link";

export function CartasHome({ tarjeta }: { tarjeta: datoTarjeta }) {
  const bgColor =
    tarjeta.tipo === "Tarjeta de crédito"
      ? "bg-[rgb(32,32,32)]"
      : "bg-[#7678ED]";

  return (
    <Link href={`./homebanking/transferencias`}>
      <div className="m-2 ">
        <div
          className={`flex flex-col ${bgColor} h-min p-4 rounded-xl shadow-float text-white text-nowrap w-80 gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
        >
          <span className="pb-4">{tarjeta.tipo}</span>
          <span className="pb-10">{tarjeta.numeroTarjeta}</span>
        </div>
      </div>
    </Link>
  );
}
export function Cuentas({ tarjetas }: { tarjetas: Cuenta }) {
  if (tarjetas.tipo === "Ahorros") {
    return (
      <div className="flex flex-col bg-white w-80 h-min p-4 rounded-xl shadow-float gap-3">
        <div>
          <span>{tarjetas.tipo}</span>
          <span className="block mt-1 text-sm text-gray-500">
            {tarjetas.numeroCuenta}
          </span>
        </div>
        {tarjetas.saldo.map((balance) => {
          return (
            <div key={balance.nombre} className="text-xl font-medium">
              <span className="mr-1">{balance.unidad}</span>
              {balance.balance}
            </div>
          );
        })}
        <Link
          className={"w-min text-left cursor-pointer text-nowrap"}
          href={tarjetas.button.url}
        >
          {tarjetas.button.text}
        </Link>
      </div>
    );
  }
}

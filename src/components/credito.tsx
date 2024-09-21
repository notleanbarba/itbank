"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { datoTarjeta } from "@/types";
import { Cuenta } from "@types";
import Link from "next/link";

export function Cartas({ tarjeta }: { tarjeta: datoTarjeta }) {
  const [showCvv, setShowCvv] = useState(false);

  return (
    <div className="flex flex-col bg-[rgb(32,32,32)] h-min p-4 rounded-xl shadow-float text-white text-nowrap w-80 gap-3">
      <span className="pb-4">{tarjeta.tipo}</span>
      <span className="pb-4">{tarjeta.numeroTarjeta}</span>
      <div>
        <span>{showCvv ? tarjeta.cvv : "***"}</span>
        <button
          type="button"
          aria-label={showCvv ? "Hide Cvv" : "Show Cvv"}
          onClick={() => {
            setShowCvv(!showCvv);
          }}
        >
          <FontAwesomeIcon
            icon={showCvv ? faEyeSlash : faEye}
            size="xs"
            style={{ color: "#fff", paddingLeft: "8px" }}
          />
        </button>
      </div>
    </div>
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
"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { datoTarjeta } from "@/types";

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

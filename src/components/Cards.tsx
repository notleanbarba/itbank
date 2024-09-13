"use client";
import { useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import type { CardDefinitions } from "@types";

function Card({ card }: { card: CardDefinitions }) {
  const [showCvv, setShowCvv] = useState(false);

  if (card.type === "creditCard") {
    return (
      <div className="flex flex-col bg-[rgb(32,32,32)] h-min p-4 rounded-xl shadow-float text-white text-nowrap w-80 gap-3">
        <span className="pb-4">{card.card.cardType}</span>
        <span className="pb-4">5412 7512 3416 7890</span>
        <div>
          <span>{showCvv ? card.card.cvv : "***"}</span>
          <button
            type="button"
            aria-label={card.card.cvv ? "Hide Cvv" : "Show Cvv"}
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
  if (card.type === "account") {
    return (
      <div className="flex flex-col bg-white w-80 h-min p-4 rounded-xl shadow-float gap-3">
        <div>
          <span>{card.card.accountType}</span>
          <span className="block mt-1 text-sm text-gray-500">
            {card.card.accountNumber}
          </span>
        </div>
        {card.card.balances.map((balance) => {
          return (
            <div key={balance.name} className="text-xl font-medium">
              <span className="mr-1">{balance.unit}</span>
              {balance.balance}
            </div>
          );
        })}
        <Link
          className={"w-min text-left cursor-pointer text-nowrap"}
          href={card.card.button.url}
        >
          {card.card.button.text}
        </Link>
      </div>
    );
  }
}

export default function Cards({
  cardsDefinition,
}: {
  cardsDefinition: CardDefinitions[];
}) {
  return (
    <div className="flex flex-col gap-6 items-center sm:flex-row">
      {cardsDefinition.map((card) => {
        return <Card key={`card_${card.id}`} card={card} />;
      })}
    </div>
  );
}

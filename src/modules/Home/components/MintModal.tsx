"use client";
import { useState } from "react";
import { Roboto_Slab, Readex_Pro } from "next/font/google";
import { ERC20DescriptorType } from "../types";
import { AcceptableTokensType } from "@/modules/shared/onchain";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });
const readexPro = Readex_Pro({ weight: "200", subsets: ["latin"] });

function TokenDropdown({
  token,
  changeToken,
  metadata,
}: {
  token: string;
  changeToken: (t: AcceptableTokensType) => void;
  metadata: Record<string, Record<string, Record<string, ERC20DescriptorType>>>;
}) {
  {
    /*TOKEN DROPDOWN*/
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button
      className="relative hover:bg-gray hover:cursor-pointer bg-middle-black flex items-center py-2 px-4 rounded-2xl mr-4"
      onClick={toggle}
    >
      <img
        className="w-6 mr-2"
        src={metadata.ethereum.erc20[token].icon}
        alt={metadata.ethereum.erc20[token].name}
      />
      <img src="/assets/chevron.svg" alt="Chevron Icon" />
      {isOpen && (
        <ul className="absolute top-12 left-0 rounded-lg bg-gray w-full grid grid-cols-1 gap-1 overflow-hidden">
          {Object.values(metadata.ethereum.erc20).map((t, idx) => (
            <li
              className={
                robotoSlab.className +
                " flex items-center hover:bg-luxury-black p-2"
              }
              key={idx}
              onClick={() =>
                changeToken(t.symbol.toLowerCase() as AcceptableTokensType)
              }
            >
              <img className="w-4 h-4 mr-1" src={t.icon} alt={t.name} />
              {t.symbol}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}

export default function MintModal({
  token,
  metadata,
  counter,
  changeToken,
  increment,
  decrement,
}: {
  token: string;
  metadata: Record<string, Record<string, Record<string, ERC20DescriptorType>>>;
  counter: number;
  changeToken: (t: AcceptableTokensType) => void;
  increment: () => void;
  decrement: () => void;
}) {
  return (
    <div className="w-full max-w-[600px] bg-luxury-black border-gold border-[1px] rounded-3xl p-4">
      <div className="w-full border-gold border-[1px] rounded-3xl p-4 md:p-16">
        <img src="/assets/nft.png" alt="VIP Card" />

        <div className="border-b-[1px] border-b-gray py-8">
          <p
            className={robotoSlab.className + " text-center mb-4"}
          >{`TOTAL MINTED: ${25}/${150}`}</p>
          <div className="flex justify-between items-center">
            <button
              className="w-12 h-12 md:w-[100px] md:h-[100px] md:text-5xl text-white border-gray border-[1px] rounded-md hover:border-gold hover:text-gold"
              onClick={decrement}
            >
              -
            </button>
            <span className={robotoSlab.className + " text-lg md:text-5xl"}>
              {counter}
            </span>
            <button
              className="w-12 h-12 md:w-[100px] md:h-[100px] md:text-5xl text-white border-gray border-[1px] rounded-md hover:border-gold hover:text-gold"
              onClick={increment}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center p-8 my-4">
          <p className={robotoSlab.className + " "}>TOTAL</p>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <TokenDropdown
              token={token}
              changeToken={changeToken}
              metadata={metadata}
            />
            <p
              className={robotoSlab.className + " "}
            >{`${"10000"} ${token.toUpperCase()} + GAS`}</p>
          </div>
        </div>

        <button
          className={`w-full bg-gradient-to-r text-black from-dark-gold to-light-gold px-16 py-4 rounded-sm ${robotoSlab.className}`}
        >
          CONNECT WALLET
        </button>

        <p className={readexPro.className + " text-gray text-center mt-4"}>
          0x1234...5678
        </p>
      </div>
    </div>
  );
}

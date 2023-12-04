"use client";
import { useEffect, useState } from "react";
import { Roboto_Slab, Readex_Pro } from "next/font/google";
import { Connector } from "wagmi";
import { WalletClient } from "viem";
import { ERC20DescriptorType } from "../types";
import { AcceptableTokensType } from "@/modules/shared/onchain";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });
const readexPro = Readex_Pro({ weight: "200", subsets: ["latin"] });

export default function MintModal({
  allowance,
  address,
  handleConnect,
  connectors,
  disconnect,
  isConnected,
  token,
  tokens,
  totalPledged,
  counter,
  approve,
  changeToken,
  increment,
  decrement,
  notify,
  pledge,
  supply,
  price,
  isError,
  diagnostic,
  wallet,
}: {
  allowance: number;
  address?: string;
  handleConnect: () => void;
  connectors: Connector[];
  disconnect: () => void;
  isConnected: boolean;
  token: string;
  tokens: Record<string, ERC20DescriptorType>;
  counter: number;
  isError: boolean;
  diagnostic: string;
  approve: (amount: number) => Promise<void>;
  changeToken: (t: AcceptableTokensType) => void;
  increment: () => void;
  decrement: () => void;
  notify: (message: string) => void;
  pledge: (amount: number) => Promise<void>;
  supply: number;
  totalPledged: number;
  price: number;
  wallet: WalletClient | undefined;
}) {
  const [pledging, setPledging] = useState(false);
  const [approving, setApproving] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleApprove = async (amount: number) => {
    if (!wallet) return;

    setApproving(true);
    notify(`Approving ${amount} ${token.toUpperCase()}`);
    await approve(amount);
    console.log("approve failed");

    setApproving(false);
  };

  const handlePledge = async (amount: number) => {
    setPledging(true);
    notify(`Pledging ${amount} ${token.toUpperCase()}`);
    await pledge(amount);

    setPledging(false);
  };

  useEffect(() => {
    if (mounted) return;
    setMounted(true);
  }, [isConnected]);

  useEffect(() => {
    if (isError) {
      notify(diagnostic);
    }
  }, [isError]);

  return (
    <div className="w-full max-w-[600px] bg-luxury-black border-gold border-[1px] rounded-3xl p-4">
      <div className="w-full border-gold border-[1px] rounded-3xl p-4 md:p-16">
        {mounted && (
          <>
            <img src="/assets/nft.png" alt="VIP Card" />

            <div className="border-b-[1px] border-b-gray py-8">
              <p
                className={robotoSlab.className + " text-center mb-4"}
              >{`TOTAL MINTED: ${totalPledged}/${supply}`}</p>
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
                  tokens={tokens}
                />
                <p className={robotoSlab.className + " "}>{`${
                  counter * price
                } ${tokens[token].symbol.toUpperCase()} + GAS`}</p>
              </div>
            </div>

            {!isConnected ? (
              <button
                className={`w-full bg-gradient-to-r text-black from-dark-gold to-light-gold px-16 py-4 rounded-sm ${robotoSlab.className}`}
                onClick={handleConnect}
              >
                CONNECT WALLET
              </button>
            ) : (
              <>
                {allowance >= counter * price ? (
                  <button
                    className={
                      robotoSlab.className +
                      ` w-full bg-gradient-to-r text-black from-dark-gold to-light-gold px-16 py-4 rounded-sm flex items-center justify-center`
                    }
                    onClick={() => handlePledge(counter * price)}
                  >
                    {pledging ? (
                      <img src="/assets/load.svg" alt="Loading Icon" />
                    ) : (
                      <p>PLEDGE</p>
                    )}
                  </button>
                ) : (
                  <button
                    className={
                      robotoSlab.className +
                      ` w-full bg-gradient-to-r text-black from-dark-gold to-light-gold px-16 py-4 rounded-sm flex items-center justify-center`
                    }
                    onClick={() => handleApprove(counter * price)}
                  >
                    {approving ? (
                      <img src="/assets/load.svg" alt="Loading Icon" />
                    ) : (
                      <p>APPROVE</p>
                    )}
                  </button>
                )}
                <p
                  className={
                    readexPro.className + " text-gray text-center mt-4"
                  }
                >
                  {address && `${address.slice(0, 6)}....${address.slice(-4)}`}
                </p>
              </>
            )}
          </>
        )}
      </div>
      <h1>{`ALLOWANCE: ${allowance} >= ${counter * price}`}</h1>
    </div>
  );
}

function TokenDropdown({
  token,
  changeToken,
  tokens,
}: {
  token: string;
  changeToken: (t: AcceptableTokensType) => void;
  tokens: Record<string, ERC20DescriptorType>;
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
        src={tokens[token].icon}
        alt={tokens[token].name}
      />
      <img src="/assets/chevron.svg" alt="Chevron Icon" />
      {isOpen && (
        <ul className="absolute top-12 left-0 rounded-lg bg-gray w-full grid grid-cols-1 gap-1 overflow-hidden">
          {Object.values(tokens).map((t, idx) => (
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

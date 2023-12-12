"use client";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { Roboto_Slab, Readex_Pro } from "next/font/google";
import { Connector } from "wagmi";
import { motion } from "framer-motion";
import { ERC20DescriptorType } from "../types";
import { AcceptableTokensType } from "@/modules/shared/onchain";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });
const readexPro = Readex_Pro({ weight: "200", subsets: ["latin"] });

export default function MintModal({
  allowance,
  balance,
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
  isDone,
  message,
}: {
  allowance: number;
  address?: string;
  balance: number;
  handleConnect: () => void;
  connectors: Connector[];
  disconnect: () => void;
  isConnected: boolean;
  token: string;
  tokens: Record<string, ERC20DescriptorType>;
  counter: number;
  isError: boolean;
  diagnostic: string;
  isDone: boolean;
  message: string;
  approve: (amount: number) => Promise<void>;
  changeToken: (t: AcceptableTokensType) => void;
  increment: () => void;
  decrement: () => void;
  notify: (message: string) => void;
  pledge: (amount: number) => Promise<void>;
  supply: number;
  totalPledged: number;
  price: number;
}) {
  const [pledging, setPledging] = useState(false);
  const [approving, setApproving] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleApprove = async (amount: number) => {
    setApproving(true);
    notify(
      `Approving ${amount.toLocaleString("en-US")} ${token.toUpperCase()}`,
    );
    await approve(amount);

    setApproving(false);
  };

  const handlePledge = async (amount: number) => {
    setPledging(true);
    notify(`Pledging ${amount.toLocaleString("en-US")} ${token.toUpperCase()}`);
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

  useEffect(() => {
    if (isDone) {
      notify(message);
    }
  }, [isDone]);

  return (
    <div className="w-full max-w-[600px] bg-luxury-black border-gold border-[1px] rounded-3xl p-4">
      <div className="w-full border-gold border-[1px] rounded-3xl p-4 md:p-16">
        {mounted && (
          <>
            <img src="/assets/nft.png" alt="VIP Card" />

            <div className="border-b-[1px] border-b-gray py-8 mb-4">
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

            <div>
              <p
                className={readexPro.className + " w-full text-right text-gray"}
              >{`wallet balance: ${balance.toLocaleString(
                "en-US",
              )} ${token.toUpperCase()}`}</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pb-8 pt-2 my-4">
              <p className={robotoSlab.className + " "}>TOTAL</p>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <TokenDropdown
                  token={token}
                  changeToken={changeToken}
                  tokens={tokens}
                />
                <p className={robotoSlab.className + " "}>{`${(
                  counter * price
                ).toLocaleString("en-US")} ${tokens[
                  token
                ].symbol.toUpperCase()} + GAS`}</p>
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
                    disabled={pledging}
                    className={
                      robotoSlab.className +
                      ` w-full bg-gradient-to-r text-black from-dark-gold to-light-gold px-16 py-4 rounded-sm flex items-center justify-center`
                    }
                    onClick={() => handlePledge(counter * price)}
                  >
                    {pledging ? (
                      <motion.img
                        animate={{ rotate: 360 }}
                        transition={{
                          ease: "linear",
                          repeat: Infinity,
                          duration: 0.5,
                          type: "tween",
                        }}
                        src="/assets/load.svg"
                        alt="Loading Icon"
                      />
                    ) : (
                      <p>PLEDGE</p>
                    )}
                  </button>
                ) : (
                  <button
                    disabled={approving}
                    className={
                      robotoSlab.className +
                      ` w-full bg-gradient-to-r text-black from-dark-gold to-light-gold px-16 py-4 rounded-sm flex items-center justify-center`
                    }
                    onClick={() => handleApprove(counter * price)}
                  >
                    {approving ? (
                      <motion.img
                        animate={{ rotate: 360 }}
                        transition={{
                          ease: "linear",
                          repeat: Infinity,
                          duration: 0.5,
                          type: "tween",
                        }}
                        src="/assets/load.svg"
                        alt="Loading Icon"
                      />
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

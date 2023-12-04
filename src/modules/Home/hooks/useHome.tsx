"use client";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useWalletClient } from "wagmi";
import { Address } from "viem";

import useCounter from "./useCounter";
import { useToaster } from "@/modules/shared/toaster";
import { usePledge } from "@/modules/shared/onchain";

export default function useHome() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: wallet } = useWalletClient();

  const { counter, increment, decrement } = useCounter({ min: 1 });

  const { notify } = useToaster();

  const {
    allowance,
    price,
    supply,
    totalPledged,
    token,
    approve,
    balance,
    changeToken,
    pledge,
    pledged,
    getAllowance,
    getBalance,
    getPrice,
    getPledged,
    getTotalSupply,
    getTotalPledgedCount,
    isError,
    diagnostic,
  } = usePledge(address as Address);

  const handleConnect = () => {
    if (!connectors[0].ready || isConnected) return;
    connect({ connector: connectors[0] });
  };

  useEffect(() => {
    // on mount
    handleConnect();
    (async () => {
      try {
        const promises = await Promise.all([
          getAllowance(),
          getPrice(),
          getTotalSupply(),
          getTotalPledgedCount(),
        ]);
      } catch (err) {
        console.error("In useHome mount:", err);
      }
    })();
  }, [address, token]);

  return {
    address,
    counter,
    isConnected,
    allowance,
    price,
    pledged,
    supply,
    totalPledged,
    token,
    isError,
    diagnostic,
    wallet,
    connectors,
    approve,
    changeToken,
    handleConnect,
    decrement,
    disconnect,
    increment,
    notify,
    pledge,
    getPledged,
  };
}

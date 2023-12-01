"use client";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useWalletClient } from "wagmi";
import { Address } from "viem";
import { InjectedConnector } from "wagmi/connectors/injected";

import useCounter from "./useCounter";
import { useToaster } from "@/modules/shared/toaster";
import { usePledge } from "@/modules/shared/onchain";

export default function useHome() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
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
    changeToken,
    pledge,
    pledged,
    getPrice,
    getPledged,
    getTotalSupply,
    getTotalPledgedCount,
    isError,
    diagnostic,
  } = usePledge(address as Address);

  useEffect(() => {
    // on mount
    connect();
    (async () => {
      try {
        const promises = await Promise.all([
          getPrice(),
          getTotalSupply(),
          getTotalPledgedCount(),
        ]);
        console.log("In useHome mount promises:", promises);
      } catch (err) {
        console.error("In useHome mount:", err);
      }
    })();
  }, []);

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
    approve,
    changeToken,
    connect,
    decrement,
    disconnect,
    increment,
    notify,
    pledge,
    getPledged,
  };
}

"use client";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useWalletClient } from "wagmi";
import { Address } from "viem";
import { InjectedConnector } from "wagmi/connectors/injected";

import useCounter from "./useCounter";
import { usePledge } from "@/modules/shared/onchain";

export default function useHome() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const { data: wallet } = useWalletClient();

  const { counter, increment, decrement } = useCounter({ min: 1 });

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
    getPledged,
  } = usePledge(address as Address);

  useEffect(() => {
    connect();
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
    approve,
    changeToken,
    connect,
    decrement,
    disconnect,
    increment,
    pledge,
    getPledged,
  };
}

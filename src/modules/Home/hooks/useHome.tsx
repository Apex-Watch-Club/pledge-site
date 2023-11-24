"use client";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useWalletClient } from "wagmi";
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
  const { price, supply, totalPledged, token, changeToken, pledge } =
    usePledge();

  useEffect(() => {
    connect();
  }, []);

  return {
    address,
    counter,
    isConnected,
    price,
    supply,
    totalPledged,
    token,
    changeToken,
    connect,
    decrement,
    disconnect,
    increment,
    pledge,
  };
}

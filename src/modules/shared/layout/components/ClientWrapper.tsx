"use client";
import { ReactNode } from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { localhost, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ToasterProvider } from "@/modules/shared/toaster";

const LOCALHOST_RPC_URL = "http://localhost:8545";
const ALCHEMY_API_KEY = "iqutKCtSJcHpdW9WQVc2Zn08iK8yP9wz";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost, mainnet],
  [
    jsonRpcProvider({ rpc: (chain) => ({ http: LOCALHOST_RPC_URL }) }),
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
  ],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ToasterProvider>{children}</ToasterProvider>
    </WagmiConfig>
  );
}

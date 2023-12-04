"use client";
import { ReactNode } from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { localhost, goerli, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ToasterProvider } from "@/modules/shared/toaster";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const LOCALHOST_RPC_URL = "http://localhost:8545";
const ALCHEMY_API_KEY = "iqutKCtSJcHpdW9WQVc2Zn08iK8yP9wz";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, mainnet],
  [
    // jsonRpcProvider({ rpc: (chain) => ({ http: LOCALHOST_RPC_URL }) }),
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
    // infuraProvider({ apiKey: INFURA_API_KEY }),
  ],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({ chains }),
  ],
});

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ToasterProvider>{children}</ToasterProvider>
    </WagmiConfig>
  );
}

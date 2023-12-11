"use client";
import { ReactNode } from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ToasterProvider } from "@/modules/shared/toaster";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const ALCHEMY_API_KEY = "htOoeuPRkBpfFb9nNyUdhNioA0hHb-yb";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY })],
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

import { defineChain } from "viem";
const anvil = defineChain({
  id: 31337,
  name: "Anvil Ethereum",
  network: "anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://localhost:8545"],
      webSocket: ["wss://rpc.zora.energy"],
    },
    public: {
      http: ["http://localhost:8545"],
      webSocket: ["wss://rpc.zora.energy"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.zora.energy" },
  },
  contracts: {},
});
export { anvil };

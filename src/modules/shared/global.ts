// const NEXT_PUBLIC_ENV = "goerli";
// const NEXT_PUBLIC_RPC_URL =
//   "https://eth-goerli.g.alchemy.com/v2/7CT8yY7l0dwFWv5tqYOedv84f2KlBa2p";

// const NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS =
//   "0x25195eAd6085B49dC978C28F0d9a793872932060";
// const NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS =
//   "0xEafd49d75921EfcaD1b0Ddaf361C5a3d4B032f60";
// const NEXT_PUBLIC_USDT_CONTRACT_ADDRESS =
//   "0x767fb9B61166c8b98578f3E875B237B3aF7FF59d";
// const NEXT_PUBLIC_USDC_CONTRACT_ADDRESS =
//   "0x32CFFaDC2AcEaf527C95d3F4243D97E6ec1d9Cd9";
//
// const ERC20_ABI = require("/ERC20.json").abi;
// const PLEDGE_ABI = require("/Pledge.json").abi;

const NEXT_PUBLIC_ENV = "mainnet";
const NEXT_PUBLIC_RPC_URL =
  "https://eth-mainnet.g.alchemy.com/v2/htOoeuPRkBpfFb9nNyUdhNioA0hHb-yb";

const NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS =
  "0x9B4cc8C7ddd78A8695501c290f1b58a06e2b6Be6";
const NEXT_PUBLIC_USDT_CONTRACT_ADDRESS =
  "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const NEXT_PUBLIC_USDC_CONTRACT_ADDRESS =
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const ERC20_ABI = require("/ERC20.json").abi;
const PLEDGE_ABI = require("/Pledge.json").abi;

export {
  NEXT_PUBLIC_ENV,
  NEXT_PUBLIC_RPC_URL,
  NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS,
  NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
  NEXT_PUBLIC_USDT_CONTRACT_ADDRESS,
  ERC20_ABI,
  PLEDGE_ABI,
};

type AcceptableTokensType = "usdt" | "usdc";
type AcceptableChainsType = "localhost" | "goerli" | "mainnet";

export type { AcceptableTokensType, AcceptableChainsType };

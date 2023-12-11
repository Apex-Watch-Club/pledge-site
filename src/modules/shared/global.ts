// const {
//   NEXT_PUBLIC_ENV, NEXT_PUBLIC_RPC_URL,
//   NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS,
//   NEXT_PUBLIC_USDT_CONTRACT_ADDRESS,
//   NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
// } = process.env;

const NEXT_PUBLIC_ENV = "goerli";
const NEXT_PUBLIC_RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/7CT8yY7l0dwFWv5tqYOedv84f2KlBa2p";
const NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS =
  "0x3e2113210A0d11C98693531d87709cc3acCE5e05";
const NEXT_PUBLIC_USDT_CONTRACT_ADDRESS =
  "0xb20303302b50632d77c33b056F4A30B6A658995D";
const NEXT_PUBLIC_USDC_CONTRACT_ADDRESS =
  "0xe53e949eF30e5E725FCd7705701C810F87dEe8DF";

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

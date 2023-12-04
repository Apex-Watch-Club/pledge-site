"use client";
import { useState } from "react";
import {
  sendTransaction,
  getContract,
  prepareWriteContract,
  readContract,
  writeContract,
  getWalletClient,
} from "@wagmi/core";
import {
  Address,
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  formatEther,
} from "viem";
import { mainnet, localhost, goerli } from "viem/chains";
import { anvil } from "../constants";
import { AcceptableTokensType, AcceptableChainsType } from "../types";

const metadata = require("/metadata.json");

// const {
//   NEXT_PUBLIC_ENV, NEXT_PUBLIC_RPC_URL,
//   NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS,
//   NEXT_PUBLIC_USDT_CONTRACT_ADDRESS,
//   NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
// } = process.env;

const NEXT_PUBLIC_ENV = "goerli";
const NEXT_PUBLIC_RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/iqutKCtSJcHpdW9WQVc2Zn08iK8yP9wz";
const NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS =
  "0x3f146fA729088026CA7133264F86ca4dCdF92B3A";
const NEXT_PUBLIC_USDT_CONTRACT_ADDRESS =
  "0xb20303302b50632d77c33b056F4A30B6A658995D";
const NEXT_PUBLIC_USDC_CONTRACT_ADDRESS =
  "0xe53e949eF30e5E725FCd7705701C810F87dEe8DF";

const ENV: AcceptableChainsType =
  (NEXT_PUBLIC_ENV as AcceptableChainsType) || "localhost";

const ERC20_ABI = require("/ERC20.json").abi;
const PLEDGE_ABI = require("/Pledge.json").abi;
const RPC_URL = NEXT_PUBLIC_RPC_URL || "";

// const TOKENS = metadata.ethereum.tokens.erc20;
const TOKENS = {
  usdt: {
    address: NEXT_PUBLIC_USDT_CONTRACT_ADDRESS,
    name: "USD Token",
    symbol: "USDT",
    icon: "/assets/usdt-icon.png",
  },
  usdc: {
    address: NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
    name: "USD Coin",
    symbol: "USDC",
    icon: "/assets/usdc-icon.png",
  },
};

const CHAINS = {
  localhost: anvil,
  goerli,
  mainnet,
};

const CONTRACT_ADDRESS = NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS || "";

const PLEDGE_CONTRACT = {
  address: CONTRACT_ADDRESS as Address,
  abi: PLEDGE_ABI,
};

export default function usePledge(user: Address) {
  const [isError, setIsError] = useState(false);
  const [diagnostic, setDiagnostic] = useState("");
  const [token, setToken] = useState<AcceptableTokensType>("usdc");
  const [price, setPrice] = useState(0);
  const [supply, setSupply] = useState(0);
  const [totalPledged, setTotalPledged] = useState(0);
  const [pledged, setPledged] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const getTotalSupply = async () => {
    setIsError(false);
    const client = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: "getTotalSupply",
        args: [],
      });

      setSupply(Number(data));
    } catch (err) {
      setIsError(true);
      setDiagnostic(JSON.stringify(err));
    }
  };

  const getTotalPledgedCount = async () => {
    setIsError(false);
    const client = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: "getTotalPledgedCount",
        args: [],
      });

      setTotalPledged(Number(data));
    } catch (err) {
      setIsError(true);
      setDiagnostic(JSON.stringify(err));
    }
  };

  const getPrice = async () => {
    setIsError(false);
    const client = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: "getPrice",
        args: [],
      });

      setPrice(Number(formatEther(data as unknown as bigint)));
    } catch (err) {
      setIsError(true);
      setDiagnostic(JSON.stringify(err));
    }
  };

  const changeToken = (t: AcceptableTokensType) => {
    setToken(t);
  };

  const approve = async (amount: number) => {
    setIsError(false);
    try {
      const { request } = await prepareWriteContract({
        address: TOKENS[token].address as Address,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [PLEDGE_CONTRACT.address, parseEther(`${amount}`)],
      });
      const { hash } = await writeContract(request);
    } catch (err) {
      setIsError(true);
      setDiagnostic(`Approval of ${amount} ${token.toUpperCase()} failed`);
    }
  };

  const pledge = async (amount: number) => {
    setIsError(false);
    try {
      const { request } = await prepareWriteContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: token === "usdt" ? "pledgeUsdt" : "pledgeUsdc",
        args: [parseEther(`${amount}`)],
      });

      const { hash } = await writeContract(request);
    } catch (err) {
      setIsError(true);
      setDiagnostic(`Pledging of ${amount} ${token.toUpperCase()} failed`);
    }
  };

  const getAllowance = async () => {
    setIsError(false);
    const walletClient = await getWalletClient();

    try {
      const data = await readContract({
        address: TOKENS[token].address as Address,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [user, PLEDGE_CONTRACT.address],
      });
      console.log("get allowance data", data);
      setAllowance(Number(formatEther(data as unknown as bigint)));
    } catch (err) {
      setIsError(true);
      setDiagnostic(
        `Failed to get allowance of ${user} for contract: ${PLEDGE_CONTRACT.address}`,
      );
    }
  };

  const getBalance = async (address: string): Promise<number | undefined> => {
    setIsError(false);
    const client = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: TOKENS[token].address as Address,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [address],
      });
      return Number(data);
    } catch (err) {
      setIsError(true);
      setDiagnostic("Failed to pledge");
    }
  };

  const getPledged = async (address: string) => {
    setIsError(false);
    const client = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: "getPledged",
        args: [address],
      });

      setPledged(Number(data));
    } catch (err) {
      setIsError(true);
      setDiagnostic("Failed to pledge");
    }
  };

  return {
    price,
    supply,
    totalPledged,
    token,
    pledged,
    allowance,
    isError,
    diagnostic,
    approve,
    changeToken,
    pledge,
    getAllowance,
    getPrice,
    getPledged,
    getTotalSupply,
    getTotalPledgedCount,
  };
}

"use client";
import { useState } from "react";
import { useContractRead } from "wagmi";
import {
  Address,
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
  parseAbiItem,
  parseEther,
  formatEther,
  decodeEventLog,
} from "viem";
import { mainnet, localhost, goerli } from "viem/chains";
import { anvil } from "../constants";
import { AcceptableTokensType, AcceptableChainsType } from "../types";

const metadata = require("/metadata.json");

// const {
//   NEXT_PUBLIC_ENV,
//   NEXT_PUBLIC_RPC_URL,
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

console.log("process.env", process.env);

const ENV: AcceptableChainsType =
  (NEXT_PUBLIC_ENV as AcceptableChainsType) || "localhost";

console.log("NEXT_PUBLIC_ENV", NEXT_PUBLIC_ENV);

const ERC20_ABI = require("/ERC20.json").abi;
const PLEDGE_ABI = require("/Pledge.json").abi;
const RPC_URL = NEXT_PUBLIC_RPC_URL || "";

// const TOKENS = metadata.ethereum.tokens.erc20;
const TOKENS = {
  usdt: {
    address: NEXT_PUBLIC_USDT_CONTRACT_ADDRESS,
    name: "USD Token",
    symbol: "USDT",
    icon: "https://app.delta.storage/_next/image?url=https%3A%2F%2Fdelta.vulcaniclabs.com%2Fgw%2Fbafybeidmwc7o4rle5et6n35arz462jrv5luebky6qilyiwchiheywvc7vu&w=3840&q=75",
  },
  usdc: {
    address: NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
    name: "USD Coin",
    symbol: "USDC",
    icon: "https://app.delta.storage/_next/image?url=https%3A%2F%2Fdelta.vulcaniclabs.com%2Fgw%2Fbafybeiddabigc6c5ga27grotfy2bfr247eah2qs3nsjzup7z3l4r2kvggm&w=3840&q=75",
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
  const [pledged, setPledged] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const {
    data: supplyData,
    isError: isSupplyError,
    isLoading: isSupplyLoading,
    refetch: getTotalSupply,
  } = useContractRead({
    ...PLEDGE_CONTRACT,
    functionName: "getTotalSupply",
  });

  const getPrice = async () => {
    console.log("ENV", ENV);
    const client = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    console.log("CLIENT IN GET PRICE", client);

    try {
      const data = await client.readContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_ABI,
        functionName: "getPrice",
        args: [],
      });

      setIsError(false);
      setPrice(Number(formatEther(data as unknown as bigint)));
    } catch (err) {
      setIsError(true);
      setDiagnostic(JSON.stringify(err));
      console.error(err);
    }
  };

  const {
    data: totalPledgedData,
    isError: isTotalPledgedError,
    isLoading: isTotalPledgedLoading,
    refetch: getTotalPledgedCount,
  } = useContractRead({
    ...PLEDGE_CONTRACT,
    functionName: "getTotalPledgedCount",
  });

  const changeToken = (t: AcceptableTokensType) => {
    setToken(t);
  };

  const approve = async (amount: number) => {
    const walletClient = createWalletClient({
      account: user,
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    const publicClient = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    try {
      const { request } = await publicClient.simulateContract({
        chain: CHAINS[ENV],
        account: user,
        address: TOKENS[token].address as Address,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [CONTRACT_ADDRESS, parseEther(`${amount}`)],
      });

      await walletClient.writeContract(request);
    } catch (err) {
      console.error(err);
    }
  };

  const pledge = async (amount: number) => {
    setIsError(false);
    console.log("##### PLEDGING #####");
    console.log("balance:", await getBalance(user));
    console.log("amount:", amount);
    const approved = Number(await getAllowance());
    console.log("allowance in pledge:", approved);
    await approve(amount);

    const walletClient = createWalletClient({
      account: user,
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    const publicClient = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    console.log("parsed amount", parseEther(`${amount}`));
    console.log("contract address", CONTRACT_ADDRESS);

    // const request = {
    // chain: CHAINS[ENV],
    //   address: CONTRACT_ADDRESS as Address,
    //   abi: PLEDGE_ABI,
    //   functionName: token === "usdt" ? "pledgeUsdt" : "pledgeUsdc",
    //   args: [parseEther(`${amount}`)],
    // };

    try {
      const { request } = await publicClient.simulateContract({
        chain: CHAINS[ENV],
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: "pledgeUsdt",
        args: [parseEther(`${amount}`)],
      });

      await walletClient.writeContract(request);
    } catch (err) {
      setIsError(true);
      setDiagnostic("Failed to pledge");
      console.error(err);
    }
  };

  const getAllowance = async (): Promise<number | undefined> => {
    console.log("##### GET ALLOWANCE #####");
    const client = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: TOKENS[token].address as Address,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [user, CONTRACT_ADDRESS],
      });

      setAllowance(Number(formatEther(data as unknown as bigint)));
      return Number(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getBalance = async (address: string): Promise<number | undefined> => {
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
      console.error(err);
    }
  };

  const getPledged = async (address: string) => {
    const client = createPublicClient({
      chain: CHAINS[ENV],
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: CONTRACT_ADDRESS as Address,
        abi: PLEDGE_ABI,
        functionName: "getPledged",
        args: [address],
      });

      setPledged(Number(data));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    price,
    supply: Number(supplyData),
    totalPledged: Number(totalPledgedData),
    token,
    pledged,
    allowance,
    isError,
    diagnostic,
    approve,
    changeToken,
    pledge,
    getPrice,
    getPledged,
    getTotalSupply,
    getTotalPledgedCount,
  };
}

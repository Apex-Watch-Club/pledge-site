"use client";
import { useState } from "react";
import {
  prepareWriteContract,
  readContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import {
  Address,
  parseEther,
  parseUnits,
  formatEther,
  formatUnits,
} from "viem";
import {
  NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS,
  NEXT_PUBLIC_USDT_CONTRACT_ADDRESS,
  NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
  ERC20_ABI,
  PLEDGE_ABI,
} from "@/modules/shared/global";
import { AcceptableTokensType } from "../types";

const TOKENS = {
  usdt: {
    address: NEXT_PUBLIC_USDT_CONTRACT_ADDRESS,
    name: "USD Token",
    symbol: "USDT",
    icon: "/assets/usdt-icon.png",
    abi: require("/USDT.json"),
  },
  usdc: {
    address: NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
    name: "USD Coin",
    symbol: "USDC",
    icon: "/assets/usdc-icon.png",
    abi: require("/USDC.json"),
  },
};

const PLEDGE_CONTRACT = {
  address: NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS as Address,
  abi: PLEDGE_ABI,
};

export default function usePledge(user: Address) {
  const [isError, setIsError] = useState(false);
  const [diagnostic, setDiagnostic] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<AcceptableTokensType>("usdc");
  const [price, setPrice] = useState(0);
  const [supply, setSupply] = useState(0);
  const [totalPledged, setTotalPledged] = useState(0);
  const [pledged, setPledged] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [balance, setBalance] = useState(0);

  const getTotalSupply = async () => {
    setIsError(false);
    try {
      const data = await readContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: "getTotalSupply",
        args: [],
      });
      setSupply(Number(data));
    } catch (err) {
      console.error(err);
      setIsError(true);
      setDiagnostic(
        `Failed to get supply from contract: ${PLEDGE_CONTRACT.address}`,
      );
    }
  };

  const getTotalPledgedCount = async () => {
    setIsError(false);
    try {
      const data = await readContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: "getTotalPledgedCount",
        args: [],
      });
      setTotalPledged(Number(data));
    } catch (err) {
      console.error(err);
      setIsError(true);
      setDiagnostic(
        `Failed to get totalPledged from contract: ${PLEDGE_CONTRACT.address}`,
      );
    }
  };

  const getPrice = async () => {
    setIsError(false);
    try {
      const data = await readContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: "getPrice",
        args: [],
      });
      setPrice(Number(formatUnits(data as unknown as bigint, 6)));
    } catch (err) {
      console.error(err);
      setIsError(true);
      setDiagnostic(
        `Failed to get price from contract: ${PLEDGE_CONTRACT.address}`,
      );
    }
  };

  const changeToken = (t: AcceptableTokensType) => {
    setToken(t);
  };

  const approve = async (amount: number) => {
    setIsError(false);
    setIsDone(false);
    try {
      const { request } = await prepareWriteContract({
        address: TOKENS[token].address as Address,
        abi: TOKENS[token].abi,
        functionName: "approve",
        // args: [PLEDGE_CONTRACT.address, parseEther(`${amount}`)],
        args: [PLEDGE_CONTRACT.address, parseUnits(`${amount}`, 6)],
      });
      const { hash } = await writeContract(request);
      const data = await waitForTransaction({ hash });
      setIsDone(true);
      setMessage(
        `Approval of ${amount} ${token.toUpperCase()} success: ${hash}`,
      );
      console.log("approve tx:", hash);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setDiagnostic(`Approval of ${amount} ${token.toUpperCase()} failed`);
    }
  };

  const pledge = async (amount: number) => {
    setIsError(false);
    setIsDone(false);
    try {
      const { request } = await prepareWriteContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: token === "usdt" ? "pledgeUsdt" : "pledgeUsdc",
        args: [parseUnits(`${amount}`, 6)],
      });

      const { hash } = await writeContract(request);
      const data = await waitForTransaction({ hash });
      setIsDone(true);
      setMessage(`Pledge of ${amount} ${token.toUpperCase()} success: ${hash}`);
      console.log("pledge tx:", hash);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setDiagnostic(`Pledging of ${amount} ${token.toUpperCase()} failed`);
    }
  };

  const getAllowance = async () => {
    setIsError(false);
    try {
      const data = await readContract({
        address: TOKENS[token].address as Address,
        abi: TOKENS[token].abi,
        functionName: "allowance",
        args: [user, PLEDGE_CONTRACT.address],
      });
      setAllowance(Number(formatUnits(data as unknown as bigint, 6)));
    } catch (err) {
      console.error(err);
      setIsError(true);
      setDiagnostic(
        `Failed to get allowance of ${user} for contract: ${PLEDGE_CONTRACT.address}`,
      );
    }
  };

  const getBalance = async () => {
    setIsError(false);
    try {
      const data = await readContract({
        address: TOKENS[token].address as Address,
        abi: TOKENS[token].abi,
        functionName: "balanceOf",
        args: [user],
      });
      setBalance(Number(formatUnits(data as unknown as bigint, 6)));
    } catch (err) {
      console.error(err);
      setIsError(true);
      setDiagnostic(`Failed to get balance for ${user}`);
    }
  };

  const getPledged = async (address: string) => {
    setIsError(false);
    try {
      const data = await readContract({
        address: PLEDGE_CONTRACT.address,
        abi: PLEDGE_CONTRACT.abi,
        functionName: "getPledged",
        args: [address],
      });
      setPledged(Number(formatEther(data as unknown as bigint)));
    } catch (err) {
      console.error(err);
      setIsError(true);
      setDiagnostic(`Failed to get pledge balance for ${user}`);
    }
  };

  return {
    price,
    supply,
    totalPledged,
    token,
    pledged,
    allowance,
    balance,
    isError,
    diagnostic,
    isDone,
    message,
    approve,
    changeToken,
    pledge,
    getAllowance,
    getBalance,
    getPrice,
    getPledged,
    getTotalSupply,
    getTotalPledgedCount,
  };
}

"use client";
import { useEffect, useState } from "react";
import { useContractWrite, useContractRead } from "wagmi";
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
import { mainnet, localhost } from "viem/chains";
import { anvil } from "../constants";
import { AcceptableTokensType } from "../types";

const metadata = require("/metadata.json");

const ERC20ABI = require("/ERC20.json").abi;
const ABI = require("/Pledge.json").abi;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

const unwatch = createPublicClient({
  chain: anvil,
  transport: http(RPC_URL),
}).watchEvent({
  // event: parseAbiItem("event DEBUG(uint256 _amount, uint256 _balance)"),
  onLogs: (logs) => console.log(logs),
});

const PLEDGE_CONTRACT = {
  address: CONTRACT_ADDRESS as Address,
  abi: ABI,
};

export default function usePledge(user: Address) {
  const [isError, setIsError] = useState(false);
  const [diagnostic, setDiagnostic] = useState("");
  const [token, setToken] = useState<AcceptableTokensType>("usdc");
  const [pledged, setPledged] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const {
    data: pledgeData,
    isLoading: isPledgeLoading,
    isSuccess: isPledgeSuccessful,
    write: pledgeWrite,
  } = useContractWrite({
    ...PLEDGE_CONTRACT,
    functionName: "pledge",
  });

  const {
    data: supplyData,
    isError: isSupplyError,
    isLoading: isSupplyLoading,
    refetch: getTotalSupply,
  } = useContractRead({
    ...PLEDGE_CONTRACT,
    functionName: "getTotalSupply",
  });

  const {
    data: priceData,
    isError: isPriceError,
    isLoading: isPriceLoading,
    refetch: getPrice,
  } = useContractRead({
    ...PLEDGE_CONTRACT,
    functionName: "getPrice",
  });

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
      chain: anvil,
      transport: http(RPC_URL),
    });

    const publicClient = createPublicClient({
      chain: anvil,
      transport: http(RPC_URL),
    });

    try {
      const { request } = await publicClient.simulateContract({
        chain: anvil,
        account: user,
        address: metadata.ethereum.erc20.usdt.address as Address,
        abi: ERC20ABI,
        functionName: "approve",
        args: [CONTRACT_ADDRESS, parseEther(`${amount}`)],
      });

      await walletClient.writeContract(request);
    } catch (err) {
      console.error(err);
    }
  };

  const pledge = async (amount: number) => {
    console.log("##### PLEDGING #####");
    console.log("balance:", await getBalance(user));
    console.log("amount:", amount);
    const approved = Number(await getAllowance());
    console.log("allowance in pledge:", approved);
    await approve(amount);
    // if (amount > approved) {
    //   console.log("APPROVING...", amount);
    //   await approve(amount);
    // }

    const walletClient = createWalletClient({
      account: user,
      chain: anvil,
      transport: http(RPC_URL),
    });

    const publicClient = createPublicClient({
      chain: anvil,
      transport: http(RPC_URL),
    });

    console.log("parsed amount", parseEther(`${amount}`));
    console.log("contract address", CONTRACT_ADDRESS);

    const req = {
      chain: anvil,
      address: CONTRACT_ADDRESS as Address,
      abi: ABI,
      functionName: "pledgeUsdt",
      args: [parseEther(`${amount}`)],
    };

    // const { request } = await publicClient.simulateContract({
    //   chain: anvil,
    //   address: CONTRACT_ADDRESS as Address,
    //   abi: ABI,
    //   functionName: "pledgeUsdt",
    //   args: [parseEther(`${amount}`)],
    // });
    //
    // console.log("request:", request);

    await walletClient.writeContract(req);
  };

  const getAllowance = async (): Promise<number | undefined> => {
    console.log("##### GET ALLOWANCE #####");
    const client = createPublicClient({
      chain: anvil,
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: metadata.ethereum.erc20.usdt.address as Address,
        abi: ERC20ABI,
        functionName: "allowance",
        args: [user, CONTRACT_ADDRESS],
      });

      return Number(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getBalance = async (address: string): Promise<number | undefined> => {
    const client = createPublicClient({
      chain: anvil,
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: metadata.ethereum.erc20.usdt.address as Address,
        abi: ERC20ABI,
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
      chain: anvil,
      transport: http(RPC_URL),
    });

    try {
      const data = await client.readContract({
        address: CONTRACT_ADDRESS as Address,
        abi: ABI,
        functionName: "getPledged",
        args: [address],
      });

      setPledged(Number(data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("pledgeData", pledgeData);
    console.log("totalPledgedData", totalPledgedData);
  }, [pledgeData, totalPledgedData]);

  return {
    price: Number(formatEther(priceData)),
    supply: Number(supplyData),
    totalPledged: Number(totalPledgedData),
    token,
    pledged,
    allowance,
    approve,
    changeToken,
    pledge,
    getPrice,
    getPledged,
    getTotalSupply,
    getTotalPledgedCount,
  };
}

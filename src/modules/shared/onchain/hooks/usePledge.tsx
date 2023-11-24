"use client";
import { useEffect, useState } from "react";
import { useContractWrite, useContractRead } from "wagmi";
import { Address, WalletClient } from "viem";
import { AcceptableTokensType } from "../types";

const ABI = require("/Pledge.json").abi;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

// function pledgeUsdt(uint256 _amount) public nonReentrant returns (bool) {}
// function pledgeUsdc(uint256 _amount) public nonReentrant returns (bool) { }
// function getPledged(address _address) public view returns (uint256) { }
// function getTotalPledgedCount() public view returns (uint256) { }
// function setTotalSupply(uint256 _supply) public onlyOwner returns (uint256) { }
// function getTotalSupply() public view returns (uint256) { }
// function setPrice(uint256 _newPrice) public onlyOwner returns (uint256) { }
// function getPrice() public view returns (uint256) { }
// function freeze() public onlyOwner { }
// function unfreeze() public onlyOwner { }
// function withdrawUsdt() public onlyOwner nonReentrant returns (bool) { }
// function withdrawUsdc() public onlyOwner nonReentrant returns (bool) { }

const PLEDGE_CONTRACT = {
  address: CONTRACT_ADDRESS as Address,
  abi: ABI,
};

export default function usePledge() {
  const [isError, setIsError] = useState(false);
  const [diagnostic, setDiagnostic] = useState("");
  const [token, setToken] = useState<AcceptableTokensType>("usdc");

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

  const pledge = (amount: number, walletClient: WalletClient) => {
    pledgeWrite();
  };

  // const getPrice = () => {};
  // const getTotalPledgedCount = () => {};
  // const getPledged = () => {};

  useEffect(() => {
    console.log("pledgeData", pledgeData);
  }, [pledgeData, totalPledgedData]);

  return {
    price: Number(priceData),
    supply: Number(supplyData),
    totalPledged: Number(totalPledgedData),
    token,
    changeToken,
    pledge,
    getPrice,
    getTotalSupply,
    getTotalPledgedCount,
  };
}

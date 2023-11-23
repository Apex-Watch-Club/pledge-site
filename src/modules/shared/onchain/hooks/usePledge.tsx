"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { AcceptableTokensType } from "../types";

const ABI = require("/Pledge.json").abi;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

// const provider = new ethers.JsonRpcProvider(RPC_URL);
// const signer = new ethers.Wallet(privateKey, provider);
// const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
// // update attachments
// const tx = await contract.claim(tokenId, bitwiseOrMask);
// // get attachments
// const result = Number(await contract.attachments(tokenId));

export default function usePledge() {
  const [token, setToken] = useState<AcceptableTokensType>("usdc");

  const changeToken = (t: AcceptableTokensType) => {
    setToken(t);
  };

  return { token, changeToken };
}

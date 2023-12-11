"use client";
import { useEffect, useState } from "react";
import { parseAbi, parseAbiItem } from "viem";
import { publicClient } from "@/modules/shared/client";

const NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS =
  "0x3e2113210A0d11C98693531d87709cc3acCE5e05";

export default function Page() {
  const [logs, setLogs] = useState();

  useEffect(() => {
    // on mount
    (async () => {
      try {
        const logs = await publicClient.getLogs({
          address: NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS,
          events: parseAbi([
            "event PledgeUsdt(address _from, address _to, uint256 _amount, uint256 timestamp)",
            "event PriceSet(uint256 _old, uint256 _new, uint256 timestamp)",
            "event Unfreeze(bool _status, uint256 timestamp)",
          ]),
        });
        console.log("logs", logs);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <main className="w-screen min-h-screen">
      <h1>History</h1>
    </main>
  );
}

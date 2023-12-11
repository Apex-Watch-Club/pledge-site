"use client";
import { useEffect, useState } from "react";
import { decodeEventLog, parseAbi, parseAbiItem, formatEther } from "viem";
import { publicClient } from "@/modules/shared/client";
import {
  NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS,
  PLEDGE_ABI,
  AcceptableTokensType,
} from "@/modules/shared/global";

type LogType = {
  from: string;
  amount: number;
  timestamp: number;
  token: AcceptableTokensType;
};

type EntryType = {
  total: number;
};

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState<Record<string, EntryType>>({});

  useEffect(() => {
    // on mount
    (async () => {
      try {
        const blockNumber = await publicClient.getBlockNumber();
        const receivedLogs = await publicClient.getLogs({
          address: NEXT_PUBLIC_PLEDGE_CONTRACT_ADDRESS,
          events: parseAbi([
            "event PledgeUsdt(address _from, address _to, uint256 _amount, uint256 _timestamp)",
            "event PledgeUsdc(address _from, address _to, uint256 _amount, uint256 _timestamp)",
          ]),
          fromBlock: BigInt(0),
          toBlock: blockNumber,
        });

        // receivedLogs.forEach((l) =>
        //   console.log(decodeEventLog({ abi: PLEDGE_ABI, ...l })),
        // );

        const decodedLogs: LogType[] = receivedLogs.map((l) => {
          const dLog = l.args;

          return {
            timestamp: Number(dLog._timestamp),
            token: l.eventName.toLowerCase().includes("usdt") ? "usdt" : "usdc",
            from: String(dLog._from),
            amount: Number(formatEther(dLog._amount as bigint)),
          };
        });

        const mergedLogs: Record<string, EntryType> = {};

        decodedLogs.forEach((eachLog) => {
          console.log("eachLog", eachLog);
          console.log("from", eachLog.from);
          if (Object.keys(mergedLogs).includes(eachLog.from)) {
            console.log("exists", mergedLogs);
            mergedLogs[eachLog.from].total += eachLog.amount;
          } else {
            mergedLogs[eachLog.from] = { total: eachLog.amount };
          }
        });

        setLogs(mergedLogs);
      } catch (err) {
        console.error(err);
      }
    })();

    setMounted(true);
  }, []);

  return (
    <main className="w-screen min-h-screen p-8">
      <h1 className="text-lg font-bold p-4 border-white border-b-2">History</h1>

      <section>
        {mounted && (
          <table className="table-auto">
            <thead className="font-bold">
              <td className="p-4">Owner</td>
              <td className="p-4">Total Pledged</td>
            </thead>
            {Object.keys(logs).map((key, idx) => (
              <tr key={idx}>
                <td className="px-4">{key}</td>
                <td className="font-bold p-4 text-right">{logs[key].total}</td>
              </tr>
            ))}
          </table>
        )}
      </section>

      <h1 className="text-lg font-bold p-4">Addresses</h1>

      <section>
        {Object.keys(logs).map((key, idx) => (
          <tr key={idx}>
            <td className="px-4">{key}</td>
          </tr>
        ))}
      </section>
    </main>
  );
}

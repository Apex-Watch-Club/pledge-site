"use client";
import MintModal from "./MintModal";
import BenefitsModal from "./BenefitsModal";
import { useHome } from "@/modules/Home";
import { Footer } from "@/modules/shared/layout";
import { BENEFITS } from "../constants";

const metadata = require("/metadata.json");

export default function Page() {
  const {
    allowance,
    address,
    counter,
    isConnected,
    price,
    supply,
    totalPledged,
    token,
    approve,
    changeToken,
    connect,
    decrement,
    disconnect,
    increment,
    pledge,
  } = useHome();

  return (
    <main className="w-full bg-[url('/assets/background.jpg')] bg-cover">
      <section className="bg-dim p-4 md:p-16 flex flex-col items-center justify-center">
        <MintModal
          allowance={allowance}
          address={address}
          approve={approve}
          connect={connect}
          disconnect={disconnect}
          isConnected={isConnected}
          token={token}
          metadata={metadata}
          counter={counter}
          increment={increment}
          decrement={decrement}
          changeToken={changeToken}
          pledge={pledge}
          totalPledged={totalPledged}
          supply={supply}
          price={price}
        />
      </section>

      <section className="bg-dim px-4 pb-4 md:px-16 md:pb-16 flex flex-col items-center justify-center">
        <BenefitsModal benefits={BENEFITS} />
      </section>

      <Footer />
    </main>
  );
}

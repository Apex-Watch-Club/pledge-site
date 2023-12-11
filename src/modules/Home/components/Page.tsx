"use client";
import MintModal from "./MintModal";
import BenefitsModal from "./BenefitsModal";
import { useHome } from "@/modules/Home";
import { Footer } from "@/modules/shared/layout";
import { Toaster } from "@/modules/shared/toaster";
import { BENEFITS } from "../constants";

const metadata = require("/metadata.json");

export default function Page() {
  const {
    allowance,
    balance,
    address,
    counter,
    isConnected,
    price,
    supply,
    totalPledged,
    token,
    isError,
    diagnostic,
    connectors,
    approve,
    changeToken,
    handleConnect,
    decrement,
    disconnect,
    increment,
    notify,
    pledge,
  } = useHome();

  return (
    <main className="w-full bg-[url('/assets/background.jpg')] bg-cover">
      <section className="bg-dim p-4 md:p-16 flex flex-col items-center justify-center">
        <MintModal
          allowance={allowance}
          balance={balance}
          address={address}
          approve={approve}
          handleConnect={handleConnect}
          connectors={connectors}
          disconnect={disconnect}
          isConnected={isConnected}
          token={token}
          tokens={metadata.ethereum.tokens.erc20}
          counter={counter}
          increment={increment}
          decrement={decrement}
          changeToken={changeToken}
          notify={notify}
          pledge={pledge}
          totalPledged={totalPledged}
          supply={supply}
          price={price}
          isError={isError}
          diagnostic={diagnostic}
        />
      </section>

      <section className="bg-dim px-4 pb-4 md:px-16 md:pb-16 flex flex-col items-center justify-center">
        <BenefitsModal benefits={BENEFITS} />
      </section>

      <Footer />

      <Toaster />
    </main>
  );
}

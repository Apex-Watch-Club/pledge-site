"use client";
import MintModal from "./MintModal";
import BenefitsModal from "./BenefitsModal";
import { useHome } from "@/modules/Home";
import { Footer } from "@/modules/shared/layout";
import { BENEFITS } from "../constants";

const metadata = require("/metadata.json");

export default function Page() {
  const { counter, increment, decrement, token, changeToken } = useHome();

  return (
    <main className="w-full bg-[url('/assets/background.jpg')] bg-cover">
      <section className="bg-dim p-4 md:p-16 flex flex-col items-center justify-center">
        <MintModal
          token={token}
          metadata={metadata}
          counter={counter}
          increment={increment}
          decrement={decrement}
          changeToken={changeToken}
        />
      </section>

      <section className="bg-dim px-4 pb-4 md:px-16 md:pb-16 flex flex-col items-center justify-center">
        <BenefitsModal benefits={BENEFITS} />
      </section>

      <Footer />
    </main>
  );
}

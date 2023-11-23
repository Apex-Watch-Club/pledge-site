"use client";
import MintModal from "./MintModal";
import BenefitsModal from "./BenefitsModal";
import { useHome } from "@/modules/Home";
import { Footer } from "@/modules/shared/layout";
import { BENEFITS } from "../constants";
import { ERC20DescriptorType } from "../types";

const metadata = require("/metadata.json");
const tokens: ERC20DescriptorType[] = Object.values(metadata.ethereum.erc20);

export default function Page() {
  const { counter, increment, decrement } = useHome();

  return (
    <main className="w-full bg-[url('/assets/background.jpg')] bg-cover">
      <section className="bg-dim p-4 md:p-16 flex flex-col items-center justify-center">
        <MintModal
          tokens={tokens}
          counter={counter}
          increment={increment}
          decrement={decrement}
        />
      </section>

      <section className="bg-dim px-4 pb-4 md:px-16 md:pb-16 flex flex-col items-center justify-center">
        <BenefitsModal benefits={BENEFITS} />
      </section>

      <Footer />
    </main>
  );
}

import MintModal from "./MintModal";
import BenefitsModal from "./BenefitsModal";
import { Footer } from "@/modules/shared/layout";
import { BENEFITS } from "../constants";

export default function Page() {
  return (
    <main className="w-full bg-[url('/assets/background.jpg')] bg-cover">
      <section className="bg-dim p-16 flex flex-col items-center justify-center">
        <MintModal />
      </section>

      <section className="bg-dim px-16 pb-16 flex flex-col items-center justify-center">
        <BenefitsModal benefits={BENEFITS} />
      </section>

      <Footer />
    </main>
  );
}

import MintModal from "./MintModal";
import BenefitsModal from "./BenefitsModal";
import { Footer } from "@/modules/shared/layout";
import { BENEFITS } from "../constants";

export default function Page() {
  return (
    <main className="w-full bg-[url('/assets/background.jpg')] bg-cover">
      <section className="bg-dim p-4 md:p-16 flex flex-col items-center justify-center">
        <MintModal />
      </section>

      <section className="bg-dim px-4 pb-4 md:px-16 md:pb-16 flex flex-col items-center justify-center">
        <BenefitsModal benefits={BENEFITS} />
      </section>

      <Footer />
    </main>
  );
}

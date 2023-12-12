import { EB_Garamond, Readex_Pro } from "next/font/google";
import { BenefitPairType } from "../types";

const ebGaramond = EB_Garamond({ subsets: ["latin"] });
const readexPro = Readex_Pro({ weight: "200", subsets: ["latin"] });

export default function BenefitsModal({
  benefits,
}: {
  benefits: BenefitPairType[];
}) {
  return (
    <div className="flex flex-col items-center w-full max-w-[600px] bg-luxury-black border-gold border-[1px] rounded-3xl py-16 px-8">
      <header className="mb-8 flex flex-col items-center">
        <h1 className={ebGaramond.className + " text-2xl text-light-gold mb-2"}>
          KEY BENEFITS
        </h1>
        <img src="/assets/line2.png" alt="Divider" />
      </header>

      {benefits.map((b, idx) => (
        <section key={idx}>
          <h2
            className={
              ebGaramond.className + " text-left w-full text-lg text-gold mb-2"
            }
          >
            {b.heading.toUpperCase()}
          </h2>
          <p className={readexPro.className + " text-white mb-8"}>
            {b.description}
          </p>
        </section>
      ))}
    </div>
  );
}

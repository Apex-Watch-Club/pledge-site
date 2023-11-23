import { Roboto_Slab, Readex_Pro } from "next/font/google";
import { useHome } from "@/modules/Home";
import { ERC20DescriptorType } from "../types";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });
const readexPro = Readex_Pro({ weight: "200", subsets: ["latin"] });

export default function MintModal({
  tokens,
  counter,
  increment,
  decrement,
}: {
  tokens: ERC20DescriptorType[];
  counter: number;
  increment: () => void;
  decrement: () => void;
}) {
  return (
    <div className="w-full max-w-[600px] bg-luxury-black border-gold border-[1px] rounded-3xl p-4">
      <div className="w-full border-gold border-[1px] rounded-3xl p-4 md:p-16">
        <img src="/assets/nft.png" alt="VIP Card" />

        <div className="border-b-[1px] border-b-gray py-8">
          <p
            className={robotoSlab.className + " text-center mb-4"}
          >{`TOTAL MINTED: ${25}/${150}`}</p>
          <div className="flex justify-between items-center">
            <button
              className="w-12 h-12 md:w-[100px] md:h-[100px] md:text-5xl text-white border-gray border-[1px] rounded-md"
              onClick={decrement}
            >
              -
            </button>
            <span className={robotoSlab.className + " text-lg md:text-5xl"}>
              {counter}
            </span>
            <button
              className="w-12 h-12 md:w-[100px] md:h-[100px] md:text-5xl text-white border-gray border-[1px] rounded-md"
              onClick={increment}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center p-8 my-4">
          <p className={robotoSlab.className + " "}>TOTAL</p>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="hover:bg-gray hover:cursor-pointer bg-middle-black flex items-center py-2 px-4 rounded-2xl mr-4">
              <img
                className="w-6 mr-2"
                src={tokens[0].icon}
                alt={tokens[0].name}
              />
              <img src="/assets/chevron.svg" alt="Chevron Icon" />
            </div>
            <p
              className={robotoSlab.className + " "}
            >{`${"10000 USDT"} + GAS`}</p>
          </div>
        </div>

        <button
          className={`w-full bg-gradient-to-r text-black from-dark-gold to-light-gold px-16 py-4 rounded-sm ${robotoSlab.className}`}
        >
          CONNECT WALLET
        </button>

        <p className={readexPro.className + " text-gray text-center mt-4"}>
          0x1234...5678
        </p>
      </div>
    </div>
  );
}

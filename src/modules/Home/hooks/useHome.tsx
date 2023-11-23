import useCounter from "./useCounter";
import { usePledge } from "@/modules/shared/onchain";

export default function useHome() {
  const { counter, increment, decrement } = useCounter({ min: 1 });
  const { token, changeToken } = usePledge();

  return { counter, increment, decrement, token, changeToken };
}

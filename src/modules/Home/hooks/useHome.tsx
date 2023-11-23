import useCounter from "./useCounter";

export default function useHome() {
  const { counter, increment, decrement } = useCounter({ min: 1 });

  return { counter, increment, decrement };
}

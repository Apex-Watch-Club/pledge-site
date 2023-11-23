"use client";
import { useState } from "react";

export default function useCounter({
  min,
  max,
}: {
  min?: number;
  max?: number;
}) {
  const [counter, setCounter] = useState(min || 0);

  const increment = () => {
    setCounter((prev) => {
      const newCount = prev + 1;
      return max && newCount > max ? max : newCount;
    });
  };

  const decrement = () => {
    setCounter((prev) => {
      const newCount = prev - 1;
      return min && newCount < min ? min : newCount;
    });
  };

  return { counter, increment, decrement };
}

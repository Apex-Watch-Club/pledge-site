import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="w-screen min-h-screen">{children}</div>;
}

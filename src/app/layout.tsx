import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { WagmiWrapper } from "@/modules/shared/layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apex Watch Club",
  description: "Apex Watch Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiWrapper>
        <body className={inter.className}>{children}</body>
      </WagmiWrapper>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClientWrapper } from "@/modules/shared/layout";
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
      <ClientWrapper>
        <body className={inter.className}>{children}</body>
      </ClientWrapper>
    </html>
  );
}

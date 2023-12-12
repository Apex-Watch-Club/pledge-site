import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClientWrapper } from "@/modules/shared/layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apex Watch Club",
  description: "The Future of Luxury Watch Ownership and Trading",
  openGraph: {
    title: "Apex Watch Club",
    description: "The Future of Luxury Watch Ownership and Trading",
    url: "https://www.apexwatchclub.com/",
    images:
      "https://bafybeiayltj5dzslzd2fohtl2sxdrublo53rzxmwy7stth5wulzroisimu.ipfs.nftstorage.link/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Watch Club",
    description: "The Future of Luxury Watch Ownership and Trading",
    creator: "Apex Watch Club",
    images: [
      "https://bafybeiayltj5dzslzd2fohtl2sxdrublo53rzxmwy7stth5wulzroisimu.ipfs.nftstorage.link/",
    ],
  },
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

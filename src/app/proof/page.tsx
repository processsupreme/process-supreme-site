import type { Metadata } from "next";
import { ProofContent } from "./ProofContent";

export const metadata: Metadata = {
  title: "Case Study: Cannabis Retail and Cultivation",
  description:
    "Cannabis retail and cultivation, run lean by engines we built on the floor. Our own numbers: 5M+ transactions, 7 stores, zero violations.",
  openGraph: {
    title: "Case Study: Cannabis Retail and Cultivation | Process Supreme",
    description: "Cannabis retail and cultivation, run lean by engines we built on the floor. Our own numbers: 5M+ transactions, 7 stores, zero violations.",
    images: ["/og/proof.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Study: Cannabis Retail and Cultivation | Process Supreme",
    description: "Cannabis retail and cultivation, run lean by engines we built on the floor. Our own numbers: 5M+ transactions, 7 stores, zero violations.",
    images: ["/og/proof.png"],
  },
};

export default function ProofPage() {
  return <ProofContent />;
}

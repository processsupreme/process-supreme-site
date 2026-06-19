import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageRuler } from "@/components/layout/PageRuler";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  // optional: never re-paints the LCP headline waiting on the network;
  // a cold slow connection renders the metric-matched fallback instead
  display: "optional",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://process-supreme.vercel.app"),
  title: {
    default: "Process Supreme | Cut the Fat Out of How Your Business Runs",
    template: "%s | Process Supreme",
  },
  description:
    "Custom software that removes manual work, hand-built reports, and spreadsheets that don't talk. Built by operators, for operators.",
  keywords: [
    "operations automation",
    "custom business software",
    "business process automation",
    "back office automation",
    "operational efficiency",
  ],
  authors: [{ name: "Process Supreme" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Process Supreme",
    title: "Process Supreme | Cut the Fat Out of How Your Business Runs",
    description:
      "Custom software that removes manual work, hand-built reports, and spreadsheets that don't talk. Built by operators, for operators.",
    images: ["/og/home.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Process Supreme | Cut the Fat Out of How Your Business Runs",
    description:
      "Custom software that removes manual work, hand-built reports, and spreadsheets that don't talk. Built by operators, for operators.",
    images: ["/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${archivo.variable} ${jetbrainsMono.variable} font-body antialiased bg-deck text-fg`}
      >
        <PageRuler />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

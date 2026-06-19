import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "15+ years running regulated, multi-location businesses. Every engine solves a problem we have lived. Built by operators, for operators.",
  openGraph: {
    title: "About | Process Supreme",
    description: "15+ years running regulated, multi-location businesses. Every engine solves a problem we have lived. Built by operators, for operators.",
    images: ["/og/about.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Process Supreme",
    description: "15+ years running regulated, multi-location businesses. Every engine solves a problem we have lived. Built by operators, for operators.",
    images: ["/og/about.png"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

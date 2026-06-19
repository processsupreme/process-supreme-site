import type { Metadata } from "next";
import { StyleguideContent } from "./StyleguideContent";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Internal design system reference for Process Supreme.",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return <StyleguideContent />;
}

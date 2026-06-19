import type { Config } from "tailwindcss";
import {
  colors,
  typeScale,
  spacing,
  maxWidth,
  borderRadius,
  boxShadow,
} from "./src/styles/tokens";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { ...colors },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: { ...typeScale } as unknown as Record<
        string,
        [string, Record<string, string>]
      >,
      spacing: { ...spacing },
      maxWidth: { ...maxWidth },
      borderRadius: { ...borderRadius },
      boxShadow: { ...boxShadow },
    },
  },
  plugins: [],
};

export default config;

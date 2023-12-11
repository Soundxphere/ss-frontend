import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        bebas: ["var(--font-bebas-neue)"],
        outfit: ["var(--font-outfit)"],
      },
      backgroundColor: {
        body: "#F9FAFF",
        slate: "#181E2E",
        "slate-input": "#2A3552",
        nav: "#FFFFFF",
        card: "#1E1F24",
        profile: "#41464F",
      },
    },
  },
  plugins: [],
};
export default config;

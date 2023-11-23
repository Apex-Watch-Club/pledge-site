import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gold: "#958134",
        "dark-gold": "#f7d153",
        "light-gold": "#fff6b9",
        "luxury-black": "#111111",
        "middle-black": "#222222",
        gray: "#979797",
        dim: "rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};
export default config;

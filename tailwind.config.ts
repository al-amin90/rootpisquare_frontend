import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "forest-primary": "#228B22",
        "forest-dark": "#1A6B1A",
        "forest-light": "#3DAA3D",
        "bg-dark": "#0A0F0A",
        "bg-darker": "#051005",
        "text-primary": "#E8F5E8",
        "text-secondary": "#A8C5A8",
      },
    },
  },
  plugins: [],
};

export default config;

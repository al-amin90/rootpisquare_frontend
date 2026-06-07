// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0A0F0A",
        "bg-darker": "#051005",
        "bg-card": "#0F170F",
        "bg-elevated": "#131A13",
        "forest-primary": "#228B22",
        "forest-dark": "#1A6B1A",
        "forest-light": "#3DAA3D",
        "forest-accent": "#2D8F2D",
        "forest-muted": "#1F551F",
        "text-primary": "#E8F5E8",
        "text-secondary": "#A8C5A8",
        "text-muted": "#7A9A7A",
        "border-color": "#1F3521",
        "border-light": "#2A472B",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;

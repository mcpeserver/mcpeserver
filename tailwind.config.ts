import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        panel: {
          bg: "hsl(var(--panel-bg))",
          dark: "hsl(var(--panel-dark))",
        }
      },
      fontFamily: {
        minecraft: ['var(--font-minecraft)', 'sans-serif'],
        vt323: ['var(--font-vt323)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
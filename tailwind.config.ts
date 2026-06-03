import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E3F1EA",
          100: "#CFE6DA",
          200: "#A6D0BC",
          300: "#71B295",
          400: "#15573E",
          500: "#15573E",
          600: "#195C46",
          700: "#14503C",
          800: "#0E3A2B",
        },
        ink: "#1A2C22",
        muted: "#6B7B72",
        cta: "#1A2C22",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(27,67,50,0.35)",
        card: "0 25px 60px -30px rgba(27,67,50,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;

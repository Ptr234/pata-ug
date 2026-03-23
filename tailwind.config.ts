import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      colors: {
        navy: {
          DEFAULT: "#0B1929",
          50: "#F0F3F7",
          100: "#D6DDE6",
          200: "#A8B5C5",
          300: "#7A8DA4",
          400: "#4C6583",
          500: "#1E3D62",
          600: "#162E4A",
          700: "#0F1F33",
          800: "#0B1929",
          900: "#060D15",
        },
        teal: {
          DEFAULT: "#0A9396",
          light: "#DCF4F4",
          dark: "#077B7E",
        },
        orange: {
          DEFAULT: "#D4622A",
          light: "#FAEAE1",
          dark: "#B54E1C",
        },
        gold: {
          DEFAULT: "#d4a853",
          light: "#FBF4E4",
          dark: "#B8903D",
          50: "#FDF8ED",
          100: "#F9EDD3",
          200: "#F0D89F",
          300: "#E6C36B",
          400: "#d4a853",
          500: "#B8903D",
          600: "#947330",
          700: "#705623",
          800: "#4C3917",
          900: "#281C0A",
        },
        green: {
          DEFAULT: "#1F8A44",
          light: "#E4F5EC",
        },
        red: {
          DEFAULT: "#C0303A",
          light: "#FAEAEA",
        },
        amber: {
          DEFAULT: "#E08C10",
          light: "#FDF3DC",
        },
        purple: {
          DEFAULT: "#4E3FA8",
          light: "#EEEAFC",
        },
        slate: "#455567",
        smoke: "#F7F8FA",
        rule: "#E8ECF0",
        surface: "#FFFFFF",
        "text-primary": "#0B1929",
        "text-secondary": "#4A5568",
        "text-muted": "#8896A4",
      },
      fontFamily: {
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      letterSpacing: {
        tighter: "-0.03em",
        editorial: "-0.025em",
      },
      lineHeight: {
        relaxed: "1.6",
        prose: "1.75",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(11, 25, 41, 0.04)",
        card: "0 4px 24px rgba(11, 25, 41, 0.06)",
        elevated: "0 8px 40px rgba(11, 25, 41, 0.08)",
        gold: "0 4px 20px rgba(212, 168, 83, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;

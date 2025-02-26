import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primaryColor: "#22c55e", // green-500
        primaryColorAlt: '#3730a3', // Indigo-800
        primaryColorHover: "#16a34a", // green-600
        primaryColorHoverAlt: "#4f46e5", // Indigo-600

        secondaryColor: "#e5e7eb", // gray-200
        secondaryColorHover: "#d1d5db", // gray-300
      },
    },
  },
  plugins: [],
} satisfies Config;

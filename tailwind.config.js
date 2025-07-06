import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: "#bfacaaff",
        black: "#02020aff",
        oxford: "#05204aff",
        wisteria: "#b497d6ff",
        lavender: "#e1e2efff",
      },
    },
  },
  plugins: [],
};

export default config;

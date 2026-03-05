/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: { blue:"#0052FF", dark:"#060B18", card:"#111827", border:"#1F2937" },
        village: { green:"#22C55E", amber:"#F59E0B", purple:"#8B5CF6", teal:"#14B8A6", pink:"#EC4899" },
      },
      fontFamily: { display:["'Plus Jakarta Sans'","sans-serif"], mono:["'JetBrains Mono'","monospace"] },
    },
  },
  plugins: [],
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: "Poppins, sans-serif",
      sora: "Sora, sans-serif",
    },
    extend: {
      colors: {
        "prim-blue": "#01052D",
        "prim-gray": "#F1F3F6",
        "text-prim": "#4E7DD9",
        "text-gray": "#9B9B9B",
        "border-gray": "#D4DFEE",
        "divider-gray": "#B0C4DB",
      },
      backgroundImage: {
        arrow: "url('/arrow.svg')",
      },
      padding: {
        15: "60px",
        25: "100px",
        70: "70px",
      },
    },
  },
  plugins: [],
};

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
      fontSize: {
        heading: ["28px", "40px"],
      },
      colors: {
        "prim-blue": "#01052D",
        "prim-gray": "#F1F3F6",
        "text-prim": "#4E7DD9",
        "text-gray": "#9B9B9B",
        "border-gray": "#D4DFEE",
        "divider-gray": "#B0C4DB",
        "prim-border": "#4289F2",
      },
      backgroundImage: {
        arrow: "url('/arrow.svg')",
      },
      padding: {
        15: "60px",
        25: "100px",
        70: "70px",
        "50px": "50px",
        "150px": "150px",
      },
      spacing: {
        15: "3.75rem",
        87: "21.75rem",
      },
    },
  },
  plugins: [],
};

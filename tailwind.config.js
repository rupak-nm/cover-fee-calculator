module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: "Poppins, sans-serif",
      sora: "Sora, sans-serif",
    },
    extend: {
      fontSize: {
        heading: ["28px", "40px"],
        heading2: ["23px", "29px"],
        xxs: ["10px", "8px"],
        h4: ["19px", "24px"],
        h7: ["14px", "16px"],
      },
      borderRadius: {
        big: "0.625rem",
      },
      colors: {
        "prim-blue": "#01052D",
        "prim-gray": "#F1F3F6",
        "text-prim": "#4E7DD9",
        "text-gray": "#9B9B9B",
        "border-gray": "#D4DFEE",
        "divider-gray": "#B0C4DB",
        "prim-border": "#4289F2",
        "light-blue": "#9FB8E7",
        "728FB2": "#728FB2",
        FEFEFF: "#FEFEFF",
        DAE2EB: "#DAE2EB",
        EEEEEE: "#EEEEEE",
        FA5C2F: "#FA5C2F",
        "7398C0": "#7398C0",
        404040: "#404040",
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
        18: "4.5rem",
        21: "5.25rem",
        22: "5.5rem",
        23: "5.75rem",
        87: "21.75rem",
        "btn-x": "22.5px",
        "btn-y": "16.5px",
        "75px": "75px",
      },
      minWidth: {
        "800px": "800px",
      },
      boxShadow: {
        dropdown: "0px 1px 11px rgba(0, 0, 0, 0.33)",
      },
      zIndex: {
        60: "60",
      },
    },
  },
  plugins: [],
};

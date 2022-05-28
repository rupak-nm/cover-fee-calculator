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
      screens: {
        xs: "550px",
      },
      fontSize: {
        modalHeading: ["33px", "48px"],
        heading: ["28px", "40px"],
        heading2: ["23px", "29px"],
        xxs: ["10px", "15px"],
        h4: ["19px", "24px"],
        h7: ["14px", "16px"],
        large: ["2.5rem", "24px"],
        "2xll": ["1.75rem", "24px"],
      },
      ringWidth: {
        "3/2": "1.5px",
      },
      borderRadius: {
        big: "0.625rem",
        lgg: "10px",
      },
      borderWidth: {
        3.5: "3.5px",
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
        "teal-light": "#CEEBED",
        FEFEFF: "#FEFEFF",
        DAE2EB: "#DAE2EB",
        EEEEEE: "#EEEEEE",
        FA5C2F: "#FA5C2F",
        "7398C0": "#7398C0",
        404040: "#404040",
        E5EDF9: "#E5EDF9",
        DEEAF6: "#DEEAF6",
        "5F5F5F": "#5F5F5F",
        "7A9DFF": "#7A9DFF",
        E39FF4: "#E39FF4",
        "6EE4F1": "#6EE4F1",
      },
      backgroundImage: {
        arrow: "url('/arrow.svg')",
      },
      padding: {
        4.5: "18px",
        15: "60px",
        25: "100px",
        70: "70px",
        "50px": "50px",
        "150px": "150px",
      },
      spacing: {
        "1/2": "2px",
        2.5: "10px",
        5.5: "22px",
        6.5: "26px",
        7.5: "30px",
        13: "52px",
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
      maxWidth: {
        "95%": "95%",
        "200px": "200px",
      },
      minWidth: {
        "80%": "80%",
        "100px": "100px",
        "200px": "200px",
        "300px": "300px",
        "400px": "400px",
        "850px": "850px",
      },
      boxShadow: {
        dropdown: "0px 1px 11px rgba(0, 0, 0, 0.33)",
        table: "0px 4px 7px rgba(0, 0, 0, 0.05)",
        dropdown2: "0px 4px 6px rgba(0, 0, 0, 0.06);",
        input: "0px 0px 14px rgba(66, 137, 242, 0.2);",
        "hc-tooltip": "0px 5px 13px rgba(0, 0, 0, 0.05);",
      },
      zIndex: {
        60: "60",
      },
      lineHeight: {
        4.5: "18px",
        5.25: "21px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("first-child", "& > *:first-child");
      addVariant("last-child", "& > *:last-child");
    },
  ],
};
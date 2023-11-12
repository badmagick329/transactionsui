module.exports = {
  content: [
    "./page/templates/**/*.{gohtml,html}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "color-0": "#0f172a",
        "color-1": "#176B87",
        "color-2": "#64CCC5",
        "color-3": "#EEEEEE",
      },
      screens: {
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1980px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "coffee",
    ],
  },
}

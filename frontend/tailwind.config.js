module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        black: {
          90: "rgba(0, 0, 0, 0.9)",
          60: "rgba(0, 0, 0, 0.6)",
        },
        red: {
          500: "#ef4444",
          "500/50": "rgba(239, 68, 68, 0.5)",
        },
        transparent: "transparent",
      },
    },
  },
  plugins: [],
};

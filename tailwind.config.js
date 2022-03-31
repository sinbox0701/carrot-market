module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ], // pages아래의 모든 파일(js,jsx,ts,tsx)에 tailwind적용
  theme: {
    extend: {},
  },
  darkMode: "media",
  plugins: [require("@tailwindcss/forms")],
};
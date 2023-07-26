/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#0f172a",
      },
    },
  },
  plugins: [],
});

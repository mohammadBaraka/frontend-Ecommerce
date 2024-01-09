// const withMT = require("@material-tailwind/react/utils/withMT");
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/tw-elements-react/dist/js/**/*.js",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
//     "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/tw-elements-react/dist/js/**/*.js",
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [require("tw-elements-react/dist/plugin.cjs")],
// };

const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      color: {
        primary: "green",
      },
    },
  },
  plugins: [],
});

// postcss.config.js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "autoprefixer": {}, // 👈 Ye lazmi add karein CSS compatibility ke liye
  },
};

export default config;
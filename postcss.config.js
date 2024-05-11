import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    autoprefixer,
    tailwind
  ]
}

export default config
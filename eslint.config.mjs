import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["**/*.config.*js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
      "process": true
      }
    }
  }
])

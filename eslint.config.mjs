import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"
import css from "@eslint/css"

export default defineConfig([
  {
		files: ["**/*.css"],
    ignores: ["app/reset.css"],
		language: "css/css",
		plugins: { css },
		extends: ["css/recommended"],
	},
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

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },

    // ✅ Enable Node.js support
    { languageOptions: { globals: { ...globals.node } } },

    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];

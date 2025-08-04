import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // General JS/TS Best Practices
      "no-unused-vars": "warn",
      "no-console": "warn",
      "no-debugger": "error",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-var": "error",
      "prefer-const": "warn",
      "object-shorthand": ["warn", "always"],

      // Code clarity
      "consistent-return": "error",
      "no-shadow": "warn",

      // React specific
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/jsx-no-duplicate-props": "error",
      "react/self-closing-comp": "warn",
      "react/jsx-sort-props": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript-specific
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
      "@typescript-eslint/consistent-type-definitions": "off"
    },
  }
];

export default eslintConfig;

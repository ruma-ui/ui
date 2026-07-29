import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nx from "@nx/eslint-plugin";
import { dirname } from "path";
import { fileURLToPath } from "url";
import baseConfig from "../eslint.config.mjs";
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...baseConfig,
  ...nx.configs["flat/react-typescript"],
  ...compat.config({
    extends: ["plugin:@next/next/recommended"],
  }),
  {
    ignores: [".next/**/*", "next-env.d.ts"],
  },
];

export default eslintConfig;

import nx from "@nx/eslint-plugin";
import baseConfig from "../eslint.config.mjs";

export default [
  ...baseConfig,
  ...nx.configs["flat/react"],
  {
    ignores: ["storybook-static/**", "dist/**", "coverage/**", "**/*.d.ts"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    // Override or add rules here
    rules: {},
  },
];

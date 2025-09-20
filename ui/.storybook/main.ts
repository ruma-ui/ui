import type { StorybookConfig } from "@storybook/react-vite";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
  addons: [getAbsolutePath("@storybook/addon-docs"), getAbsolutePath("@storybook/addon-a11y")],
  staticDirs: ["../public"],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {
      builder: {
        viteConfigPath: "vite.config.ts",
      },
    },
  },

  viteFinal: async config => {
    // Standard Vite configuration for Node.js polyfills
    config.define = {
      ...config.define,

      global: "globalThis",
    };
    // Provide process polyfill for browser environment

    config.define["process.env"] = JSON.stringify(process.env);

    // For Storybook build, don't externalize dependencies to avoid resolution issues
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.external = [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "next",
      "react-router-dom",
      /^react-icons/,
      "tw-animate-css",
    ];

    return config;
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

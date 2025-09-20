/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  const isAnalyze = mode === "analyze" || process.env.NODE_ENV === "analyze";

  return {
    root: __dirname,
    cacheDir: "../node_modules/.vite/ui",
    plugins: [
      react(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(["*.md"]),
      dts({
        entryRoot: "src",
        tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
        pathsToAliases: false,
        exclude: [
          "**/*.spec.ts",
          "**/*.test.ts",
          "**/*.spec.tsx",
          "**/*.test.tsx",
          "**/*.stories.tsx",
        ],
      }),
      isAnalyze &&
        visualizer({
          filename: "../dist/ui/bundle-analysis.html",
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    build: {
      outDir: "../dist/ui",
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      lib: {
        // Could also be a dictionary or array of multiple entry points.
        entry: "src/index.ts",
        name: "RumaUI",
        fileName: format => `index.${format === "es" ? "mjs" : "js"}`,
        // Change this to the formats you want to support.
        // Don't forget to update your package.json as well.
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        // External packages that should not be bundled into your library.
        external: ["react", "react-dom", "react/jsx-runtime", "next", "react-router-dom"],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
            next: "Next",
            "react-router-dom": "ReactRouterDOM",
          },
          // Preserve module structure for better tree-shaking
          preserveModules: false,
          exports: "named",
        },
      },
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // Enable source maps for debugging
      sourcemap: true,
      // Minify in production
      minify: mode === "production",
      // Target modern browsers
      target: ["es2020", "chrome90", "firefox88", "safari14", "edge90"],
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      reporters: ["default"],
      coverage: {
        reportsDirectory: "../coverage/ui",
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: [
          "coverage/**",
          "dist/**",
          "**/node_modules/**",
          "**/[.]**",
          "packages/*/test{,s}/**",
          "**/*.d.ts",
          "**/virtual:*",
          "**/__x00__*",
          "**/\x00*",
          "cypress/**",
          "test{,s}/**",
          "test{,-*}.{js,cjs,mjs,ts,tsx,jsx}",
          "**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}",
          "**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}",
          "**/__tests__/**",
          "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
          "**/vitest.{workspace,projects}.[jt]s?(on)",
          "**/.{eslint,mocha,prettier}rc.{js,cjs,yml}",
          "**/stories/**",
          "**/*.stories.{js,jsx,ts,tsx}",
        ],
      },
    },
  };
});

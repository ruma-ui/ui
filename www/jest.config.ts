import type { Config } from "jest";
const nextJest = require("next/jest.js").default ?? require("next/jest.js");

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  displayName: "www",
  preset: "../jest.preset.js",
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nx/react/plugins/jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../coverage/www",
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(config);

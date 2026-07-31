#!/usr/bin/env node

import { Command } from "commander";
import { runInit } from "./commands/init.js";
import { runAdd } from "./commands/add.js";

const program = new Command();

program
  .name("ruma-ui")
  .description("Enterprise-grade CLI for adding ruma-ui components to your React application")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize ruma-ui dependencies and configuration in your project")
  .option("-c, --cwd <path>", "working directory", process.cwd())
  .option("-y, --yes", "skip confirmation prompt and use defaults", false)
  .option("-t, --template <template>", "template to use for new projects (e.g. next)")
  .option("-n, --name <name>", "name of the new project to create")
  .action(async options => {
    await runInit(options);
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "the components to add")
  .option("-c, --cwd <path>", "working directory", process.cwd())
  .option("-o, --overwrite", "overwrite existing files", false)
  .action(async (components, options) => {
    if (!components || components.length === 0) {
      console.log(
        "Please specify components to add (e.g. `npx @ruma-org/cli add button card modal`)"
      );
      return;
    }
    await runAdd(components, options);
  });

program.parse();

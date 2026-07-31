import fs from "fs";
import path from "path";
import ora from "ora";
import prompts from "prompts";
import { execa } from "execa";

export interface InitOptions {
  cwd?: string;
  yes?: boolean;
  template?: string;
  name?: string;
}

export type PackageManager = "pnpm" | "bun" | "yarn" | "npm";

export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "bun.lockb")) || fs.existsSync(path.join(cwd, "bun.lock")))
    return "bun";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

export function detectCssFile(cwd: string): string {
  const candidates = [
    "src/app/globals.css",
    "app/globals.css",
    "src/styles/globals.css",
    "styles/globals.css",
    "src/index.css",
    "src/main.css",
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(cwd, candidate))) {
      return candidate;
    }
  }

  const isSrcDir = fs.existsSync(path.join(cwd, "src"));
  return isSrcDir ? "src/app/globals.css" : "app/globals.css";
}

export async function runInit(options: InitOptions) {
  let cwd = path.resolve(options.cwd || process.cwd());

  console.log("🚀 Initializing ruma-ui in " + cwd);

  let hasPackageJson = fs.existsSync(path.join(cwd, "package.json"));

  // 1. If no package.json exists, offer to scaffold a new Next.js project like shadcn
  if (!hasPackageJson) {
    let shouldCreateProject = options.yes || !!options.template;
    let projectName = options.name || "my-app";
    const template = options.template || "next";

    if (!options.yes && !options.template) {
      const createPrompt = await prompts([
        {
          type: "confirm",
          name: "shouldCreate",
          message: `No package.json found at ${cwd}.\n  Would you like to create a new Next.js project?`,
          initial: true,
        },
        {
          type: prev => (prev ? "text" : null),
          name: "projectName",
          message: "What is your project named?",
          initial: "my-app",
          format: (val: string) => val.trim(),
        },
      ]);

      shouldCreateProject = !!createPrompt.shouldCreate;
      if (createPrompt.projectName) {
        projectName = createPrompt.projectName;
      }
    }

    if (!shouldCreateProject) {
      console.log("❌ Initialization cancelled. No package.json found.");
      process.exit(1);
    }

    const pm = detectPackageManager(process.cwd());
    const projectPath = path.join(cwd, projectName);

    const scaffoldSpinner = ora(
      `Scaffolding new ${template.toUpperCase()} project in ${projectName}...`
    ).start();

    try {
      if (pm === "pnpm") {
        await execa(
          "pnpm",
          [
            "create",
            "next-app",
            projectName,
            "--typescript",
            "--tailwind",
            "--eslint",
            "--app",
            "--src-dir",
            "--import-alias",
            "@/*",
            "--no-git",
            "--use-pnpm",
          ],
          { cwd }
        );
      } else if (pm === "bun") {
        await execa(
          "bun",
          [
            "create",
            "next-app",
            projectName,
            "--typescript",
            "--tailwind",
            "--eslint",
            "--app",
            "--src-dir",
            "--import-alias",
            "@/*",
            "--no-git",
          ],
          { cwd }
        );
      } else if (pm === "yarn") {
        await execa(
          "yarn",
          [
            "create",
            "next-app",
            projectName,
            "--typescript",
            "--tailwind",
            "--eslint",
            "--app",
            "--src-dir",
            "--import-alias",
            "@/*",
            "--no-git",
          ],
          { cwd }
        );
      } else {
        await execa(
          "npx",
          [
            "create-next-app@latest",
            projectName,
            "--typescript",
            "--tailwind",
            "--eslint",
            "--app",
            "--src-dir",
            "--import-alias",
            "@/*",
            "--no-git",
            "--use-npm",
          ],
          { cwd }
        );
      }

      scaffoldSpinner.succeed(`Created Next.js project at ${projectName}`);
      cwd = projectPath;
      hasPackageJson = true;
    } catch (err) {
      scaffoldSpinner.fail(`Failed to create Next.js project: ${(err as Error).message}`);
      process.exit(1);
    }
  }

  // 2. Detect project configuration
  const detectedCss = detectCssFile(cwd);

  let componentsAlias = "@/components";
  let utilsAlias = "@/lib/utils";
  let cssPath = detectedCss;

  if (!options.yes) {
    const response = await prompts([
      {
        type: "text",
        name: "componentsAlias",
        message: "Configure the import alias for components:",
        initial: "@/components",
      },
      {
        type: "text",
        name: "utilsAlias",
        message: "Configure the import alias for utils:",
        initial: "@/lib/utils",
      },
      {
        type: "text",
        name: "cssPath",
        message: "Where is your global CSS file?",
        initial: detectedCss,
      },
    ]);

    componentsAlias = response.componentsAlias || componentsAlias;
    utilsAlias = response.utilsAlias || utilsAlias;
    cssPath = response.cssPath || cssPath;
  }

  const componentsConfig = {
    $schema: "https://ruma.5dev.in/schema.json",
    style: "default",
    tsx: true,
    tailwind: {
      css: cssPath,
      baseColor: "neutral",
      cssVariables: true,
    },
    aliases: {
      components: componentsAlias,
      utils: utilsAlias,
      ui: (componentsAlias || "@/components") + "/ui",
    },
  };

  const spinner = ora("Writing components.json...").start();
  const configPath = path.join(cwd, "components.json");
  fs.writeFileSync(configPath, JSON.stringify(componentsConfig, null, 2));
  spinner.succeed("components.json created successfully.");

  // 3. Ensure lib/utils.ts exists in target cwd
  const utilsRelativePath = utilsAlias.replace(/^@\//, "");
  const isSrcProject = fs.existsSync(path.join(cwd, "src"));

  let utilsFullPath: string;
  if (utilsRelativePath.startsWith("src/")) {
    utilsFullPath = path.join(cwd, utilsRelativePath + ".ts");
  } else if (isSrcProject && !fs.existsSync(path.join(cwd, utilsRelativePath + ".ts"))) {
    utilsFullPath = path.join(cwd, "src", utilsRelativePath + ".ts");
  } else {
    utilsFullPath = path.join(cwd, utilsRelativePath + ".ts");
  }

  if (!fs.existsSync(utilsFullPath)) {
    const utilsSpinner = ora("Creating utils helper...").start();
    fs.mkdirSync(path.dirname(utilsFullPath), { recursive: true });
    const cnContent = `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`;
    fs.writeFileSync(utilsFullPath, cnContent);
    utilsSpinner.succeed(`Created ${path.relative(cwd, utilsFullPath)}`);
  }

  // 4. Install required dependencies (clsx, tailwind-merge)
  const pm = detectPackageManager(cwd);
  const depsToInstall = ["clsx", "tailwind-merge"];
  const depsSpinner = ora(
    `Installing dependencies (${depsToInstall.join(", ")}) using ${pm}...`
  ).start();

  try {
    if (pm === "pnpm") {
      await execa("pnpm", ["add", ...depsToInstall], { cwd });
    } else if (pm === "bun") {
      await execa("bun", ["add", ...depsToInstall], { cwd });
    } else if (pm === "yarn") {
      await execa("yarn", ["add", ...depsToInstall], { cwd });
    } else {
      await execa("npm", ["install", ...depsToInstall], { cwd });
    }
    depsSpinner.succeed(`Dependencies installed successfully.`);
  } catch {
    depsSpinner.warn(
      `Could not automatically install dependencies. Please run manually: ${pm} add ${depsToInstall.join(" ")}`
    );
  }

  console.log("\n🎉 ruma-ui initialized! You can now add components using:");
  console.log("   npx @ruma-org/cli add button\n");
}

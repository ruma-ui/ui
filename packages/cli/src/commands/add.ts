import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
import { execa } from "execa";
import type { RegistryItem } from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface AddOptions {
  cwd?: string;
  overwrite?: boolean;
}

export async function runAdd(components: string[], options: AddOptions) {
  const cwd = path.resolve(options.cwd || process.cwd());
  const configPath = path.join(cwd, "components.json");

  if (!fs.existsSync(configPath)) {
    console.error("❌ components.json not found. Please run `npx @ruma-ui/cli init` first.");
    process.exit(1);
  }

  const rawConfig = fs.readFileSync(configPath, "utf-8");
  const config = JSON.parse(rawConfig);

  for (const name of components) {
    const compLower = name.toLowerCase();
    const spinner = ora(`Fetching ${compLower} from registry...`).start();

    let registryItem: RegistryItem | null = null;

    // Check candidate local workspace registry paths
    const candidateLocalPaths = [
      path.join(cwd, "dist/registry", `${compLower}.json`),
      path.join(cwd, "www/public/r", `${compLower}.json`),
      path.resolve(__dirname, "../../../dist/registry", `${compLower}.json`),
      path.resolve(__dirname, "../../../www/public/r", `${compLower}.json`),
      path.resolve(__dirname, "../../dist/registry", `${compLower}.json`),
      path.resolve(__dirname, "../../www/public/r", `${compLower}.json`),
      path.resolve(__dirname, "../dist/registry", `${compLower}.json`),
      path.resolve(__dirname, "../www/public/r", `${compLower}.json`),
    ];

    for (const p of candidateLocalPaths) {
      if (fs.existsSync(p)) {
        registryItem = JSON.parse(fs.readFileSync(p, "utf-8"));
        break;
      }
    }

    // Fallback to online registry fetch if not found locally
    if (!registryItem) {
      try {
        const res = await fetch(`https://ruma.5dev.in/r/${compLower}.json`);
        if (res.ok) {
          registryItem = (await res.json()) as RegistryItem;
        }
      } catch {
        // ignore
      }
    }

    if (!registryItem) {
      spinner.fail(`Component "${compLower}" not found in registry.`);
      continue;
    }

    spinner.text = `Installing ${compLower}...`;

    // Process & write files
    const uiAlias = config.aliases?.ui || "@/components/ui";
    const targetDir = path.join(cwd, uiAlias.replace(/^@\//, "src/"));

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    if (registryItem.files) {
      for (const file of registryItem.files) {
        const fileName = path.basename(file.path);
        const destPath = path.join(targetDir, fileName);

        let content = file.content || "";
        // Remap aliases according to user's components.json configuration
        content = content.replace(/@\/components\/ui/g, config.aliases?.ui || "@/components/ui");
        content = content.replace(/@\/lib\/utils/g, config.aliases?.utils || "@/lib/utils");

        fs.writeFileSync(destPath, content);
      }
    }

    // Install package dependencies if any
    if (registryItem.dependencies && registryItem.dependencies.length > 0) {
      spinner.text = `Installing dependencies (${registryItem.dependencies.join(", ")})...`;
      try {
        await execa("npm", ["install", ...registryItem.dependencies], { cwd });
      } catch {
        // fallback
      }
    }

    spinner.succeed(`Added ${registryItem.title || registryItem.name} to ${uiAlias}`);
  }
}

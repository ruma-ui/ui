import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const componentsDir = path.join(rootDir, "ui", "src", "components");
const utilsDir = path.join(rootDir, "ui", "src", "lib", "utils");
const outputDir = path.join(rootDir, "www", "public", "r");
const distRegistryDir = path.join(rootDir, "dist", "registry");

// Ensure target output directories exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(distRegistryDir)) {
  fs.mkdirSync(distRegistryDir, { recursive: true });
}

interface RegistryFile {
  path: string;
  type: string;
  content: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

function getDependenciesFromContent(content: string): string[] {
  const deps = new Set<string>();
  if (content.includes("clsx") || content.includes("tailwind-merge")) {
    deps.add("clsx");
    deps.add("tailwind-merge");
  }
  if (content.includes("react-icons")) {
    deps.add("react-icons");
  }
  if (content.includes("date-fns")) {
    deps.add("date-fns");
  }
  if (content.includes("tw-animate-css")) {
    deps.add("tw-animate-css");
  }
  return Array.from(deps);
}

function buildRegistry() {
  console.log("🔨 Building @ruma-kit registry...");

  const registryItems: RegistryItem[] = [];

  // 1. Add Utils (`registry:lib`)
  const cnPath = path.join(utilsDir, "cn.ts");
  const twPath = path.join(utilsDir, "tw.ts");
  if (fs.existsSync(cnPath)) {
    const cnContent = fs.readFileSync(cnPath, "utf-8");
    const twContent = fs.existsSync(twPath) ? fs.readFileSync(twPath, "utf-8") : "";
    const combinedContent = `${cnContent.trim()}\n\n${twContent.trim()}\n`;
    const utilsItem: RegistryItem = {
      name: "utils",
      type: "registry:lib",
      title: "Utility Functions",
      description: "cn class merger and tw helper utility functions",
      dependencies: ["clsx", "tailwind-merge"],
      files: [
        {
          path: "lib/utils.ts",
          type: "registry:lib",
          content: combinedContent,
        },
      ],
    };
    registryItems.push(utilsItem);
  }

  // 2. Scan component folders in `ui/src/components`
  if (fs.existsSync(componentsDir)) {
    const entries = fs.readdirSync(componentsDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const compName = entry.name;
      const compLower = compName.toLowerCase();
      const compFolderPath = path.join(componentsDir, compName);

      const filesInFolder = fs.readdirSync(compFolderPath);
      const tsxFiles = filesInFolder.filter(
        f => f.endsWith(".tsx") && !f.endsWith(".stories.tsx") && !f.endsWith(".test.tsx")
      );

      if (tsxFiles.length === 0) continue;

      const files: RegistryFile[] = [];
      let combinedContent = "";
      const registryDeps = new Set<string>();

      // Automatically require `utils` registry dependency
      registryDeps.add("utils");

      for (const file of tsxFiles) {
        const filePath = path.join(compFolderPath, file);
        let content = fs.readFileSync(filePath, "utf-8");

        // Clean up relative import paths to match user's aliases (@/lib/utils)
        content = content.replace(/(\.\.\/)+lib\/utils/g, "@/lib/utils");
        content = content.replace(
          /from ["'](\.\.\/)+([A-Za-z0-9_-]+)(\/[A-Za-z0-9_-]+)?["']/g,
          (_match, _p1, comp) => {
            if (comp.toLowerCase() !== "lib" && comp.toLowerCase() !== "utils") {
              registryDeps.add(comp.toLowerCase());
            }
            return `from "@/components/ui/${comp.toLowerCase()}"`;
          }
        );

        combinedContent += content + "\n";

        files.push({
          path: `components/ui/${file.toLowerCase()}`,
          type: "registry:ui",
          content,
        });
      }

      const dependencies = getDependenciesFromContent(combinedContent);

      const registryItem: RegistryItem = {
        name: compLower,
        type: "registry:ui",
        title: compName,
        description: `Production-ready ${compName} component for @ruma-kit`,
        dependencies,
        registryDependencies: Array.from(registryDeps),
        files,
      };

      registryItems.push(registryItem);

      // Write individual component registry JSON file
      const compJsonPath = path.join(outputDir, `${compLower}.json`);
      const distCompJsonPath = path.join(distRegistryDir, `${compLower}.json`);
      const jsonContent = JSON.stringify(registryItem, null, 2);

      fs.writeFileSync(compJsonPath, jsonContent);
      fs.writeFileSync(distCompJsonPath, jsonContent);
    }
  }

  // 3. Write index.json
  const indexPath = path.join(outputDir, "index.json");
  const distIndexPath = path.join(distRegistryDir, "index.json");
  const indexContent = JSON.stringify(registryItems, null, 2);

  fs.writeFileSync(indexPath, indexContent);
  fs.writeFileSync(distIndexPath, indexContent);

  console.log(`✅ Registry built successfully! Total components: ${registryItems.length}`);
  console.log(`📁 Output locations:`);
  console.log(`   - ${outputDir}`);
  console.log(`   - ${distRegistryDir}`);
}

buildRegistry();

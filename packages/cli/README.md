<div align="center">

<img src="../../logo.png" alt="Ruma UI" width="70" height="70" />

# @ruma-kit/cli

**The official CLI for Ruma UI** — scaffold projects, initialise configuration, and add components to your React application in one command.

[![npm version](https://img.shields.io/npm/v/@ruma-kit/cli?style=flat-square&color=6366f1)](https://www.npmjs.com/package/@ruma-kit/cli)
[![npm downloads](https://img.shields.io/npm/dm/@ruma-kit/cli?style=flat-square&color=6366f1)](https://www.npmjs.com/package/@ruma-kit/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[Documentation](https://ruma.5dev.in/docs/cli) · [npm](https://www.npmjs.com/package/@ruma-kit/cli) · [GitHub](https://github.com/ruma-ui/ui)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Usage (no install needed)](#usage-no-install-needed)
- [Commands](#commands)
  - [`init`](#init)
  - [`add`](#add)
- [components.json Schema](#componentsjson-schema)
- [Package Manager Detection](#package-manager-detection)
- [Supported Frameworks](#supported-frameworks)
- [Registry](#registry)
- [Contributing](#contributing)

---

## Overview

`@ruma-kit/cli` is a zero-config CLI that brings the Ruma UI component library into any React project:

1. **`init`** — detect your framework, configure aliases, create `components.json`, install utilities
2. **`add`** — pull individual components from the Ruma registry directly into your source tree

Components are copied as source files (not imported from npm), giving you full ownership and customisability — similar to [shadcn/ui](https://ui.shadcn.com/).

> The npm package `@ruma-kit/ui` contains the pre-built, tree-shakeable version of the library. The CLI is the alternative "copy-into-your-project" approach — use whichever fits your workflow.

---

## Usage (no install needed)

Run without installing using `npx`:

```bash
npx @ruma-kit/cli <command> [options]
```

Or install globally:

```bash
npm install -g @ruma-kit/cli
ruma-ui <command> [options]
```

---

## Commands

### `init`

Initialises Ruma UI in your project. Run this once per project.

```bash
npx @ruma-kit/cli init [options]
```

#### What it does

1. Detects whether a `package.json` exists
2. If not — optionally scaffolds a **new Next.js project** for you
3. Prompts you to configure path aliases (or uses sensible defaults with `--yes`)
4. Creates `components.json` at the project root
5. Generates `lib/utils.ts` with the `cn()` helper
6. Installs `clsx` and `tailwind-merge` using your detected package manager

#### Options

| Flag                | Alias | Type      | Default         | Description                                                    |
| ------------------- | ----- | --------- | --------------- | -------------------------------------------------------------- |
| `--cwd <path>`      | `-c`  | `string`  | `process.cwd()` | Working directory to initialise in                             |
| `--yes`             | `-y`  | `boolean` | `false`         | Skip all prompts and use defaults                              |
| `--template <name>` | `-t`  | `string`  | `"next"`        | Template to scaffold when no project exists (`next` supported) |
| `--name <name>`     | `-n`  | `string`  | `"my-app"`      | Name for the new scaffolded project directory                  |

#### Examples

```bash
# Interactive — asks alias and CSS file questions
npx @ruma-kit/cli init

# Non-interactive — uses all defaults instantly
npx @ruma-kit/cli init --yes

# Scaffold a brand-new Next.js app called "my-dashboard" and initialise
npx @ruma-kit/cli init --template next --name my-dashboard --yes

# Initialise inside a specific directory
npx @ruma-kit/cli init --cwd ./apps/web
```

#### Interactive Prompts

When run without `--yes`, `init` asks:

```
? Configure the import alias for components: › @/components
? Configure the import alias for utils:      › @/lib/utils
? Where is your global CSS file?             › src/app/globals.css
```

#### Output

```
🚀 Initializing ruma-ui in /your/project
✔ components.json created successfully.
✔ Created src/lib/utils.ts
✔ Dependencies installed successfully.

🎉 ruma-ui initialized! You can now add components using:
   npx @ruma-kit/cli add button
```

---

### `add`

Adds one or more Ruma UI components to your project by fetching them from the registry.

```bash
npx @ruma-kit/cli add [components...] [options]
```

#### What it does

1. Reads `components.json` to determine target directory
2. Fetches the component definition from the registry (local or remote)
3. Writes component source files to your configured `aliases.ui` directory
4. Remaps internal imports to match your configured aliases
5. Installs any additional package dependencies the component requires

#### Arguments

| Argument          | Description                                    |
| ----------------- | ---------------------------------------------- |
| `[components...]` | One or more component names (case-insensitive) |

#### Options

| Flag           | Alias | Type      | Default         | Description                                        |
| -------------- | ----- | --------- | --------------- | -------------------------------------------------- |
| `--cwd <path>` | `-c`  | `string`  | `process.cwd()` | Working directory (must contain `components.json`) |
| `--overwrite`  | `-o`  | `boolean` | `false`         | Overwrite existing component files                 |

#### Examples

```bash
# Add a single component
npx @ruma-kit/cli add button

# Add multiple components at once
npx @ruma-kit/cli add button card modal toast

# Overwrite existing files
npx @ruma-kit/cli add button --overwrite

# Add components to a specific directory
npx @ruma-kit/cli add table --cwd ./apps/dashboard
```

#### Available Components

All 49 components from `@ruma-kit/ui` are available via `add`:

```
accordion    alert        avatar       badge        breadcrumb
button       calendar     card         carousel     checkbox
clipboard    contextmenu  datepicker   drawer       dropdown
editable     fileupload   fab          form         image
inputotp     keyboardkey  link         loader       modal
multiselect  navmenu      pagination   popover      progress
radiogroup   rangeinput   rating       resizable    select
skeleton     slider       sortablelist stepper      switch
table        tabs         textarea     textinput    toast
tooltip      toploader    treeview     video
```

#### Output

```
⠸ Fetching button from registry...
✔ Added Button to @/components/ui

⠸ Fetching modal from registry...
✔ Added Modal to @/components/ui

⠸ Fetching table from registry...
⠸ Installing dependencies (react-table)...
✔ Added Table to @/components/ui
```

---

## `components.json` Schema

The `components.json` file at your project root configures how the CLI discovers and places components.

```json
{
  "$schema": "https://ruma.5dev.in/schema.json",
  "style": "default",
  "tsx": true,
  "tailwind": {
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

### Fields

| Field                   | Type        | Description                                                                |
| ----------------------- | ----------- | -------------------------------------------------------------------------- |
| `$schema`               | `string`    | JSON Schema URL for editor autocompletion                                  |
| `style`                 | `"default"` | Component style variant (only `"default"` is currently available)          |
| `tsx`                   | `boolean`   | Whether to use `.tsx` (default) or `.jsx` file extension                   |
| `tailwind.css`          | `string`    | Path to your global CSS file (relative to project root)                    |
| `tailwind.baseColor`    | `string`    | Base colour palette: `"neutral"`, `"slate"`, `"zinc"`, `"stone"`, `"gray"` |
| `tailwind.cssVariables` | `boolean`   | Use CSS custom properties for theming (`true` recommended)                 |
| `aliases.components`    | `string`    | TypeScript path alias for your components directory                        |
| `aliases.utils`         | `string`    | TypeScript path alias for the `cn()` utility                               |
| `aliases.ui`            | `string`    | TypeScript path alias where Ruma UI components are placed                  |

---

## Package Manager Detection

The CLI automatically detects which package manager your project uses:

| Lock file                      | Detected manager |
| ------------------------------ | ---------------- |
| `pnpm-lock.yaml`               | `pnpm`           |
| `bun.lockb` / `bun.lock`       | `bun`            |
| `yarn.lock`                    | `yarn`           |
| _(none / `package-lock.json`)_ | `npm`            |

Detection is based on the lock file present in the working directory (or `process.cwd()` when none is specified).

---

## Supported Frameworks

| Framework                  | `init` support | Notes                                           |
| -------------------------- | -------------- | ----------------------------------------------- |
| **Next.js** (App Router)   | ✅ Full        | Scaffolding + auto CSS detection                |
| **Next.js** (Pages Router) | ✅ Full        | CSS detection targets `styles/globals.css`      |
| **Vite + React**           | ✅ Full        | CSS detection targets `src/index.css`           |
| **Create React App**       | ✅ Full        | CSS detection targets `src/index.css`           |
| **Remix**                  | ✅ Full        | Manual CSS link still required in `root.tsx`    |
| **Astro**                  | ⚠️ Partial     | Works for React islands; no scaffolding support |
| **Expo (React Native)**    | ❌             | Web-only library                                |

---

## Registry

Components are fetched from the Ruma UI component registry at:

```
https://ruma.5dev.in/r/<component-name>.json
```

Each registry entry contains:

```json
{
  "name": "button",
  "title": "Button",
  "description": "A versatile button component with multiple variants and sizes.",
  "files": [
    {
      "path": "components/Button/Button.tsx",
      "content": "..."
    }
  ],
  "dependencies": ["@radix-ui/react-slot"],
  "devDependencies": []
}
```

The CLI first checks for a local registry (useful in monorepo setups) before falling back to the remote registry:

1. `dist/registry/<name>.json` (local build)
2. `www/public/r/<name>.json` (local dev server)
3. `https://ruma.5dev.in/r/<name>.json` (remote CDN)

---

## Contributing

See the monorepo [CONTRIBUTING.md](../../CONTRIBUTING.md) for full guidelines.

```bash
# Clone and set up
git clone https://github.com/ruma-ui/ui.git
cd ui
pnpm install

# Work on the CLI
cd packages/cli
pnpm dev          # watch mode rebuild
```

---

## License

MIT © [Ruma UI](https://github.com/ruma-ui)

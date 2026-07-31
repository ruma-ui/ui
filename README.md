<div align="center">

<img src="./logo.png" alt="Ruma UI" width="70" height="70" />

# Ruma UI

**A modern, production-ready React UI component library and ecosystem**  
built with TypeScript, Tailwind CSS v4, and enterprise CI/CD.

[![CI](https://img.shields.io/github/actions/workflow/status/ruma-ui/ui/ci.yml?branch=dev&style=flat-square&label=CI)](https://github.com/ruma-ui/ui/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@ruma-kit/ui?style=flat-square&color=6366f1&label=%40rumaui%2Fui)](https://www.npmjs.com/package/@ruma-kit/ui)
[![CLI version](https://img.shields.io/npm/v/@ruma-kit/cli?style=flat-square&color=8b5cf6&label=%40rumaui%2Fcli)](https://www.npmjs.com/package/@ruma-kit/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

[Documentation](https://ruma.5dev.in) · [Storybook](https://storybook.ruma.5dev.in) · [npm](https://www.npmjs.com/package/@ruma-kit/ui) · [Changelog](CHANGELOG.md)

</div>

---

## Packages

This is an [Nx](https://nx.dev)-managed monorepo. It contains two published packages:

| Package                            | Version                                                                                                         | Description                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`@ruma-kit/ui`](./ui/)            | [![npm](https://img.shields.io/npm/v/@ruma-kit/ui?style=flat-square)](https://npmjs.com/package/@ruma-kit/ui)   | Pre-built, tree-shakeable React component library (49 components) |
| [`@ruma-kit/cli`](./packages/cli/) | [![npm](https://img.shields.io/npm/v/@ruma-kit/cli?style=flat-square)](https://npmjs.com/package/@ruma-kit/cli) | CLI to initialise and add components to your project              |

### Which should I use?

| Approach              | Package         | Best for                                           |
| --------------------- | --------------- | -------------------------------------------------- |
| **Import from npm**   | `@ruma-kit/ui`  | Quick integration, auto-updates, minimal setup     |
| **Copy into project** | `@ruma-kit/cli` | Full control, customisation, shadcn-style workflow |

Both approaches can be used together.

---

## Quick Start

### Option A — Import from npm

```bash
npm install @ruma-kit/ui
```

```tsx
import { Button } from "@ruma-kit/ui";
import "@ruma-kit/ui/ui.css";

export default function App() {
  return <Button size="lg">Hello Ruma UI</Button>;
}
```

### Option B — Add components via CLI

```bash
npx @ruma-kit/cli init
npx @ruma-kit/cli add button modal toast
```

---

## Monorepo Structure

```text
ruma-ui/ui
├── ui/                     # @ruma-kit/ui — main component library
│   ├── src/
│   │   ├── components/     # 49 React components
│   │   ├── lib/            # Shared utilities (cn, etc.)
│   │   ├── styles/         # Global CSS & design tokens
│   │   └── registry/       # Component registry definitions
│   └── .storybook/         # Storybook configuration
│
├── packages/
│   └── cli/                # @ruma-kit/cli — CLI tool
│       └── src/
│           ├── commands/   # init.ts, add.ts
│           └── index.ts
│
├── demo/                   # Interactive demo application
├── www/                    # Documentation website
├── scripts/                # Build & registry generation scripts
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # Lint, typecheck, test, build
│       ├── release.yml          # Semantic release (alpha/beta/rc/stable)
│       ├── branch-merge.yml     # Controlled branch promotion
│       ├── deploy-storybook-*.yml
│       ├── codeql.yml
│       └── changeset-version.yml
│
├── nx.json                 # Nx workspace configuration
├── pnpm-workspace.yaml     # pnpm workspace definition
└── .releaserc.js           # semantic-release configuration
```

---

## Development Setup

### Prerequisites

| Tool    | Version                                         |
| ------- | ----------------------------------------------- |
| Node.js | `≥ 18` (`.nvmrc` provided — use `nvm use`)      |
| pnpm    | `10.18.1` (enforced via `packageManager` field) |

### Getting Started

```bash
# 1. Clone
git clone https://github.com/ruma-ui/ui.git
cd ui

# 2. Install all workspace dependencies
pnpm install

# 3. Start development
pnpm storybook      # Component dev environment  →  http://localhost:6006
pnpm dev:demo       # Demo app                  →  http://localhost:3000
pnpm dev:website    # Documentation website     →  http://localhost:3001
```

### Available Scripts

| Script                  | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `pnpm dev`              | Start all dev servers in parallel              |
| `pnpm build`            | Build all packages                             |
| `pnpm build:production` | Production build (sets `NODE_ENV=production`)  |
| `pnpm test`             | Run all unit tests                             |
| `pnpm test:watch`       | Tests in watch mode                            |
| `pnpm test:coverage`    | Tests with coverage report                     |
| `pnpm lint`             | Run ESLint across the workspace                |
| `pnpm lint:fix`         | Auto-fix lint issues                           |
| `pnpm typecheck`        | Run TypeScript type-checking                   |
| `pnpm format`           | Format all files with Prettier                 |
| `pnpm format:check`     | Check formatting without writing               |
| `pnpm storybook`        | Start Storybook dev server                     |
| `pnpm validate`         | Full pipeline: lint + typecheck + test + build |
| `pnpm size`             | Check bundle size limits                       |
| `pnpm changeset`        | Create a new changeset entry                   |
| `pnpm clean`            | Reset Nx cache and remove `dist/`              |

---

## Branch Strategy & Release Process

This project uses a **promotion-based branch model** with fully automated releases via [semantic-release](https://semantic-release.gitbook.io/).

### Branches

| Branch  | Channel     | npm tag  | Purpose                                |
| ------- | ----------- | -------- | -------------------------------------- |
| `dev`   | —           | —        | Active development, all PRs merge here |
| `alpha` | Pre-release | `alpha`  | Early testing builds                   |
| `beta`  | Pre-release | `beta`   | Feature-complete pre-release           |
| `rc`    | Pre-release | `rc`     | Release candidate — no new features    |
| `main`  | Stable      | `latest` | Production releases                    |

### Release Flow

```
dev  →  alpha  →  beta  →  rc  →  main
         ↓          ↓        ↓       ↓
    1.0.0-alpha  1.0.0-beta 1.0.0-rc  1.0.0
```

- **Prereleases** (`alpha`, `beta`) trigger automatically on push
- **Stable** (`rc`, `main`) use the `changesets/action` workflow with a PR-based review gate
- Branch promotions are performed via the **Branch Merge Pipeline** (`workflow_dispatch`)

### Commit Convention

Releases are version-bumped automatically based on [Conventional Commits](https://conventionalcommits.org/):

| Commit prefix                                            | Release type | Example                         |
| -------------------------------------------------------- | ------------ | ------------------------------- |
| `feat:`                                                  | minor        | `feat: add Resizable component` |
| `fix:`                                                   | patch        | `fix: modal close on ESC`       |
| `docs:`                                                  | patch        | `docs: update Button examples`  |
| `refactor:`, `perf:`, `style:`, `test:`, `build:`, `ci:` | patch        | —                               |
| `chore:`                                                 | _no release_ | `chore: update deps`            |
| `feat!:` / `BREAKING CHANGE:`                            | major        | —                               |

> See [COMMIT_GUIDE.md](COMMIT_GUIDE.md) for full commit message guidelines.

---

## Contributing

We welcome all contributions — bug fixes, new components, documentation improvements, and more.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

### Quick Contribution Workflow

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/ui.git
cd ui && pnpm install

# 2. Create a branch off dev
git checkout dev
git checkout -b feat/my-improvement

# 3. Make changes, then validate
pnpm validate

# 4. Commit with conventional format
git commit -m "feat: add amazing improvement"

# 5. Push and open a PR targeting dev
git push origin feat/my-improvement
```

### Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md).

---

## Security

Please do not report security vulnerabilities through public GitHub issues. See [SECURITY.md](SECURITY.md) for our responsible disclosure policy.

---

## License

MIT © [Ruma UI](https://github.com/ruma-ui)

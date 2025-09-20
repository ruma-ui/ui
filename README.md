# @ruma-ui/ui

A modern, production-ready React UI component library built with TypeScript, Tailwind CSS, and Nx.

[![CI](https://github.com/ruma-ui/ui/actions/workflows/ci.yml/badge.svg)](https://github.com/ruma-ui/ui/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/%40ruma-ui%2Fui.svg)](https://badge.fury.io/js/%40ruma-ui%2Fui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Modern Design**: Clean, minimalist components with Tailwind CSS
- 📱 **Responsive**: Mobile-first responsive design principles
- ♿ **Accessible**: WCAG 2.1 AA compliant components
- 🔧 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 📚 **Storybook**: Interactive component documentation and playground
- 🧪 **Well Tested**: Comprehensive test coverage with Jest and Testing Library
- 📦 **Tree Shakeable**: Optimized bundle size with ES modules
- 🎯 **Developer Experience**: Excellent IDE support and developer tools

## Quick Start

### Installation

```bash
npm install @ruma-ui/ui
# or
pnpm add @ruma-ui/ui
# or
yarn add @ruma-ui/ui
```

### Usage

```tsx
import { Button, Card } from "@ruma-ui/ui";

function App() {
  return (
    <Card>
      <Button variant='primary' size='lg'>
        Get Started
      </Button>
    </Card>
  );
}
```

## Development

This project uses [Nx](https://nx.dev) for development and build tooling.

### Prerequisites

- Node.js 18+
- pnpm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/ruma-ui/ui.git
cd ui

# Install dependencies
pnpm install

# Start development
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start development servers for all projects
- `pnpm build` - Build all projects
- `pnpm test` - Run all tests
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm storybook` - Start Storybook development server
- `pnpm docs:api` - Generate API documentation
- `pnpm size` - Check bundle size limits
- `pnpm validate` - Run full validation pipeline (lint, typecheck, test, build)

### Project Structure

```text
├── ui/              # Main UI library
├── demo/            # Demo application
├── website/         # Documentation website
└── docs/            # Generated documentation
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add/update tests as needed
5. Run the validation pipeline: `pnpm validate`
6. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
7. Push to your fork and create a pull request

### Commit Convention

This project uses [Conventional Commits](https://conventionalcommits.org/) for automated versioning and changelog generation.

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Other changes (build, dependencies, etc.)

## Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

1. Create a changeset: `pnpm changeset`
2. Commit the changeset file
3. The release workflow will automatically create a PR with version bumps
4. Merge the PR to publish to npm

## License

MIT © [Ruma UI](https://github.com/ruma-ui)

## Links

- [Documentation](https://ruma-ui.github.io/ui/)
- [Storybook](https://ruma-ui.github.io/ui/storybook/)
- [NPM Package](https://www.npmjs.com/package/@ruma-ui/ui)
- [GitHub Repository](https://github.com/ruma-ui/ui)

---

![Nx Logo](https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png)

✨ **Built with [Nx](https://nx.dev)** ✨

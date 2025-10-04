# Contributing to @ruma/ui

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### 1. Fork & Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/ui.git
cd ui
pnpm install
```

### 2. Development Setup

```bash
# Start development servers
pnpm dev

# Run validation
pnpm validate

# Build the project
pnpm build
```

### 3. Making Changes

1. Create a branch from `dev` (our default branch):

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/my-new-feature
   ```

2. Make your changes following our coding standards

3. Write or update tests for your changes

4. Run the validation pipeline:

   ```bash
   pnpm validate
   ```

5. Commit your changes using conventional commits:
   ```bash
   git commit -m "feat: add amazing new component"
   ```

### 4. Pull Request Process

1. Push your branch to your fork
2. Create a Pull Request against the `dev` branch (not main!)
3. Fill out the PR template completely
4. Ensure all checks pass
5. Request review from maintainers

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment, ensuring code quality, security, and reliability across all supported branches. The CI pipeline is designed following industry best practices for scaled open source projects.

### Pipeline Overview

The CI workflow automatically runs on:

- **Push events** to branches: `dev`, `alpha`, `beta`, `rc`, `main`
- **Pull request events** targeting these branches

### Concurrency Control

To optimize resource usage and prevent redundant runs, the pipeline uses concurrency groups that cancel in-progress runs when new commits are pushed to the same branch.

### Jobs and Checks

The pipeline consists of the following jobs, running conditionally based on file changes:

1. **Changes Detection** (`changes`)
   - Analyzes modified files to determine which subsequent jobs should run
   - Uses path filtering to skip unnecessary checks for documentation-only changes

2. **Setup** (`setup`)
   - Installs dependencies using pnpm with frozen lockfile
   - Configures Node.js 20 and caching for pnpm store, Nx cache, and node_modules
   - Initializes Nx Cloud for distributed task execution

3. **Linting** (`lint`)
   - Runs ESLint across the codebase
   - Ensures consistent code style and catches potential issues

4. **Type Checking** (`typecheck`)
   - Performs TypeScript compilation checks
   - Validates type safety across all projects

5. **Security Scanning** (`security`)
   - Runs `pnpm audit` for dependency vulnerabilities
   - Performs dependency review on pull requests to detect security issues
   - Continues on error to avoid blocking development for non-critical issues

6. **Testing** (`test`)
   - Executes unit tests using Jest/Vitest
   - Runs across all affected projects in the monorepo

7. **Build** (`build`)
   - Builds all affected projects
   - Generates documentation
   - Performs bundle size checks
   - Applies Nx Cloud CI optimizations and fixes

8. **Failure Notification** (`notify-failure`)
   - Creates GitHub issues when CI fails
   - Includes details about which jobs failed and links to workflow runs

### Branch Protection

All release branches have required status checks:

- Linting must pass
- Type checking must pass
- Security scans must complete
- Tests must pass
- Build must succeed

Pull requests cannot be merged until all required checks pass.

### Caching Strategy

The pipeline implements multi-layer caching for performance:

- **pnpm Store Cache**: Caches downloaded packages
- **Nx Cache**: Speeds up task execution through computation caching
- **Node Modules Cache**: Avoids reinstallation when lockfile hasn't changed

### Nx Cloud Integration

We use Nx Cloud for enhanced CI performance:

- **Remote Caching**: Shares computation results across runs
- **Distributed Execution**: Parallelizes tasks across multiple agents
- **Performance Insights**: Provides detailed build analytics

### Troubleshooting CI Failures

If CI fails on your pull request:

1. **Check the Actions Tab**: Review the detailed logs for each failed job
2. **Run Locally First**: Reproduce issues locally before pushing fixes:

   ```bash
   pnpm validate  # Runs lint, typecheck, test, build
   ```

3. **Common Issues**:
   - **Lint Errors**: Run `pnpm run lint` and fix code style issues
   - **Type Errors**: Run `pnpm run typecheck` and resolve TypeScript issues
   - **Test Failures**: Run `pnpm run test` and debug failing tests
   - **Build Failures**: Run `pnpm run build` and check for compilation errors
   - **Security Issues**: Review dependency vulnerabilities and update packages
4. **Push Fixes**: Commit and push your changes to trigger a new CI run
5. **Request Help**: If issues persist, mention maintainers in your PR

### Performance Optimization

The pipeline is optimized for speed and cost-efficiency:

- **Conditional Execution**: Jobs only run when relevant files change
- **Intelligent Caching**: Minimizes redundant work
- **Parallel Execution**: Multiple jobs run simultaneously where possible
- **Early Failure Detection**: Fast feedback on linting and type errors

### Contributing to CI

When making changes that affect CI:

- Update `.github/workflows/ci.yml` for workflow changes
- Test workflow changes on a feature branch first
- Ensure new jobs follow the established patterns
- Update this documentation if adding new checks or processes

## Release Pipeline & Branch Strategy

We use a **5-branch strategy** for controlled releases:

### Branch Hierarchy

```text
dev (default) → alpha → beta → rc → main
```

| Branch  | Purpose                  | Release Type | NPM Tag   |
| ------- | ------------------------ | ------------ | --------- |
| `dev`   | Active development       | No release   | -         |
| `alpha` | Experimental features    | Pre-release  | `@alpha`  |
| `beta`  | Feature-complete testing | Pre-release  | `@beta`   |
| `rc`    | Release candidates       | Pre-release  | `@rc`     |
| `main`  | Stable production        | Stable       | `@latest` |

### Release Flow

1. **Development**: All feature branches merge into `dev`
2. **Alpha Release**: `dev` → `alpha` triggers automatic pre-release (`1.0.0-alpha.1`)
3. **Beta Release**: `alpha` → `beta` triggers automatic pre-release (`1.0.0-beta.1`)
4. **Release Candidate**: `beta` → `rc` triggers automatic pre-release (`1.0.0-rc.1`)
5. **Stable Release**: `rc` → `main` triggers manual approval for stable release (`1.0.0`)

### Branch Permissions

- **dev**: 1 review required, allows force pushes (development flexibility)
- **alpha**: 1 review required, no force pushes
- **beta**: 1 review required, no force pushes
- **rc**: 2 reviews required, no force pushes (release candidate quality)
- **main**: 2 reviews required, no force pushes, no deletions (production protection)

### Using the Release Pipeline

#### For Contributors

- Always branch from and PR to `dev`
- Follow conventional commits for automated changelog generation

#### For Maintainers

- Use GitHub Actions workflows for branch merging:
  - **Branch Merge Pipeline**: Automated merging between release branches
  - **Version Bump**: Manually bump versions when needed
  - **Release Pipeline**: Automated publishing to NPM

#### Manual Branch Operations

```bash
# Merge dev to alpha (for alpha release)
git checkout alpha
git pull origin alpha
git merge dev --no-ff
git push origin alpha

# This triggers automatic alpha release: 1.0.0-alpha.X
```

### Version Strategy

- **Development**: `0.1.0-dev.X` (not published)
- **Alpha**: `0.1.0-alpha.X` (experimental, may have breaking changes)
- **Beta**: `0.1.0-beta.X` (feature-complete, API stable)
- **RC**: `0.1.0-rc.X` (production-ready, final testing)
- **Stable**: `0.1.0` (production release)

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Prefer interfaces over types for object shapes
- Use strict typing, avoid `any`
- Export types alongside components

### React Components

- Use functional components with hooks
- Prefer composition over inheritance
- Follow the compound component pattern when appropriate
- Use forwardRef for components that should accept refs

### Styling

- Use Tailwind CSS for styling
- Follow the utility-first approach
- Use CSS variables for theme customization
- Ensure responsive design

### Testing

- Write tests for all components
- Test user interactions, not implementation details
- Use Testing Library best practices
- Aim for high test coverage

### Documentation

- Document all props with JSDoc comments
- Include usage examples in Storybook
- Update README.md for new features
- Write clear commit messages

## Commit Convention

This project uses [Conventional Commits](https://conventionalcommits.org/) for automated versioning and changelog generation.

### Format

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples

```bash
# Feature
git commit -m "feat: add Button component with variants"
git commit -m "feat(button): add loading state"

# Bug fix
git commit -m "fix: resolve hover state issue in Button"
git commit -m "fix(modal): prevent scroll when modal is open"

# Breaking change
git commit -m "feat!: redesign Button API for better customization"

# With body and footer
git commit -m "feat: add new theming system

This introduces a comprehensive theming system that allows
for complete customization of component appearance.

BREAKING CHANGE: The old \`color\` prop has been replaced with \`variant\`"
```

## Component Development Guidelines

### 1. Component Structure

```tsx
// ComponentName.tsx
import React from "react";
import { cn } from "@ruma-ui/ui";

export interface ComponentNameProps {
  /**
   * Description of the prop
   */
  variant?: "primary" | "secondary";
  /**
   * Description of the prop
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ variant = "primary", children, className, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(
          "base-classes",
          {
            "variant-primary-classes": variant === "primary",
            "variant-secondary-classes": variant === "secondary",
          },
          className
        )}
        {...props}
      >
        {children}
      </element>
    );
  }
);

ComponentName.displayName = "ComponentName";
```

### 2. Test Structure

```tsx
// ComponentName.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentName } from "./ComponentName";

describe("ComponentName", () => {
  it("renders children correctly", () => {
    render(<ComponentName>Test content</ComponentName>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    render(<ComponentName variant="secondary">Test</ComponentName>);
    expect(screen.getByText("Test")).toHaveClass("variant-secondary-classes");
  });

  it("handles user interactions", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<ComponentName onClick={handleClick}>Test</ComponentName>);

    await user.click(screen.getByText("Test"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 3. Storybook Stories

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./ComponentName";

const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Component",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Component",
  },
};
```

## Release Process

We use a **5-branch release strategy** with Changesets for version management:

### Using Changesets (Recommended)

1. Create a changeset for your changes:

   ```bash
   pnpm changeset
   ```

2. Follow the prompts to describe your changes
3. Commit the changeset file with your changes
4. The release process will be automated when the PR is merged to the appropriate branch

## Getting Help

- **Documentation**: Check our [documentation site](https://ruma-ui.github.io/ui/)
- **Issues**: Search existing [GitHub issues](https://github.com/ruma-ui/ui/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/ruma-ui/ui/discussions)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

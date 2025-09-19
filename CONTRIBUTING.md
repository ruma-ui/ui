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

1. Create a branch from `main`:

   ```bash
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
2. Create a Pull Request against the `main` branch
3. Fill out the PR template completely
4. Ensure all checks pass
5. Request review from maintainers

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

```
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
import { cn } from "@/utils";

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
    render(<ComponentName variant='secondary'>Test</ComponentName>);
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

We use both Changesets and Semantic Release for version management:

### Changesets (Recommended)

1. Create a changeset for your changes:

   ```bash
   pnpm changeset
   ```

2. Follow the prompts to describe your changes

3. Commit the changeset file with your changes

4. The release process will be automated when the PR is merged

### Semantic Release (Alternative)

Semantic Release automatically determines version bumps based on commit messages:

- `feat:` → Minor version bump
- `fix:`, `perf:`, `docs:`, etc. → Patch version bump
- `feat!:`, `fix!:`, or `BREAKING CHANGE:` → Major version bump

## Getting Help

- **Documentation**: Check our [documentation site](https://ruma-ui.github.io/ui/)
- **Issues**: Search existing [GitHub issues](https://github.com/ruma-ui/ui/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/ruma-ui/ui/discussions)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

# Commit Message Guidelines

This project uses [Conventional Commits](https://conventionalcommits.org/) with semantic-release for automated versioning and changelog generation.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

- `feat`: A new feature (triggers minor release)
- `fix`: A bug fix (triggers patch release)
- `improvement`: An improvement (triggers patch release)
- `perf`: A performance improvement (triggers patch release)
- `security`: A security fix (triggers patch release)
- `docs`: Documentation changes (triggers patch release)
- `style`: Code style changes (triggers patch release)
- `refactor`: Code refactoring (triggers patch release)
- `test`: Test changes (triggers patch release)
- `build`: Build system changes (triggers patch release)
- `ci`: CI/CD changes (triggers patch release)
- `dependency`: Dependency updates (triggers patch release)
- `chore`: Maintenance tasks (no release)

## Breaking Changes

To indicate a breaking change, add `BREAKING CHANGE:` in the footer or use `!` after the type:

```
feat!: breaking change description
```

or

```
feat: add new feature

BREAKING CHANGE: this breaks existing API
```

## Examples

```
feat: add dark mode toggle
fix: resolve memory leak in component
perf: optimize bundle size
docs: update README with installation guide
style: format code with prettier
refactor: simplify state management
test: add unit tests for components
build: update vite config
ci: fix deployment workflow
dependency: update react to v19
chore: update package.json
```

## Release Types

- **Major**: Breaking changes (1.0.0 → 2.0.0)
- **Minor**: New features (1.0.0 → 1.1.0)
- **Patch**: Bug fixes and improvements (1.0.0 → 1.0.1)

## Special Branches

- `main`: Production releases
- `beta`: Beta releases (1.0.0-beta.1)
- `alpha`: Alpha releases (1.0.0-alpha.1)

## Skip CI

Add `[skip ci]` to commit message to skip CI/CD:

```
fix: resolve issue

[skip ci]
```

# Contributing to Ruma UI

Thank you for considering contributing to Ruma UI! Your help is greatly appreciated in building a modern, accessible React component library. Below are guidelines to follow to make the contribution process smooth and effective for everyone involved.

## How to Contribute

1. **Fork the Repository**:
    - Navigate to the [Ruma UI repository](https://github.com/ruma-ui/ui)
    - Click the "Fork" button at the top right corner of the page.

2. **Clone Your Fork**:
    - Open your terminal and run:

    ```sh
    git clone https://github.com/YOUR_USERNAME/ui.git
    ```

3. **Create a Branch**:
    - Move into the cloned directory:

    ```sh
    cd ui
    ```

    - Create a new branch for your changes:

    ```sh
    git checkout -b feature/your-feature-name
    ```

4. **Make Your Changes**:
    - Implement your changes in your local repository.
    - Follow the project's coding standards and conventions.

5. **Commit Your Changes**:
    - Add your changes:

    ```sh
    git add .
    ```

    - Commit your changes with a meaningful message:

    ```sh
    git commit -m "feat: add new component feature"
    ```

6. **Push to Your Fork**:
    - Push your changes to your forked repository:

    ```sh
    git push origin feature/your-feature-name
    ```

7. **Create a Pull Request**:
    - Go to the original repository.
    - Click the "New Pull Request" button.
    - Select the branch you created and click "Create Pull Request".
    - Provide a detailed description of your changes in the pull request.

## Code Style

- **TypeScript**: All components must be written in TypeScript with proper type definitions
- **React**: Follow React best practices and hooks guidelines
- **Tailwind CSS**: Use utility-first approach with custom design tokens
- **Accessibility**: Ensure WCAG 2.1 AA compliance for all components
- **Naming**: Use PascalCase for component names, camelCase for props and functions
- **File Structure**: Follow the established component folder structure

## Component Development Guidelines

When creating new components:

- Create a dedicated folder in `src/components/` with the component name
- Include the component file, types, and Storybook stories
- Export the component in `src/components/index.ts`
- Add comprehensive TypeScript types
- Include accessibility attributes (ARIA labels, roles, etc.)
- Add unit tests with Vitest
- Create Storybook stories for all variants and states
- Update documentation

## Testing

- Write unit tests for all component logic using Vitest
- Test user interactions and state changes
- Ensure accessibility with proper ARIA attributes
- Test responsive behavior and different screen sizes
- Run `npm run test` to execute all tests
- Run `npm run test:coverage` to check coverage

## Storybook

- Create stories for all component variants and use cases
- Use proper controls and documentation in stories
- Test components visually in Storybook during development
- Run `npm run storybook` to start the development server

## Commit Messages

- Use clear and concise commit messages.
- Follow the conventional commits format:

    ```text
    type(scope): description

    [optional body]

    [optional footer]
    ```

    Example:

    ```text
    feat(button): add loading state

    Add loading spinner and disabled state to Button component.
    Includes proper TypeScript types and accessibility attributes.

    Closes #123
    ```

## Issue Reporting

- If you find a bug, create an issue before submitting a pull request.
- Provide a detailed description of the bug, including steps to reproduce it.
- If possible, include screenshots or code snippets to help illustrate the issue.

## Pull Request Review

- Be patient and respectful while waiting for your pull request to be reviewed.
- Address any feedback or requested changes promptly and thoughtfully.
- Engage in discussions and provide clarifications if needed.

## Code of Conduct

- Follow the project's code of conduct.
- Be respectful, inclusive, and considerate in your interactions.
- Help create a welcoming and positive environment for all contributors.

---

We appreciate your contribution and look forward to collaborating with you!

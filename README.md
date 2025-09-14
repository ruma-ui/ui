# Ruma UI

[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](http://localhost:6006)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A modern, accessible, and cus## 📞 Support

- 🐛 [Issues](https://github.com/ruma-ui/ui/issues)
- 💬 [Discussions](https://github.com/ruma-ui/ui/discussions)

> **Note:** Full documentation and additional support channels will be available upon official release.ble React component library built with TypeScript, Tailwind CSS, and Next.js. Designed for developers who want beautiful, consistent UI components without the complexity.

## ✨ Features

- 🎨 **Modern Design**: Clean, accessible components with a focus on user experience
- 🔧 **TypeScript First**: Full TypeScript support with comprehensive type definitions
- 🎯 **Tailwind CSS**: Utility-first styling with custom design tokens
- 📚 **Storybook Integration**: Interactive component documentation and testing
- 🧪 **Comprehensive Testing**: Unit tests with Vitest and visual testing with Chromatic
- ♿ **Accessibility**: WCAG compliant components with proper ARIA support
- 📱 **Responsive**: Mobile-first design that works across all devices
- 🚀 **Performance**: Optimized bundle size and runtime performance
- 🔄 **Auto Deployment**: Automatic Storybook deployment on main branch merges

## 🚀 Quick Start

### Installation

> **Note:** This package is currently under development and not yet published to npm. To use Ruma UI in your project, you'll need to clone and build it locally or wait for the official release.

For development and testing:

```bash
git clone https://github.com/ruma-ui/ui.git
cd ui
npm install
npm run build
```

Then you can import components from the local build or set up a local package link.

## 📦 Components

### Form Components

- **Button** - Versatile button component with multiple variants
- **TextInput** - Single-line text input with validation
- **Textarea** - Multi-line text input
- **Checkbox** - Checkbox input with custom styling
- **RadioGroup** - Radio button group component
- **Select** - Dropdown select component
- **FileUpload** - File upload with drag & drop support
- **Form** - Form wrapper with validation

### Layout Components

- **Card** - Content container with shadow and border options
- **Modal** - Modal dialog overlay
- **Drawer** - Slide-out panel component
- **Tabs** - Tabbed interface component
- **Accordion** - Collapsible content sections

### Navigation Components

- **Breadcrumb** - Navigation breadcrumb trail
- **Pagination** - Page navigation component
- **TreeView** - Hierarchical tree navigation

### Data Display

- **Table** - Data table with sorting and pagination
- **Badge** - Status and label badges
- **Avatar** - User avatar component
- **Progress** - Progress bar and indicators
- **Loader** - Loading spinner and skeleton components

### Feedback Components

- **Toast** - Notification toast messages
- **Tooltip** - Hover tooltip component
- **Alert** - Alert and notification banners

### Interactive Components

- **Calendar** - Date picker calendar
- **DatePicker** - Date selection component
- **Slider** - Range slider input
- **RangeInput** - Dual-handle range input
- **Stepper** - Step-by-step wizard component
- **CommandPalette** - Command search interface

### Utilities

- **ThemeToggle** - Dark/light theme switcher
- **RichTextEditor** - Rich text editing component
- **Resizable** - Resizable panel component

## 🎨 Styling

Ruma UI uses Tailwind CSS v4 for styling with custom design tokens and utilities.

### CSS Classes

Import the global styles in your app:

```tsx
import "ruma-ui/styles/globals.css";
```

### Utility Functions

#### `cn()` - Class Name Merger

Safely merge Tailwind classes without conflicts:

```tsx
import { cn } from "ruma-ui";

const buttonClasses = cn(
    "rounded-md px-4 py-2",
    variant === "primary" && "bg-blue-500 text-white",
    disabled && "cursor-not-allowed opacity-50",
);
```

#### `tw()` - Template Literal Support

Use template literals for dynamic class names:

```tsx
import { tw } from "ruma-ui";

const classes = tw`px-4 py-2 ${variant === "primary" ? "bg-blue-500" : "bg-gray-200"}`;
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/ruma-ui/ui.git
    cd ui
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Start Storybook:

    ```bash
    npm run storybook
    ```

### Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage report
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## 📚 Storybook

View interactive component documentation locally during development.

### Local Development

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the Storybook.

### Deployed Storybook

> **Coming Soon:** Storybook will be automatically deployed to Chromatic when the project is ready for public release.

## 🚀 Deployment

### Storybook Deployment

> **Coming Soon:** Storybook will be automatically deployed to Chromatic when changes are merged to the `main` branch.

The deployment workflow is already configured in `.github/workflows/deploy-storybook.yml` and will activate once the project is ready for public release.

To set up Chromatic deployment when ready:

1. Create a [Chromatic](https://chromatic.com/) account
2. Connect your GitHub repository
3. Copy the `CHROMATIC_PROJECT_TOKEN` from project settings
4. Add it as a repository secret in GitHub:
    - Go to repository **Settings** → **Secrets and variables** → **Actions**
    - Add `CHROMATIC_PROJECT_TOKEN` with the token value

## 🧪 Testing

Ruma UI uses Vitest for unit testing and Chromatic for visual regression testing.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Visual Testing

Visual tests run automatically on Chromatic for every pull request and main branch push.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run the test suite: `npm run test`
5. Update Storybook stories if needed
6. Commit your changes: `git commit -m 'Add some feature'`
7. Push to the branch: `git push origin feature/your-feature`
8. Open a Pull Request

### Component Guidelines

- All components must be written in TypeScript
- Include comprehensive PropTypes and default values
- Add Storybook stories for all component variants
- Write unit tests for all component logic
- Ensure accessibility compliance (WCAG 2.1 AA)
- Follow the established design system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Storybook](https://storybook.js.org/) for component documentation
- [Chromatic](https://chromatic.com/) for visual testing and hosting
- [React](https://reactjs.org/) for the component library foundation
- [Next.js](https://nextjs.org/) for the development framework

## 📞 Support

- 🐛 [Issues](https://github.com/ruma-ui/ui/issues)
- 💬 [Discussions](https://github.com/ruma-ui/ui/discussions)

> **Note:** Full documentation and additional support channels will be available upon official release.

---

Built with ❤️ by the Ruma UI team

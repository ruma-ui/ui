<div align="center">

<img src="https://ruma.5dev.in/logo.png" alt="Ruma UI" width="120" height="120" />

# @rumaui/ui

**A modern, production-ready React UI component library**  
built with TypeScript, Tailwind CSS v4, and tree-shaking in mind.

[![npm version](https://img.shields.io/npm/v/@rumaui/ui?style=flat-square&color=6366f1)](https://www.npmjs.com/package/@rumaui/ui)
[![npm downloads](https://img.shields.io/npm/dm/@rumaui/ui?style=flat-square&color=6366f1)](https://www.npmjs.com/package/@rumaui/ui)
[![CI](https://img.shields.io/github/actions/workflow/status/ruma-ui/ui/ci.yml?branch=dev&style=flat-square&label=CI)](https://github.com/ruma-ui/ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb?style=flat-square&logo=react)](https://react.dev/)

[Documentation](https://ruma.5dev.in) · [Storybook](https://ruma-ui.github.io/ui/storybook/) · [npm](https://www.npmjs.com/package/@rumaui/ui) · [GitHub](https://github.com/ruma-ui/ui)

</div>

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Setup](#setup)
  - [Tailwind CSS](#tailwind-css-setup)
  - [CSS Import](#css-import)
- [Quick Start](#quick-start)
- [Component Catalogue](#component-catalogue)
- [Framework Guides](#framework-guides)
  - [Next.js](#nextjs-app-router)
  - [Vite + React](#vite--react)
  - [Remix](#remix)
- [TypeScript](#typescript)
- [Customisation](#customisation)
- [Bundle Size](#bundle-size)
- [Contributing](#contributing)
- [License](#license)

---

## Features

| Feature                 | Detail                                                                |
| ----------------------- | --------------------------------------------------------------------- |
| 🎨 **49 Components**    | Comprehensive set covering every common UI pattern                    |
| ♿ **Accessible**       | WCAG 2.1 AA compliant — keyboard navigation, ARIA attributes          |
| 🔷 **TypeScript-first** | Full type definitions, zero `any` usage in the public API             |
| 🌊 **Tailwind CSS v4**  | Utility-class styling — fully customisable via CSS variables          |
| 📦 **Tree-shakeable**   | ESM + CJS dual build; only ship what you use                          |
| 🧪 **Well-tested**      | Unit tests with Vitest + Testing Library, visual tests with Chromatic |
| 🖥️ **SSR ready**        | Works with Next.js App Router, Remix, and any SSR framework           |
| ⚡ **Performant**       | No runtime CSS-in-JS; all styles are static at build time             |

---

## Requirements

| Dependency   | Version                |
| ------------ | ---------------------- |
| Node.js      | `≥ 18`                 |
| React        | `^18.0.0` or `^19.0.0` |
| React DOM    | `^18.0.0` or `^19.0.0` |
| Tailwind CSS | `^4.0.0`               |

> **Optional peer dependencies**
>
> - `next` — `^14.0.0 || ^15.0.0 || ^16.0.0` (only if using Next.js)
> - `react-router-dom` — `^6.0.0 || ^7.0.0` (only if using the `Link` component in Vite/Remix)

---

## Installation

```bash
# npm
npm install @rumaui/ui

# pnpm
pnpm add @rumaui/ui

# yarn
yarn add @rumaui/ui

# bun
bun add @rumaui/ui
```

Or use the CLI to scaffold and install everything automatically:

```bash
npx @rumaui/cli init
```

---

## Setup

### Tailwind CSS Setup

`@rumaui/ui` uses Tailwind CSS v4. Add the library path to your `@source` directive so Tailwind picks up component classes:

```css
/* globals.css / main.css */
@import "tailwindcss";
@source "../node_modules/@rumaui/ui";
```

> If you are using Tailwind v3, use the `content` array in `tailwind.config.ts`:
>
> ```ts
> // tailwind.config.ts
> export default {
>   content: ["./src/**/*.{ts,tsx}", "./node_modules/@rumaui/ui/dist/**/*.{js,mjs}"],
> };
> ```

### CSS Import

Import the library's base stylesheet once in your application entry point:

```ts
// _app.tsx / layout.tsx / main.tsx
import "@rumaui/ui/ui.css";
```

---

## Quick Start

```tsx
import { Button, Card, Badge } from "@rumaui/ui";

export default function HomePage() {
  return (
    <Card className="mx-auto max-w-sm p-6">
      <Badge variant="success">New</Badge>
      <h2 className="mt-2 text-xl font-semibold">Welcome to Ruma UI</h2>
      <p className="text-muted-foreground mt-1">Build beautiful interfaces in minutes.</p>
      <Button className="mt-4 w-full" size="lg">
        Get Started
      </Button>
    </Card>
  );
}
```

---

## Component Catalogue

All 49 components are available as named exports from `@rumaui/ui`.

### Layout & Navigation

| Component        | Import                                        | Description                             |
| ---------------- | --------------------------------------------- | --------------------------------------- |
| `Breadcrumb`     | `import { Breadcrumb } from "@rumaui/ui"`     | Hierarchical path navigation            |
| `NavigationMenu` | `import { NavigationMenu } from "@rumaui/ui"` | Accessible multi-level nav menu         |
| `Tabs`           | `import { Tabs } from "@rumaui/ui"`           | Tabbed content panels                   |
| `Pagination`     | `import { Pagination } from "@rumaui/ui"`     | Page navigation with configurable range |
| `Stepper`        | `import { Stepper } from "@rumaui/ui"`        | Multi-step wizard UI                    |

### Inputs & Forms

| Component     | Import                                     | Description                                   |
| ------------- | ------------------------------------------ | --------------------------------------------- |
| `Button`      | `import { Button } from "@rumaui/ui"`      | Versatile button with 6 variants              |
| `TextInput`   | `import { TextInput } from "@rumaui/ui"`   | Single-line text field with validation states |
| `Textarea`    | `import { Textarea } from "@rumaui/ui"`    | Multi-line text field with auto-resize        |
| `Checkbox`    | `import { Checkbox } from "@rumaui/ui"`    | Accessible checkbox with indeterminate state  |
| `Switch`      | `import { Switch } from "@rumaui/ui"`      | Toggle switch with animated thumb             |
| `Select`      | `import { Select } from "@rumaui/ui"`      | Dropdown select with search                   |
| `MultiSelect` | `import { MultiSelect } from "@rumaui/ui"` | Multi-value select with chips                 |
| `RadioGroup`  | `import { RadioGroup } from "@rumaui/ui"`  | Accessible radio button group                 |
| `Slider`      | `import { Slider } from "@rumaui/ui"`      | Range slider with step support                |
| `RangeInput`  | `import { RangeInput } from "@rumaui/ui"`  | Dual-handle range input                       |
| `DatePicker`  | `import { DatePicker } from "@rumaui/ui"`  | Calendar-based date selector                  |
| `Calendar`    | `import { Calendar } from "@rumaui/ui"`    | Standalone calendar component                 |
| `InputOTP`    | `import { InputOTP } from "@rumaui/ui"`    | One-time password input slots                 |
| `FileUpload`  | `import { FileUpload } from "@rumaui/ui"`  | Drag-and-drop file upload zone                |
| `Editable`    | `import { Editable } from "@rumaui/ui"`    | Click-to-edit inline text                     |
| `Rating`      | `import { Rating } from "@rumaui/ui"`      | Star rating input                             |
| `Form`        | `import { Form } from "@rumaui/ui"`        | Form wrapper with validation context          |

### Overlay & Feedback

| Component   | Import                                   | Description                                     |
| ----------- | ---------------------------------------- | ----------------------------------------------- |
| `Modal`     | `import { Modal } from "@rumaui/ui"`     | Accessible dialog/modal                         |
| `Drawer`    | `import { Drawer } from "@rumaui/ui"`    | Side-panel drawer (4 directions)                |
| `Popover`   | `import { Popover } from "@rumaui/ui"`   | Floating popover with anchor positioning        |
| `Tooltip`   | `import { Tooltip } from "@rumaui/ui"`   | Hover/focus tooltip with delay                  |
| `Toast`     | `import { Toast } from "@rumaui/ui"`     | Stack-able toast notifications                  |
| `Alert`     | `import { Alert } from "@rumaui/ui"`     | Inline alert with 4 severity levels             |
| `Progress`  | `import { Progress } from "@rumaui/ui"`  | Determinate / indeterminate progress bar        |
| `Loader`    | `import { Loader } from "@rumaui/ui"`    | Spinner variants for loading states             |
| `Skeleton`  | `import { Skeleton } from "@rumaui/ui"`  | Content-placeholder skeleton                    |
| `TopLoader` | `import { TopLoader } from "@rumaui/ui"` | Page-level progress indicator (NProgress-style) |

### Data Display

| Component      | Import                                      | Description                             |
| -------------- | ------------------------------------------- | --------------------------------------- |
| `Table`        | `import { Table } from "@rumaui/ui"`        | Sortable, paginated data table          |
| `Card`         | `import { Card } from "@rumaui/ui"`         | Container card with header/footer slots |
| `Badge`        | `import { Badge } from "@rumaui/ui"`        | Status badge with 8 colour variants     |
| `Avatar`       | `import { Avatar } from "@rumaui/ui"`       | User avatar with fallback initials      |
| `Accordion`    | `import { Accordion } from "@rumaui/ui"`    | Expandable content sections             |
| `TreeView`     | `import { TreeView } from "@rumaui/ui"`     | Hierarchical tree with expand/collapse  |
| `SortableList` | `import { SortableList } from "@rumaui/ui"` | Drag-and-drop reorderable list          |
| `Carousel`     | `import { Carousel } from "@rumaui/ui"`     | Touch-friendly image/content carousel   |
| `Image`        | `import { Image } from "@rumaui/ui"`        | Optimised image with lazy-load          |
| `Video`        | `import { Video } from "@rumaui/ui"`        | HTML5 video player wrapper              |
| `KeyboardKey`  | `import { KeyboardKey } from "@rumaui/ui"`  | Keyboard shortcut display (`⌘K`)        |

### Actions & Menus

| Component              | Import                                              | Description                   |
| ---------------------- | --------------------------------------------------- | ----------------------------- |
| `Dropdown`             | `import { Dropdown } from "@rumaui/ui"`             | Contextual action menu        |
| `ContextMenu`          | `import { ContextMenu } from "@rumaui/ui"`          | Right-click context menu      |
| `FloatingActionButton` | `import { FloatingActionButton } from "@rumaui/ui"` | FAB with speed-dial support   |
| `Clipboard`            | `import { Clipboard } from "@rumaui/ui"`            | Copy-to-clipboard button      |
| `Link`                 | `import { Link } from "@rumaui/ui"`                 | Router-aware anchor component |

### Layout Utilities

| Component   | Import                                   | Description                 |
| ----------- | ---------------------------------------- | --------------------------- |
| `Resizable` | `import { Resizable } from "@rumaui/ui"` | Drag-to-resize panel layout |

---

## Framework Guides

### Next.js (App Router)

```tsx
// app/layout.tsx
import "@rumaui/ui/ui.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
import { Button, Toast } from "@rumaui/ui";

export default function Page() {
  return <Button>Hello from App Router</Button>;
}
```

> **Note:** All components are Client Components internally where needed. You can use them directly in Server Components — they will automatically opt-in to the client boundary.

### Vite + React

```ts
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@rumaui/ui/ui.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```ts
// vite.config.ts — ensure Tailwind processes the library
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Remix

```tsx
// app/root.tsx
import rumaStyles from "@rumaui/ui/ui.css?url";
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: rumaStyles }];
```

---

## TypeScript

The package ships full TypeScript declarations. All component props are exported for convenience:

```tsx
import type { ButtonProps, CardProps, ModalProps } from "@rumaui/ui";

// Extend component props
interface MyButtonProps extends ButtonProps {
  loading?: boolean;
}
```

Strict mode is fully supported. The library has zero `any` in its public API surface.

---

## Customisation

Ruma UI uses CSS custom properties (variables) for theming. Override them in your global CSS:

```css
/* globals.css */
:root {
  --color-primary: 262 80% 60%; /* hsl */
  --color-background: 0 0% 100%;
  --color-foreground: 222 47% 11%;
  --radius: 0.5rem;
}

.dark {
  --color-background: 222 47% 11%;
  --color-foreground: 0 0% 98%;
}
```

All components respect these variables and re-render when they change (e.g. on dark mode toggle).

---

## Bundle Size

| Export                           | Minified | Gzipped |
| -------------------------------- | -------- | ------- |
| Full library (all 49 components) | ~220 KB  | ~65 KB  |
| `Button` only (tree-shaken)      | ~8 KB    | ~3 KB   |
| `ui.css` stylesheet              | ~108 KB  | ~18 KB  |

Bundle size is enforced in CI via [`size-limit`](https://github.com/ai/size-limit). PRs that exceed the limit fail the build.

---

## Contributing

See the monorepo [CONTRIBUTING.md](../../CONTRIBUTING.md) for full contribution guidelines.

Quick development setup:

```bash
git clone https://github.com/ruma-ui/ui.git
cd ui
pnpm install
pnpm storybook      # component dev environment
pnpm test:watch     # run tests in watch mode
```

---

## License

MIT © [Ruma UI](https://github.com/ruma-ui)

# RUI Design System

The single source of truth for all design decisions in the RUI component library.

---

## Architecture

```
src/styles/
  tokens.css    ← CSS custom properties (:root variables)
  globals.css   ← @theme inline maps variables → Tailwind utility classes
  focus.css     ← .rui-focus-ring and .rui-field-focus utilities
```

**How it works:**

1. `tokens.css` defines raw HSL channel values on `:root`
2. `globals.css` maps them to Tailwind color names via `@theme inline`
3. Components reference only standard Tailwind class names — no arbitrary `[hsl(var(...))]`

---

## Design Tokens

All tokens are CSS custom properties on `:root` in [`tokens.css`](./tokens.css). Changing a value here propagates everywhere.

### Colors

| Token                                | Default       | Tailwind Class                           | Usage                                  |
| ------------------------------------ | ------------- | ---------------------------------------- | -------------------------------------- |
| `--background`                       | `0 0% 100%`   | `bg-background`                          | Page / surface background              |
| `--foreground`                       | `222 47% 11%` | `text-foreground`                        | Primary text on background             |
| `--primary`                          | `220 90% 56%` | `bg-primary`                             | Brand color, CTAs                      |
| `--primary-foreground`               | `0 0% 100%`   | `text-primary-foreground`                | Text on primary backgrounds            |
| `--secondary`                        | `220 14% 92%` | `bg-secondary`                           | Subdued backgrounds, off-states        |
| `--secondary-foreground`             | `222 47% 11%` | `text-secondary-foreground`              | Text on secondary                      |
| `--muted`                            | `210 40% 96%` | `bg-muted`                               | Very light gray surfaces               |
| `--muted-foreground`                 | `215 16% 47%` | `text-muted-foreground`                  | Hints, labels, placeholder-like text   |
| `--accent`                           | `220 90% 96%` | `bg-accent`                              | Hover highlights, selected items       |
| `--accent-foreground`                | `220 90% 40%` | `text-accent-foreground`                 | Text on accent backgrounds             |
| `--destructive`                      | `0 84% 60%`   | `bg-destructive` / `text-destructive`    | Error states                           |
| `--destructive-foreground`           | `0 0% 100%`   | `text-destructive-foreground`            | Text on destructive                    |
| `--border`                           | `220 13% 91%` | `border-border`                          | Default borders                        |
| `--input`                            | `220 9% 78%`  | `border-input`                           | Form field borders (slightly stronger) |
| `--ring`                             | `220 90% 56%` | —                                        | Focus ring color (always = primary)    |
| `--card` / `--card-foreground`       | —             | `bg-card` / `text-card-foreground`       | Card surfaces                          |
| `--popover` / `--popover-foreground` | —             | `bg-popover` / `text-popover-foreground` | Dropdowns, tooltips                    |

> **Opacity modifiers work:** `bg-primary/50`, `text-foreground/80` — Tailwind v4 applies `color-mix()` automatically.

### Radius

One variable controls the global border-radius scale:

```css
/* tokens.css */
--radius: 6px; /* change this to re-radius everything */
```

| Class          | Value at default | Usage                    |
| -------------- | ---------------- | ------------------------ |
| `rounded-sm`   | 4px              | Checkbox, tight elements |
| `rounded-md`   | 6px              | Inputs, buttons          |
| `rounded-lg`   | 8px              | Cards                    |
| `rounded-xl`   | 12px             | Modals, panels           |
| `rounded-full` | 9999px           | Pills, switches, radios  |

### Focus Ring

```css
/* tokens.css */
--ring-width: 2px; /* ring thickness */
--ring-offset: 2px; /* gap between element edge and ring */
--ring-color: hsl(var(--ring) / 0.4); /* semi-transparent primary */

/* For field-type components (inputs, selects) */
--field-focus-border: hsl(var(--ring));
```

---

## Focus System

Two patterns, consistently applied.

### `.rui-focus-ring` — Controls & buttons

> Button, Badge, Switch, Slider, clickable Card

- Activates **only on keyboard focus** (`:focus-visible`) — not on click/tap
- Renders: **2px white gap + 2px colored ring** sitting outside the element border

```css
/* focus.css — rendered output */
.rui-focus-ring:focus-visible {
  box-shadow:
    0 0 0 2px hsl(var(--background)),
    /* white gap */ 0 0 0 4px hsl(var(--ring) / 0.4); /* colored ring */
}
```

### `.rui-field-focus` — Field containers

> TextInput, Textarea, Select

- Activates on **`:focus-within`** (a child is focused)
- **No ring** — just `border-color` changes to `hsl(var(--ring))`
- Error state overrides: border stays `hsl(var(--destructive))`

### Checkbox & Radio (peer pattern)

Because the actual `<input>` is `sr-only`, focus ring is applied to the visual div via `peer-focus-visible:`:

```tsx
// in Checkbox.tsx / RadioGroup.tsx
const focusRingClass =
  "peer-focus-visible:shadow-[0_0_0_var(--ring-offset)_hsl(var(--background)),0_0_0_calc(var(--ring-offset)+var(--ring-width))_var(--ring-color)]";
```

---

## Unified Size Scale

All form components share **one canonical size table**. When you set `size="md"`, every component renders at exactly the same height.

| Size | Height        | Padding X | Font size   | Usage                      |
| ---- | ------------- | --------- | ----------- | -------------------------- |
| `xs` | 28px (`h-7`)  | `px-2`    | `text-xs`   | Dense UIs, compact tables  |
| `sm` | 32px (`h-8`)  | `px-2.5`  | `text-xs`   | Secondary fields           |
| `md` | 36px (`h-9`)  | `px-3`    | `text-sm`   | **Default / Normal**       |
| `lg` | 40px (`h-10`) | `px-3.5`  | `text-sm`   | Prominent fields           |
| `xl` | 48px (`h-12`) | `px-4`    | `text-base` | Hero / landing page inputs |

**This scale is enforced in:** TextInput, Select, DatePicker, InputOTP, Textarea (min-height).

Label font sizes automatically step down one size from the input:

| Input size | Label font  |
| ---------- | ----------- |
| xs / sm    | `text-xs`   |
| md / lg    | `text-sm`   |
| xl         | `text-base` |

---

## Component Variant Reference

### Button

| Variant       | Background                               | Text                          | Use when                 |
| ------------- | ---------------------------------------- | ----------------------------- | ------------------------ |
| `primary`     | `bg-primary`                             | `text-primary-foreground`     | Main CTA                 |
| `secondary`   | `bg-secondary`                           | `text-secondary-foreground`   | Secondary action         |
| `outline`     | `bg-transparent` border `border-primary` | `text-primary`                | Tertiary / less emphasis |
| `tertiary`    | `bg-background` border `border-border`   | `text-foreground`             | Ghost-style              |
| `destructive` | `bg-destructive`                         | `text-destructive-foreground` | Delete / danger          |
| `none`        | —                                        | —                             | Custom styling           |

### TextInput / Select / Textarea

| Variant     | Background      | Border         |
| ----------- | --------------- | -------------- |
| `primary`   | `bg-background` | `border-input` |
| `secondary` | `bg-muted`      | `border-input` |

### Checkbox / RadioGroup / Switch

| Variant     | Checked state                                         |
| ----------- | ----------------------------------------------------- |
| `primary`   | `bg-primary border-primary`                           |
| `secondary` | `bg-secondary-foreground border-secondary-foreground` |

### Badge

| Style     | primary                              | secondary                                |
| --------- | ------------------------------------ | ---------------------------------------- |
| `filled`  | `bg-primary text-primary-foreground` | `bg-secondary text-secondary-foreground` |
| `outline` | `border-primary text-primary`        | `border-secondary-foreground`            |
| `soft`    | `bg-accent text-accent-foreground`   | `bg-secondary text-secondary-foreground` |

Semantic variants (`success`, `warning`, `error`, `info`) use fixed Tailwind utilities — they represent meaning, not brand.

---

## Theming (CLI)

To produce a new theme, replace **only** `tokens.css`. The component code never changes.

### Example: Purple theme

```css
/* tokens.css */
:root {
  --primary: 270 80% 55%;
  --primary-foreground: 0 0% 100%;
  --accent: 270 80% 96%;
  --accent-foreground: 270 80% 38%;
  --ring: 270 80% 55%;
  --radius: 8px; /* slightly more rounded */
}
```

### Dark mode

```css
[data-theme="dark"] {
  --background: 222 84% 5%;
  --foreground: 210 40% 98%;
  --card: 222 84% 5%;
  --card-foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 222 47% 11%;
  --secondary: 217 33% 17%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  --accent: 217 33% 17%;
  --accent-foreground: 210 40% 98%;
  --border: 217 33% 17%;
  --input: 217 33% 17%;
}
```

---

## File Map

| File                                 | Responsibility                                               |
| ------------------------------------ | ------------------------------------------------------------ |
| [`tokens.css`](./tokens.css)         | `:root` CSS variables — **only file that changes per theme** |
| [`globals.css`](./globals.css)       | `@theme inline` registration + Tailwind/animation imports    |
| [`focus.css`](./focus.css)           | `.rui-focus-ring` and `.rui-field-focus` CSS utilities       |
| [`animations.css`](./animations.css) | Custom keyframe animations                                   |
| [`scrollbar.css`](./scrollbar.css)   | Custom scrollbar styles                                      |

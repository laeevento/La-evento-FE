# @laevento/components

Shared component library for the Laevento monorepo, powered by shadcn/ui.

## Features

- ✨ Built with [shadcn/ui](https://ui.shadcn.com/)
- 🎨 Tailwind CSS for styling
- 🔧 Class Variance Authority for component variants
- 📦 Fully typed with TypeScript
- 🎯 Ready-to-use UI components

## Installation

This package is internal to the monorepo. To use it in your apps:

```json
{
  "dependencies": {
    "@laevento/components": "*",
    "@laevento/tailwind-config": "*"
  }
}
```

## Usage

### Import Styles

In your app's root layout or main CSS file, import the shared Tailwind config:

```tsx
import "@laevento/tailwind-config/shared-styles.css";
```

This includes all Tailwind utilities and shadcn/ui theme variables.

### Import Components

```tsx
import { Button } from "@laevento/components";
import { cn } from "@laevento/components";

export default function MyApp() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline" size="sm">
        Small Button
      </Button>
    </div>
  );
}
```

### Available Components

- **Button** - Versatile button component with multiple variants and sizes

## Adding New shadcn Components

Navigate to the components package and run:

```bash
cd packages/components
npx shadcn@latest add [component-name]
```

Example:

```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

## Development

```bash
# Type checking
yarn check-types

# Linting
yarn lint
```

## Component Variants

### Button Variants

- `default` - Primary button style
- `destructive` - For dangerous actions
- `outline` - Outlined button
- `secondary` - Secondary button style
- `ghost` - Minimal button style
- `link` - Link-styled button

### Button Sizes

- `default` - Standard size
- `sm` - Small size
- `lg` - Large size
- `icon` - Square button for icons

## Utilities

### `cn()` Function

Utility for merging Tailwind CSS classes:

```tsx
import { cn } from "@laevento/components";

<div className={cn("base-class", condition && "conditional-class")} />;
```

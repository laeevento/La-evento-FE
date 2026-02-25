# Laevento Frontend - Project Documentation for AI

## Project Overview

**Laevento** is an event management platform built as a Turborepo monorepo. It enables event planners and owners to create, manage, and book events through multiple web applications.

**Repository Type**: Turborepo monorepo with multiple applications (TanStack Start, Next.js) and shared packages  
**Package Manager**: Yarn v1.22.22  
**Node Version**: >=18  
**TypeScript**: 5.9.2

---

## Project Structure

```
laevento-frontend/
├── apps/                          # Application packages
│   ├── event-owner/              # Event owner web application
│   ├── event-planner/            # Event planner web application
│   └── website/                  # Marketing/public website
├── packages/                      # Shared packages
│   ├── components/               # Shared UI component library
│   ├── eslint-config/            # Shared ESLint configurations
│   ├── tailwind-config/          # Shared Tailwind CSS configuration
│   └── typescript-config/        # Shared TypeScript configurations
└── [config files]                # Root-level configuration
```

---

## Applications

### 1. event-owner

**Purpose**: Application for event owners to create and manage their events  
**Framework**: TanStack Start (v1.163.1) with TanStack Router (v1.162.9)  
**Build System**: Vite (v7.3.1) + Nitro (v3.0.1-alpha.2)  
**Port**: 3000  
**Key Features**:

- Authentication flow (login, register, forgot password, reset password, verify, KYC)
- File-based routing via TanStack Router under `src/routes/`
- Layout routes using `_auth` prefix pattern
- SSR with TanStack Query integration (`react-router-ssr-query`)
- Poppins font family (weights: 100-900)

**Dependencies**:

- `@tanstack/react-start` - Full-stack React framework
- `@tanstack/react-router` - Type-safe file-based routing
- `@tanstack/react-query` - Server state management
- `@tanstack/react-router-ssr-query` - SSR + Query integration
- `@laevento/components` - Shared component library
- `@remixicon/react` - Icon library
- `react-hook-form` + `@hookform/resolvers` - Form state management
- `yup` - Schema-based form validation
- `axios` - HTTP client
- `react` (19.2.3), `react-dom` (19.2.3)
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin)

**App-level Folders**:

- `src/routes/` - File-based route definitions (auto-generates `routeTree.gen.ts`)
- `src/pages/` - Page-level UI components rendered by route files
- `src/layout/` - Layout components (e.g. `auth.tsx`)
- `src/components/` - App-specific components
- `src/hooks/` - Custom React hooks
- `src/api/` - API layer / HTTP client utilities
- `src/types/` - Shared TypeScript interfaces and types
- `src/schemas/` - Yup validation schemas, organised by domain (e.g. `auth.ts`)
- `src/styles/` - CSS files (imported via `?url` for SSR)

**Auth Routes**:

- `/login` - Sign in page
- `/register` - Registration page
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset
- `/verify` - Email/account verification
- `/kyc` - Know Your Customer verification

### 2. event-planner

**Purpose**: Application for event planners to offer services and manage bookings  
**Framework**: Next.js 16.1.1 (App Router)  
**Status**: Basic scaffolding (minimal implementation)

### 3. website

**Purpose**: Public-facing marketing website  
**Framework**: Next.js 16.1.1 (App Router)  
**Status**: Basic scaffolding (minimal implementation)

---

## Shared Packages

### @laevento/components

**Purpose**: Shared React component library built with shadcn/ui  
**Build System**: tsup + Tailwind CLI  
**Development**: Hot-reload enabled with concurrent watchers

**Key Technologies**:

- **shadcn/ui** - Component foundation
- **Radix UI** - Headless UI primitives
- **Tailwind Variants** - Component variants management
- **class-variance-authority** - Variant composition
- **tailwind-merge** - Class merging utility

**Available Components**:

- `Button` - Multi-variant button component (primary, secondary, tertiary)
- `Typography` - Text component with semantic elements
- `Input` - Compound input component (Root, Label, Field)
- `Stack` - Layout component for flexbox
- `Checkbox` - Checkbox component
- `Link` - Link component
- `OtpInput` - One-time password input
- `DateRenderer` - Date display component
- Icons: `GoogleIcon` and more

**Component Variant System**:
The components use `tailwind-variants` (not CVA) for variant management. Example from Button:

```tsx
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: ["inline-flex", "cursor-pointer", ...],
  variants: {
    variant: {
      primary: ["bg-primary-500", "text-white", ...],
      secondary: ["border", "border-primary-500", ...],
      tertiary: ["bg-white", "text-primary-500", ...],
    },
    size: {
      sm: "py-[0.5rem] px-4 h-[2.5rem]",
      md: "py-[0.625rem] px-4 h-[3rem]",
      lg: "py-4 px-6 h-[3.5rem]",
    },
    rounded: {
      lg: ["rounded-lg"],
      full: ["rounded-[9999px]"],
    },
    width: {
      fit: ["w-fit"],
      full: ["w-full"],
    },
    standaloneIcon: { true: [...], false: [] },
    leadingIcon: { true: [], false: [] },
    trailingIcon: { true: [], false: [] },
  },
  compoundVariants: [...],
  defaultVariants: { ... }
});
```

**Build Process**:

- **JavaScript**: `tsup src/index.tsx --format esm,cjs --dts --external react`
- **CSS**: `tailwindcss -i ./src/styles.css -o ./dist/index.css`
- **Dev Mode**: Uses `concurrently` to run JS watcher, CSS watcher, and config watcher simultaneously

**Exports**:

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  },
  "./styles.css": "./dist/index.css"
}
```

**Adding New shadcn Components**:

```bash
cd packages/components
yarn dlx shadcn@latest add [component-name]
```

**shadcn Configuration** (`components.json`):

- Style: new-york
- RSC: false
- CSS Variables: true
- Base color: zinc
- CSS file: `src/styles.css`

### @laevento/tailwind-config

**Purpose**: Centralized Tailwind CSS v4 configuration and theme variables  
**Type**: CSS-only package  
**Main Export**: `shared-styles.css`

**Color Palette**:

Primary Colors (Green):

- `primary-50` to `primary-900` (#e8f7ef to #084926)
- Main: `primary-500` (#14ad5b)

Secondary Colors (Red/Coral):

- `secondary-50` to `secondary-900` (#fff0ed to #6b2720)
- Main: `secondary-500` (#ff5c4d)

Accent Colors (Purple):

- `accent-100` to `accent-500` (#f3edf9 to #45247a)

Grey Scale:

- `grey-100` to `grey-950` (#fafafa to #404040)
- `white` (#ffffff)
- `black` (#222)

**Theme Variables**:
All colors are exposed as CSS variables in both `:root` and `@theme` layers:

```css
--color-primary-500: #14ad5b;
--color-grey-900: #5e5e5e;
```

**Font Configuration**:

```css
--font-poppins: var(--font-poppins-sans), sans-serif;
--font-family-sans:
  var(--font-poppins-sans), ui-sans-serif, system-ui, sans-serif;
```

**Usage in Apps**:

```tsx
// In app/globals.css or layout
import "@laevento/tailwind-config/shared-styles.css";
```

### @laevento/eslint-config

**Purpose**: Shared ESLint configuration  
**Type**: ESLint v9+ flat config  
**Exports**:

- `base.js` - Base configuration
- `next.js` - Next.js specific configuration
- `react-internal.js` - Internal React library configuration

**Ignored Patterns** (from root eslint.config.mjs):

```javascript
{
  ignores: [
    "**/node_modules/**",
    "**/dist/**",
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/.turbo/**",
  ];
}
```

### @laevento/typescript-config

**Purpose**: Shared TypeScript configurations  
**Exports**:

- `base.json` - Base TypeScript config
- `nextjs.json` - Next.js specific config
- `react-library.json` - React library config

**Key TypeScript Settings**:

- Target: ES2017
- Module: esnext
- Module Resolution: bundler
- Strict mode: enabled
- JSX: react-jsx (for App Router compatibility)

---

## Development Workflow

### Initial Setup

```bash
# Install dependencies
yarn install

# Start all apps in dev mode
yarn dev

# Or start specific app
cd apps/event-owner
yarn dev
```

### Development Mode

The monorepo uses Turborepo's dependency graph to automatically start dependent packages:

```json
// turbo.json
{
  "dev": {
    "dependsOn": ["^dev"], // Starts dependencies first
    "cache": false,
    "persistent": true
  }
}
```

**When you run `yarn dev` in event-owner**:

1. Turborepo detects dependency on `@laevento/components`
2. Starts `components` package in dev mode first
3. Components package runs 3 concurrent watchers:
   - `dev:js` - TypeScript/tsup watcher
   - `dev:css` - Tailwind CSS watcher
   - `dev:watch-config` - Config file watcher
4. Then starts event-owner dev server
5. Hot reload works for both apps and components

**Critical**: The components package dev mode must be running for CSS changes to reflect immediately. This is configured in the root `turbo.json` with `dependsOn: ["^dev"]`.

### Build Process

```bash
# Build all packages and apps
yarn build

# Build specific app
turbo build --filter=event-owner

# Build only components package
cd packages/components
yarn build
```

**Build Order** (via Turborepo):

1. Shared packages (`components`, `eslint-config`, etc.)
2. Applications (`event-owner`, `event-planner`, `website`)

### Code Quality

**Pre-commit Hooks** (Husky + lint-staged):

- Automatically runs on `git commit`
- ESLint with `--fix` on staged `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs` files
- Prettier formats all staged files

**Manual Commands**:

```bash
yarn lint          # Run ESLint across all workspaces
yarn format        # Format all files with Prettier
yarn check-types   # TypeScript type checking
```

### Common Development Tasks

**Adding a new shadcn component**:

```bash
cd packages/components
yarn dlx shadcn@latest add [component-name]
# Example: yarn dlx shadcn@latest add card
```

**Creating a new component**:

```bash
cd packages/components
yarn generate:component
```

**Testing CSS changes**:

1. Modify color in `packages/tailwind-config/shared-styles.css`
2. Changes auto-reload in dev mode (no manual rebuild needed)
3. If not working, clear caches:
   ```bash
   rm -rf .next .turbo node_modules/.cache
   yarn dev
   ```

---

## Styling System

### Tailwind CSS v4

The project uses **Tailwind CSS v4** (not v3), which has a different configuration approach:

**Key Differences from v3**:

- No `tailwind.config.js` file
- Configuration via CSS using `@theme` directive
- CSS-first approach
- Native CSS variable support

**Color Usage**:

```tsx
// In components or pages
<div className="bg-primary-500 text-white">
<div className="border-grey-900">
<Button variant="primary"> // Uses primary-500
```

**Responsive Design**:
Standard Tailwind breakpoints apply:

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

**Custom Spacing**:
Use Tailwind's default spacing scale or custom values:

```tsx
className = "max-w-127"; // Custom width
className = "py-[0.5rem]"; // Arbitrary value
```

### Typography

**Font Family**: Poppins (loaded via `@fontsource/poppins`)
**Weights Available**: 100, 200, 300, 400, 500, 600, 700, 800, 900

**Typography Component**:

```tsx
import { Typography } from "@laevento/components";

<Typography component="h1" size="xl" weight="bold">
  Heading
</Typography>
<Typography component="p" size="sm">
  Body text
</Typography>
```

---

## Component Patterns

### Input Component (Compound Pattern)

The Input component uses a compound component pattern:

```tsx
import { Input } from "@laevento/components";

<Input.Root>
  <Input.Label required htmlFor="email">
    Email
  </Input.Label>
  <Input.Field id="email" type="email" placeholder="Enter your email" />
</Input.Root>;
```

**Sub-components**:

- `Input.Root` - Container wrapper
- `Input.Label` - Label with `required` prop support
- `Input.Field` - Actual input element

### Stack Component (Layout)

Flexbox-based layout component:

```tsx
import { Stack } from "@laevento/components";

<Stack direction="row" justify="between" align="center" gap="4">
  <div>Left</div>
  <div>Right</div>
</Stack>

<Stack direction="column" gap="6">
  <div>Top</div>
  <div>Bottom</div>
</Stack>
```

**Props**:

- `direction`: "row" | "column"
- `justify`: "start" | "center" | "end" | "between" | "around"
- `align`: "start" | "center" | "end" | "stretch"
- `gap`: Tailwind spacing values

### Button Component

```tsx
import { Button } from "@laevento/components";

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leadingIcon={<GoogleIcon />}>Sign in with Google</Button>

// Width
<Button width="full">Full Width</Button>
<Button width="fit">Fit Content</Button>
```

### ChildrenWithIcon

Internal utility component for rendering buttons with icons:

```tsx
import { ChildrenWithIcon } from "./childrenWithIcon";

// Handles leading/trailing icon positioning automatically
```

---

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `Typography.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Route files**: lowercase with underscores for layout routes (e.g., `_auth.tsx`, `login.tsx`)
- **Page components**: kebab-case (e.g., `login.tsx`, `reset-password.tsx`)
- **Config files**: kebab-case (e.g., `eslint.config.mjs`, `vite.config.ts`)
- **Type definitions**: PascalCase or camelCase with `.d.ts` (e.g., `types.d.ts`)

---

## Type Definitions

### Global Types

**apps/event-owner/types.d.ts**:

```typescript
declare module "*.css";
```

This allows importing CSS files in TypeScript without errors.

### Component Props

Components use TypeScript generics and inference:

```tsx
// Button component uses VariantProps from tailwind-variants
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
```

---

## Routing (TanStack Router - File-Based)

### Route Structure

The event-owner app uses TanStack Router's file-based routing under `src/routes/`:

```
src/routes/
├── __root.tsx                  # Root route (HTML shell, providers)
├── index.tsx                   # Home page (/)
├── _auth.tsx                   # Auth layout route (pathless)
└── _auth/                      # Auth child routes
    ├── login.tsx               # /login
    ├── register.tsx            # /register
    ├── forgot-password.tsx     # /forgot-password
    ├── reset-password.tsx      # /reset-password
    ├── verify.tsx              # /verify
    └── kyc.tsx                 # /kyc
```

**Route auto-generation**: TanStack Router generates `src/routeTree.gen.ts` automatically from the file structure.

**Layout Routes** (files/folders prefixed with `_`):

- `_auth.tsx` defines a pathless layout route (doesn't add to URL)
- Child routes in `_auth/` are nested under this layout
- Layout routes render an `<Outlet />` for child content

### Root Route (`__root.tsx`)

- Uses `createRootRouteWithContext` with `QueryClient` context
- Defines HTML shell via `shellComponent` (head, body, scripts)
- Configures `<HeadContent />`, `<Scripts />`, and `<TanStackRouterDevtools />`
- Wraps children in `<QueryClientProvider>`
- Loads CSS via `?url` import pattern

### Router Configuration (`src/router.tsx`)

- Creates router with `createRouter` using the generated `routeTree`
- Integrates SSR query via `setupRouterSsrQueryIntegration`
- Enables `scrollRestoration` and `defaultPreload: "intent"`
- Type-safe: extends `Register` interface for full type inference

### Auth Layout (`_auth.tsx`)

- Maps to `AuthLayout` component from `@/layout/auth`
- Shared layout for all authentication pages

---

## State Management

**Current Stack**:

- **TanStack Query** (`@tanstack/react-query`) - Server state management and caching
- **TanStack Router** - URL state for routing, search params, and navigation
- **React Hook Form** - Form state management

**Recommended Additions**:

- React Context for auth state
- URL search params (via TanStack Router) for filters/pagination

---

## Data Fetching

**Framework**: TanStack Query with SSR integration

**Pattern**:

- **TanStack Query** for client-side data fetching, caching, and mutations
- **SSR Query Integration** (`@tanstack/react-router-ssr-query`) for server-side data prefetching
- **Axios** (`axios@^1.13.5`) as the HTTP client
- **API layer**: `src/api/` directory for API utilities and client configuration
- Route loaders can prefetch data on the server before rendering

---

## Environment Variables

**Location**: `.env`, `.env.local`, `.env.production` (not in repo)

**Usage**:

```typescript
// Vite exposes env vars prefixed with VITE_
import.meta.env.VITE_API_URL;

// Server-side (Nitro) env vars
process.env.DATABASE_URL;
```

**Note**: Vite uses `import.meta.env` instead of `process.env` for client-side variables. Variables must be prefixed with `VITE_` to be exposed to client code.

---

## Icons

### Remixicon

**Package**: `@remixicon/react@^4.8.0`  
**Usage in event-owner**:

```tsx
import { RiEyeOffLine } from "@remixicon/react";

<RiEyeOffLine className="w-5 h-5" />;
```

### Custom Icons

**Location**: `packages/components/src/ui/icon/`

**Available Icons**:

- `GoogleIcon` - Google logo for OAuth

**Usage**:

```tsx
import { GoogleIcon } from "@laevento/components";

<Button leadingIcon={<GoogleIcon />}>Sign in with Google</Button>;
```

---

## Known Issues & Solutions

### CSS Hot Reload Issues

**Problem**: Changes to Tailwind config don't reflect without manual rebuild

**Solution** (Already Implemented):

1. Root `turbo.json` configured with `dependsOn: ["^dev"]`
2. Components package runs concurrent watchers
3. Custom config watcher script in `packages/components/scripts/watch-config.js`

**If issues persist**:

```bash
# Clear all caches
rm -rf .next .output .tanstack .turbo node_modules/.cache apps/*/.next apps/*/.output packages/components/dist

# Restart dev server
yarn dev
```

### Grey vs Neutral Colors

**Historical Context**: Colors were renamed from `neutral` to `grey`

**Current State**: All references use `grey-*` naming:

```css
--color-grey-100 through --color-grey-950
```

**If you see `neutral-*` references**: They should be updated to `grey-*`

---

## Package Dependencies

### Root Level

- `turbo@^2.7.4` - Monorepo build system
- `typescript@5.9.2` - TypeScript compiler
- `prettier@^3.7.4` - Code formatter
- `eslint@^9.39.1` - Linter
- `husky@^9.1.7` - Git hooks
- `lint-staged@^16.2.7` - Pre-commit linting

### Components Package

- `@radix-ui/react-*` - Headless UI primitives
- `tailwind-variants@^3.2.2` - Variant management
- `class-variance-authority@^0.7.1` - CVA utility
- `tailwind-merge@^3.4.0` - Class merging
- `clsx@^2.1.1` - Class name utility
- `@remixicon/react@^4.9.0` - Icon library (Remix Icons)
- `react-datepicker@^9.1.0` - Date picker
- `input-otp@^1.4.2` - OTP input
- `tsup@^8.5.1` - TypeScript bundler
- `concurrently@^9.2.1` - Parallel script runner

### Event Owner App

- `@tanstack/react-start@^1.163.1` - Full-stack React framework
- `@tanstack/react-router@^1.162.9` - File-based routing
- `@tanstack/react-query@^5.90.21` - Server state management
- `@tanstack/react-router-ssr-query@^1.162.9` - SSR integration
- `react@19.2.3` - React library
- `react-dom@19.2.3` - React DOM
- `axios@^1.13.5` - HTTP client
- `@remixicon/react@^4.8.0` - Icons
- `vite@^7.3.1` - Build tool
- `nitro@3.0.1-alpha.2` - Server engine
- `tailwindcss@^4` - Tailwind CSS v4

---

## Scripts Reference

### Root Level

```bash
yarn dev           # Start all apps in dev mode
yarn build         # Build all apps and packages
yarn lint          # Lint all workspaces
yarn format        # Format all files with Prettier
yarn check-types   # Type check all workspaces
```

### Components Package

```bash
yarn dev           # Start dev mode (JS + CSS + config watchers)
yarn dev:js        # Watch JS only
yarn dev:css       # Watch CSS only
yarn build         # Build package (JS + CSS)
yarn lint          # Lint components
yarn check-types   # Type check
yarn generate:component  # Generate new component
```

### Event Owner App

```bash
yarn dev           # Start Vite dev server (port 3000)
yarn build         # Build for production (via Vite + Nitro)
yarn start         # Start production server (node .output/server/index.mjs)
yarn preview       # Preview production build
yarn lint          # Lint app
```

---

## Important File Paths

### Configuration

- `/package.json` - Root package.json with workspaces
- `/turbo.json` - Turborepo configuration
- `/eslint.config.mjs` - ESLint configuration
- `/.prettierrc` - Prettier configuration (if exists)

### Components Package

- `/packages/components/package.json`
- `/packages/components/src/index.tsx` - Main export file
- `/packages/components/src/ui/` - UI components
- `/packages/components/components.json` - shadcn config
- `/packages/components/DEV-WORKFLOW.md` - Dev workflow documentation

### Tailwind Config

- `/packages/tailwind-config/shared-styles.css` - Theme and colors
- `/packages/tailwind-config/package.json`

### Event Owner App

- `/apps/event-owner/package.json`
- `/apps/event-owner/vite.config.ts` - Vite + TanStack Start + Nitro config
- `/apps/event-owner/src/routes/__root.tsx` - Root route (HTML shell, providers)
- `/apps/event-owner/src/routes/index.tsx` - Home page
- `/apps/event-owner/src/routes/_auth.tsx` - Auth layout route
- `/apps/event-owner/src/routes/_auth/` - Auth page routes
- `/apps/event-owner/src/router.tsx` - Router factory with SSR query setup
- `/apps/event-owner/src/routeTree.gen.ts` - Auto-generated route tree
- `/apps/event-owner/src/pages/` - Page-level UI components
- `/apps/event-owner/src/layout/auth.tsx` - Auth layout component
- `/apps/event-owner/src/api/` - API layer
- `/apps/event-owner/src/types/index.ts` - Shared TypeScript types
- `/apps/event-owner/src/schemas/auth.ts` - Auth-related Yup schemas
- `/apps/event-owner/tsconfig.json` - TypeScript config

---

## Testing

**Status**: No testing framework currently configured

**Recommended Setup**:

- Vitest for unit/component tests
- Playwright or Cypress for E2E tests
- React Testing Library for component tests

---

## Deployment

**Status**: No deployment configuration detected

**Recommended Platforms**:

- Vercel (optimized for Next.js)
- Netlify
- AWS Amplify

**Build Command**: `yarn build`  
**Output**: `.next/` for Next.js apps, `.output/` for TanStack Start apps

---

## Git Workflow

### Pre-commit Hooks

Configured via Husky and lint-staged:

1. Stage files with `git add`
2. Run `git commit`
3. Husky triggers pre-commit hook
4. lint-staged runs:
   - ESLint on `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs` files
   - Prettier on all staged files
5. Commit proceeds if no errors

**Disable for urgent commits**:

```bash
git commit --no-verify -m "message"
```

---

## Best Practices for AI Assistance

### When Adding Components

1. **Always use shadcn for new UI components**:

   ```bash
   cd packages/components
   yarn dlx shadcn@latest add [component-name]
   ```

2. **Export from index.tsx**:

   ```tsx
   // packages/components/src/index.tsx
   export { default as NewComponent } from "./ui/new-component";
   ```

3. **Use tailwind-variants for variants**:

   ```tsx
   import { tv } from "tailwind-variants";

   const variants = tv({
     base: [...],
     variants: {...}
   });
   ```

4. **Follow compound pattern for complex components**:
   See Input component as reference

### When Modifying Styles

1. **Prefer Tailwind classes over custom CSS**
2. **Use design tokens** from `tailwind-config`:
   - `primary-*`, `secondary-*`, `accent-*`
   - `grey-*` (not `neutral-*`)
3. **Add new colors to** `packages/tailwind-config/shared-styles.css`
4. **Use arbitrary values sparingly**: `className="w-[127px]"`

### When Creating Pages (event-owner - TanStack Start)

1. **Follow TanStack Router file-based conventions**:
   - Add route file in `src/routes/` (e.g., `src/routes/_auth/new-page.tsx`)
   - Create corresponding page component in `src/pages/`
   - Route tree is auto-generated in `src/routeTree.gen.ts`

2. **Use layout routes** for organization:
   - `_auth` prefix for auth pages
   - `_dashboard` prefix for dashboard pages (future)

3. **Route file pattern**:

   ```tsx
   import { createFileRoute } from "@tanstack/react-router";
   import MyPage from "@/pages/(auth)/my-page";

   export const Route = createFileRoute("/_auth/my-page")({
     component: MyPage,
   });
   ```

### When Creating Pages (Next.js apps)

1. **Follow App Router conventions**:
   - `page.tsx` for routes
   - `layout.tsx` for layouts
   - `loading.tsx` for loading states
   - `error.tsx` for error boundaries

2. **Use route groups** for organization:
   - `(auth)` for auth pages
   - `(dashboard)` for dashboard pages

3. **Import shared components** from `@laevento/components`:
   ```tsx
   import { Button, Typography, Input } from "@laevento/components";
   ```

### When Debugging

1. **Check dev mode is running**: `yarn dev` should start component watchers
2. **Clear caches if needed**: `.next`, `.output`, `.tanstack`, `.turbo`, `node_modules/.cache`
3. **Verify TypeScript paths**: `@/*` resolves to `src/` in TanStack Start apps
4. **Check console for build errors**: Especially in component package

### File Organization

1. **Components**: One component per file
2. **Utilities**: Group related utilities
3. **Types**: Place shared types in `types/index.ts` at the app root; import via `@/types`
4. **Schemas**: Place Yup validation schemas in `schemas/` at the app root, grouped by domain (e.g. `schemas/auth.ts`); import via `@/schemas/auth`
5. **Assets**: Use `/public` for static files

### TypeScript

1. **Always type component props**
2. **Use inference when possible**
3. **Avoid `any`**: Use `unknown` or proper types
4. **Export types** for public APIs

---

## Troubleshooting

### Component Changes Not Reflecting

**Symptoms**: Updates to components don't show in app

**Solutions**:

1. Verify `yarn dev` is running in root
2. Check component package dev watchers are running
3. Clear `.next` cache (Next.js apps) or `.output`/`.tanstack` cache (TanStack Start apps)
4. Restart dev server

### TypeScript Errors

**Symptoms**: Type errors in imports

**Solutions**:

1. Verify `@laevento/*` packages are built
2. Run `yarn build` in components package
3. Check `tsconfig.json` paths configuration
4. Restart TypeScript server in VS Code

### Styling Not Applying

**Symptoms**: Tailwind classes not working

**Solutions**:

1. Verify `@laevento/tailwind-config/shared-styles.css` is imported
2. Check class names for typos
3. Ensure using Tailwind v4 syntax (no config file)
4. Clear `.next` cache (Next.js) or `.output` cache (TanStack Start)

### Build Failures

**Symptoms**: Build fails with dependency errors

**Solutions**:

1. Run `yarn install` in root (or just `yarn`)
2. Build packages in order: `yarn build` (Turbo handles order)
3. Check for circular dependencies
4. Verify all imports are correct

---

## Additional Resources

### Documentation

- TanStack Start: https://tanstack.com/start/latest
- TanStack Router: https://tanstack.com/router/latest
- TanStack Query: https://tanstack.com/query/latest
- Next.js App Router: https://nextjs.org/docs (for event-planner, website)
- Vite: https://vite.dev
- Nitro: https://nitro.build
- Tailwind CSS v4: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Turborepo: https://turbo.build/repo/docs
- Radix UI: https://www.radix-ui.com

### Internal Documentation

- `/README.md` - General monorepo info
- `/packages/components/README.md` - Component library docs
- `/packages/components/DEV-WORKFLOW.md` - Development workflow

---

## Future Considerations

### Potential Additions

- [ ] API integration (REST or GraphQL)
- [ ] Authentication provider (NextAuth, Clerk, etc.)
- [ ] State management (Zustand, Jotai)
- [ ] Testing framework (Vitest, Playwright)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Error tracking (Sentry)
- [ ] Analytics (Vercel Analytics, Google Analytics)
- [ ] Database ORM (Prisma, Drizzle)

### Scalability

- Consider extracting `@laevento/types` package for shared types
- Add `@laevento/utils` for shared utilities
- Implement design tokens more comprehensively
- Add Storybook for component documentation
- Create `@laevento/api` for API client

---

## Version History

**Last Updated**: February 25, 2026  
**Project Version**: 0.1.0 (development)  
**event-owner Framework**: TanStack Start 1.163.1 + TanStack Router 1.162.9  
**event-planner / website Framework**: Next.js 16.1.1  
**React Version**: 19.2.3  
**Tailwind CSS**: v4  
**Vite**: 7.3.1

---

## Contact & Support

This documentation is intended for AI assistance in development. For questions or issues, consult the development team or project maintainers.

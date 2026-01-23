# Component Development Workflow - Setup Complete! 🎉

## Summary of Changes

This document explains all the changes made to fix the CSS hot reload issues in your monorepo.

---

## Problems Fixed

### 1. **Grey Colors Not Showing**

- **Issue**: CSS variables were renamed from `neutral` to `grey` but weren't reflecting in the UI
- **Root Cause**: Cache issues and incorrect CSS import order
- **Solution**:
  - Fixed import order in `apps/event-owner/app/globals.css`
  - Cleared Next.js and Turbo caches
  - Added error color palette to `tailwind-config`

### 2. **Manual Rebuilds Required**

- **Issue**: Had to run `yarn build` manually after every change
- **Root Cause**:
  - Turbo dev task wasn't configured to run dependent packages
  - Tailwind watcher didn't detect changes in `tailwind-config` package
- **Solution**:
  - Added `dependsOn: ["^dev"]` to root `turbo.json`
  - Created custom watch script for `tailwind-config` changes
  - Improved dev script with `concurrently`

---

## Files Modified

### 1. `/turbo.json` (Root)

```json
"dev": {
  "dependsOn": ["^dev"],  // ← Added this
  "cache": false,
  "persistent": true
}
```

**Why**: Ensures when you run `yarn dev` in event-owner, it automatically starts dev mode in the components package.

### 2. `/apps/event-owner/app/globals.css`

```css
/* BEFORE */
@import "tailwindcss";
@import "@laevento/components/styles.css";
@import "@laevento/tailwind-config";

/* AFTER */
@import "@laevento/tailwind-config";
@import "@laevento/components/styles.css";
```

**Why**: `tailwind-config` includes `@import "tailwindcss"` and defines colors, so it must come first.

### 3. `/packages/tailwind-config/shared-styles.css`

- Added `--color-error-*` palette (50-900)
  **Why**: Support error states in components

### 4. `/packages/components/package.json`

```json
"scripts": {
  "dev:js": "tsup src/index.tsx --format esm,cjs --dts --external react --watch",
  "dev:css": "tailwindcss -i ./src/styles.css -o ./dist/index.css --watch",
  "dev:watch-config": "node scripts/watch-config.js",
  "dev": "concurrently -n \"JS,CSS,CONFIG\" -c \"blue,green,yellow\" \"npm:dev:js\" \"npm:dev:css\" \"npm:dev:watch-config\""
}
```

**Why**:

- `concurrently` provides better process management and colored output
- `watch-config` monitors `tailwind-config` for changes and triggers CSS rebuilds

### 5. `/packages/components/scripts/watch-config.js` (NEW)

- Custom watcher that monitors `tailwind-config` package
- Triggers CSS rebuild when changes are detected
  **Why**: Tailwind's built-in watcher doesn't watch external packages in a monorepo

---

## How to Use

### Starting Development

**Option 1: From the app directory (RECOMMENDED)**

```bash
cd apps/event-owner
yarn dev
```

This will automatically start:

- Next.js dev server (event-owner)
- Components package in watch mode (JS + CSS + Config watcher)

**Option 2: From the components package**

```bash
cd packages/components
yarn dev
```

This runs all three watchers:

- 🔵 JS watcher (tsup)
- 🟢 CSS watcher (tailwindcss)
- 🟡 Config watcher (custom script)

### Making Changes

#### Editing Component Files (`.tsx`)

1. Edit any file in `packages/components/src/`
2. **JS watcher** detects change → rebuilds TypeScript
3. Changes reflect immediately in your app ✅

#### Editing Component Styles (in `.tsx` using tailwind-variants)

1. Edit Tailwind classes in component files
2. **CSS watcher** detects change → rebuilds CSS
3. Changes reflect immediately ✅

#### Editing Tailwind Config (`shared-styles.css`)

1. Edit `packages/tailwind-config/shared-styles.css`
2. **Config watcher** detects change → triggers CSS rebuild
3. Changes reflect immediately ✅

---

## Color Palettes Available

### Primary (Green)

- `primary-50` through `primary-900`

### Secondary (Red/Orange)

- `secondary-50` through `secondary-900`

### Accent (Purple)

- `accent-100` through `accent-500`

### Error (Red) - NEW!

- `error-50` through `error-900`

### Grey (Neutral)

- `grey-100` through `grey-950`

### Basic

- `white`, `black`

---

## Troubleshooting

### Changes not reflecting?

1. **Check if dev mode is running**

   ```bash
   ps aux | grep -E "(tsup|tailwindcss|watch-config)"
   ```

2. **Clear all caches**

   ```bash
   # From root
   rm -rf .turbo apps/*/.next packages/*/.turbo packages/*/dist

   # Rebuild
   cd packages/components && yarn build
   ```

3. **Restart dev servers**
   - Stop all running processes (Ctrl+C)
   - Start fresh: `yarn dev`

### CSS classes not working?

1. **Verify color is defined** in `tailwind-config/shared-styles.css`
2. **Check if it's being used** - Tailwind v4 only includes used classes
3. **Rebuild**: `cd packages/components && yarn build`

---

## Best Practices

1. ✅ **Always use defined colors** - Don't use arbitrary colors like `bg-[#ff0000]`, use palette colors
2. ✅ **Run dev mode** - Don't manually build during development
3. ✅ **Add new colors to tailwind-config** - Keep all colors centralized
4. ✅ **Use semantic color names** - `error`, `success`, `warning`, etc.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Monorepo                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  apps/event-owner/                                           │
│  ├── app/globals.css ──────────┐                            │
│  │   @import tailwind-config   │                            │
│  │   @import components/styles │                            │
│  └── yarn dev ─────────────────┼─► Starts Next.js          │
│                                 │                            │
│  packages/components/           │                            │
│  ├── src/                       │                            │
│  │   ├── ui/                    │                            │
│  │   └── styles.css ────────────┤                            │
│  ├── scripts/watch-config.js ◄─┤─ Watches tailwind-config  │
│  └── yarn dev ─────────────────┼─► Runs 3 watchers          │
│                                 │                            │
│  packages/tailwind-config/      │                            │
│  └── shared-styles.css ◄────────┘─ Color definitions        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## What Happens When You Edit Files

### Scenario 1: Edit `input.tsx`

```
1. You save input.tsx
2. tsup detects change → rebuilds JS (dist/index.js)
3. Tailwind detects change → scans for new classes → rebuilds CSS (dist/index.css)
4. Next.js detects change in node_modules/@laevento/components → hot reloads
5. ✅ Browser updates
```

### Scenario 2: Edit `shared-styles.css`

```
1. You save shared-styles.css (add new color)
2. watch-config.js detects change → triggers `npm run build:styles`
3. Tailwind rebuilds CSS with new color variables
4. Next.js detects change → hot reloads
5. ✅ Browser updates
```

---

## Summary

You now have a **fully automated development workflow**! 🚀

- ✅ No more manual rebuilds
- ✅ Hot reload works across the monorepo
- ✅ Color changes reflect immediately
- ✅ Component changes reflect immediately
- ✅ Clear, colored console output

Just run `yarn dev` and start coding! 💻

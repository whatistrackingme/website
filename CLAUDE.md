# Frontend Guidelines

- **Make sure that i18n is considered in major architectural decisions**

## Styling Rules

1. **DaisyUI first** - Always check if a DaisyUI component exists before writing custom styles
2. **Extract don't duplicate** - If you use the same class combo 3+ times, make a component
3. **Composition over customization** - Build from small reusable pieces
4. **Use clsx for conditional classes** - Never use template strings for combining classes

```tsx
// Good - use clsx
import clsx from "clsx";
<button className={clsx("btn", isActive && "btn-primary", size === "lg" && "btn-lg")} />

// Bad - template strings
<button className={`btn ${isActive ? "btn-primary" : ""}`} />
```

### DaisyUI

**Always prefer these over custom implementations.** Docs: https://daisyui.com/components/

> **Important:** DaisyUI v5 renamed several components from v4. Always verify class names against the v5 docs. For example, `btm-nav` became `dock`, and `active` states use component-specific classes like `dock-active`. Check https://daisyui.com/docs/upgrade/ for migration details.

**Layout & Structure:**
accordion, breadcrumbs, card, carousel, collapse, divider, dock, drawer, footer, hero, navbar, stack

**Data Display:**
alert, avatar, badge, chat, countdown, diff, indicator, kbd, list, loading, mask, progress, radial-progress, skeleton, stat, status, steps, table, timeline, toast

**Forms & Input:**
button, calendar, checkbox, fab, fieldset, file-input, filter, input, join, label, radio, range, rating, select, textarea, toggle, validator

**Navigation:**
dropdown, link, menu, modal, pagination, tab

**Mockups:**
mockup-browser, mockup-code, mockup-phone, mockup-window

**Effects:**
hover-3d, hover-gallery, swap, text-rotate

**Utilities:**
theme-controller

## Code Quality

Run these regularly during development:

```bash
npm run lint      # ESLint - catch issues early
npm run format    # Prettier - consistent formatting
npm run knip      # Find unused exports/dependencies
```

Run all three before considering work complete.


**Icon guidelines:**

- Use `h-4 w-4` for standard size, `h-3 w-3` for small, `h-5 w-5` for large
- Add `gap-1` or `gap-2` to parent when pairing icon with text
- Use Feather icons (`Fi*`) for consistency - browse at https://react-icons.github.io/react-icons/icons/fi/

## TypeScript

- Strict mode is enabled - don't use `any`
- Define interfaces for component props
- Export types alongside components when useful
- Type checking: `npm run check` (runs `tsc --noEmit`)

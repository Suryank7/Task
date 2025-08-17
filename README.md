# React Component Development Assignment

This repo contains two UI components built with **React + TypeScript + TailwindCSS + Storybook**.

## Components
- **InputField**: Flexible input with label, helper, error state, disabled/invalid/loading states, variants (`filled | outlined | ghost`), sizes (`sm | md | lg`), optional **clear** button and **password toggle**, light/dark support.
- **DataTable**: Typed, sortable table with optional row selection, loading overlay, and empty state.

## Tech
- Vite + React + TypeScript
- TailwindCSS (dark mode with `class`)
- Storybook 8 (React + Vite)
- Vitest + Testing Library

## Getting Started
```bash
pnpm i   # or npm i / yarn
pnpm dev # run the demo app
```
Storybook:
```bash
pnpm storybook
```
Run tests:
```bash
pnpm test
```

## File Structure
```
src/
  components/ui/
    InputField.tsx
    DataTable.tsx
    InputField.stories.tsx
    DataTable.stories.tsx
    __tests__/
      InputField.test.tsx
      DataTable.test.tsx
  App.tsx  # demo usage
```

## Accessibility
- Labels are associated with inputs via `htmlFor`/`id`
- `aria-invalid`, `aria-describedby` on InputField
- `aria-sort`, proper `scope=col` in table headers; selection checkboxes have descriptive labels

## Deploy Storybook (Chromatic)
1. Sign in at Chromatic, create a project and get a token.
2. Install chromatic: `pnpm add -D chromatic`
3. Add script: `"chromatic": "chromatic --project-token=<YOUR_TOKEN>"`
4. Run: `pnpm build-storybook && pnpm chromatic`

## Notes
- Table is generic: `DataTable<User>` typed by your data shape.
- Sorting is stable for primitives. For custom cells, pass `render` and keep `sortable` off or provide comparable values in your data.


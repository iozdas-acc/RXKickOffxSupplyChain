# Skill: json-render / React

Convert JSON specs into React component trees with type-safe props and state management.
Library: `@json-render/react` — part of the `vercel-labs/json-render` ecosystem.

---

## When to use this skill

- Building dynamic, data-driven UIs where layout/structure comes from JSON (CMS, server, AI)
- When you need to render arbitrary UI from a spec without hardcoding component trees
- For form builders, page builders, or any system where structure changes at runtime
- When streaming UI specs from an API endpoint (`useUIStream`)

---

## Quick start

```tsx
import { defineRegistry, Renderer } from "@json-render/react";
import { catalog } from "./catalog";

const { registry } = defineRegistry(catalog, {
  components: {
    Card: ({ props, children }) => <div>{props.title}{children}</div>,
  },
});

function App({ spec }) {
  return <Renderer spec={spec} registry={registry} />;
}
```

---

## Creating a catalog

Define component schemas with Zod, then implement with full type safety:

```tsx
import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { defineRegistry } from "@json-render/react";
import { z } from "zod";

export const catalog = defineCatalog(schema, {
  components: {
    Button: {
      props: z.object({
        label: z.string(),
        variant: z.enum(["primary", "secondary"]).nullable(),
      }),
      description: "Clickable button",
    },
    Card: {
      props: z.object({ title: z.string() }),
      description: "Card container with title",
    },
  },
});

const { registry } = defineRegistry(catalog, {
  components: {
    Button: ({ props }) => (
      <button className={props.variant ?? ""}>{props.label}</button>
    ),
    Card: ({ props, children }) => (
      <div className="card">
        <h2>{props.title}</h2>
        {children}
      </div>
    ),
  },
});
```

---

## Spec structure (element tree)

```json
{
  "root": {
    "type": "Card",
    "props": { "title": "Hello" },
    "children": [
      { "type": "Button", "props": { "label": "Click me" } }
    ]
  }
}
```

---

## Dynamic prop expressions

Any prop value can be a data-driven expression resolved before the component receives it:

| Expression | What it does |
|------------|-------------|
| `{ "$state": "/path" }` | Reads from state (one-way) |
| `{ "$bindState": "/path" }` | Two-way binding on natural value prop (`value`, `checked`, etc.) |
| `{ "$bindItem": "field" }` | Two-way binding to a repeat item field (inside repeat scopes) |
| `{ "$cond": cond, "$then": val, "$else": val }` | Conditional value |
| `{ "$template": "Hello, ${/name}!" }` | Interpolates state values into strings |
| `{ "$computed": "fn", "args": { ... } }` | Calls a registered function with resolved args |

**Rule:** Components do NOT use a `statePath` prop for two-way binding. Use `{ "$bindState": "/path" }` on the natural value prop instead.

---

## State management

### Providers

| Provider | Purpose |
|----------|---------|
| `StateProvider` | Shares state across components via JSON Pointer paths |
| `ActionProvider` | Handles actions dispatched via the event system |
| `VisibilityProvider` | Enables conditional rendering based on state |
| `ValidationProvider` | Form field validation |

### External store (controlled mode)

Plug in Redux, Zustand, XState, or any external store:

```tsx
import { createStateStore, type StateStore } from "@json-render/react";

const store = createStateStore({ count: 0 });

<StateProvider store={store}>{children}</StateProvider>

// Mutate from anywhere — React re-renders automatically:
store.set("/count", 1);
```

When `store` is provided, `initialState` and `onStateChange` are ignored.

---

## Built-in actions

These are injected automatically by `ActionProvider` — no catalog declaration needed:

```json
{ "action": "setState", "params": { "statePath": "/activeTab", "value": "home" } }
{ "action": "pushState", "params": { "statePath": "/items", "value": { "text": "New" } } }
{ "action": "removeState", "params": { "statePath": "/items", "index": 0 } }
{ "action": "validateForm", "params": { "statePath": "/formResult" } }
```

`validateForm` validates all registered fields and writes `{ valid, errors }` to state.

---

## Event system

```tsx
// Simple event firing
Button: ({ props, emit }) => (
  <button onClick={() => emit("press")}>{props.label}</button>
),

// Event handle with metadata (e.g. preventDefault)
Link: ({ props, on }) => {
  const click = on("click");
  return (
    <a href={props.href} onClick={(e) => {
      if (click.shouldPreventDefault) e.preventDefault();
      click.emit();
    }}>{props.label}</a>
  );
},
```

```json
{
  "type": "Button",
  "props": { "label": "Submit" },
  "on": { "press": { "action": "submit" } }
}
```

`EventHandle` has: `emit()`, `shouldPreventDefault` (boolean), `bound` (boolean).

---

## State watchers

Trigger actions when state values change (top-level field, sibling of `type`/`props`/`children`):

```json
{
  "type": "Select",
  "props": { "value": { "$bindState": "/form/country" } },
  "watch": { "/form/country": { "action": "loadCities" } }
}
```

---

## Visibility conditions

Use `visible` on any element to show/hide based on state:

```tsx
visibility.when("/path")          // show when truthy
visibility.unless("/path")        // show when falsy
visibility.eq("/path", val)       // show when equal
visibility.and(cond1, cond2)      // AND
visibility.or(cond1, cond2)       // OR
```

JSON syntax:
```json
{ "$state": "/path" }
{ "$state": "/path", "eq": "value" }
{ "$state": "/path", "not": true }
{ "$and": [cond1, cond2] }
{ "$or": [cond1, cond2] }
```

---

## Two-way binding in form components (`useBoundProp`)

For form components that need two-way binding with `{ "$bindState": "/path" }`:

```tsx
import { useBoundProp } from "@json-render/react";

Input: ({ element, bindings }) => {
  const [value, setValue] = useBoundProp<string>(
    element.props.value,
    bindings?.value
  );
  return (
    <input
      value={value ?? ""}
      onChange={(e) => setValue(e.target.value)}
    />
  );
},
```

`useBoundProp(propValue, bindingPath)` → `[value, setValue]`. `setValue` is a no-op if the prop is not bound.

---

## Reusable component libraries (`BaseComponentProps`)

For building component libraries not tied to a specific catalog (e.g. `@json-render/shadcn`):

```tsx
import type { BaseComponentProps } from "@json-render/react";

const Card = ({ props, children }: BaseComponentProps<{ title?: string }>) => (
  <div>{props.title}{children}</div>
);
```

---

## Key exports

| Export | Purpose |
|--------|---------|
| `defineRegistry` | Create type-safe component registry from a catalog |
| `Renderer` | Render a spec using a registry |
| `schema` | Element tree schema (includes built-in state actions) |
| `useStateStore` | Access state context |
| `useStateValue` | Get single value from state |
| `useBoundProp` | Two-way binding for `$bindState`/`$bindItem` |
| `useActions` | Access actions context |
| `useAction` | Get a single action dispatch function |
| `useOptionalValidation` | Non-throwing variant of `useValidation` |
| `useUIStream` | Stream specs from an API endpoint |
| `createStateStore` | Create in-memory `StateStore` |
| `StateStore` | Interface for external state management |
| `BaseComponentProps` | Catalog-agnostic base type for reusable libraries |
| `EventHandle` | Event handle type |
| `ComponentContext` | Typed component context (catalog-aware) |

---

## Source

`vercel-labs/json-render` — skill `react`
Security: Gen Agent Trust Hub PASS / Socket PASS / Snyk PASS

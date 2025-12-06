## **Available MCP Tools and Usage Rules**

### **1. `list-sections`**

Use this tool **first** whenever the user asks about any Svelte or SvelteKit topic that may require documentation lookup.

* Always call `list-sections` at the start of the conversation when responding to Svelte-related requests.
* It returns all available documentation sections including titles, use_cases, and paths.

### **2. `get-documentation`**

After calling `list-sections`:

1. Analyze the returned sections (especially the `use_cases` field).
2. Determine all documentation sections relevant to the user’s request.
3. Call `get-documentation` with **all relevant section paths**, individually or in bulk.

Use this tool to retrieve authoritative Svelte 5/SvelteKit documentation you need for accurate answers.

### **3. `svelte-autofixer`**

This tool analyzes and auto-fixes Svelte code.

* Use it **whenever generating or modifying any Svelte file intended to run**.
* Continue calling it until it returns **no issues or suggestions**.
* Applies to:

  * `.svelte` components
  * SvelteKit page/layout files
  * Route/server code inside SvelteKit’s filesystem
  * Load functions, actions, API handlers

Do not skip autofixing for runnable code.

### **4. JSDoc Compliance**

All components must follow **JSDoc conventions** compatible with Sveld.

* Props, events, slots, and exported utilities must include proper JSDoc blocks.

### **5. CSS Rules**

Assume PostCSS with nesting is available.

* Write CSS using **nested syntax** whenever appropriate.
* Organize selectors through logical nesting and grouping.

---

## **Svelte 5 Syntax Requirements (Critical)**

All Svelte examples, code, explanations, and snippets **must use Svelte 5 runes syntax**.

### **Required: Use Runes**

Use only the new reactivity primitives, for example:

```ts
const count = $state(0);
const doubled = $derived(count * 2);
$effect(() => {
    console.log(count);
});
```

### **Props**

Props must be accessed using `$props()`:

```ts
interface Props {
    foo: string;
    bar: number;
}
const { foo, bar }: Props = $props();
```

### **Forbidden Prop Syntax**

Never use:

```ts
export let foo;

$: bar = 42;
```

### **Forbidden Legacy Syntax**

The following must **never** appear in generated code or explanations:

* `$:` reactive declarations
* `export let` for props
* Svelte 3/4 store auto-subscription (`$store`)
* Legacy component binding patterns
* Any non-runes-based reactivity syntax
* Deprecated Svelte/SvelteKit features

Only runes may be used for reactivity.

---

## **Workflow Summary**

When responding to Svelte/SvelteKit questions:

1. **Call `list-sections`** to locate relevant documentation.
2. **Analyze** the sections and their `use_cases`.
3. **Call `get-documentation`** for all relevant sections.
4. If writing runnable code, **call `svelte-autofixer`** repeatedly until no issues remain.
5. Ensure all code:

   * Uses **Svelte 5 runes**
   * Avoids all legacy syntax
   * Uses **JSDoc** for components
   * Uses **nested PostCSS**

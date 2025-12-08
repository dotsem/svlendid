<script lang="ts">
    import { CodeBlock } from '$lib';
</script>

<h2 id="installation">Installation</h2>

<p>
    Install Svlendid using your preferred package manager:
</p>

<h3 id="npm">npm</h3>

<CodeBlock 
    code="npm install svlendid"
    language="bash"
/>

<h3 id="pnpm">pnpm</h3>

<CodeBlock 
    code="pnpm add svlendid"
    language="bash"
/>

<h3 id="yarn">yarn</h3>

<CodeBlock 
    code="yarn add svlendid"
    language="bash"
/>

<h2 id="peer-dependencies">Peer Dependencies</h2>

<p>
    Svlendid requires Svelte 5 as a peer dependency. Make sure you have it installed:
</p>

<CodeBlock 
    code={`{
    "dependencies": {
        "svelte": "^5.0.0",
        "svlendid": "^0.0.1"
    }
}`}
    language="json"
    filename="package.json"
/>

<h2 id="setup">Setup</h2>

<p>
    Wrap your application with the <code>ThemeProvider</code> component to enable theming:
</p>

<CodeBlock 
    code={`\<script\>
    import { ThemeProvider } from 'svlendid';
\</script\>

<ThemeProvider>
    <slot />
</ThemeProvider>`}
    language="svelte"
    filename="+layout.svelte"
/>

<h2 id="typescript">TypeScript</h2>

<p>
    Svlendid includes TypeScript definitions out of the box. No additional setup is required.
</p>

<p>
    For the best experience, make sure your <code>tsconfig.json</code> includes:
</p>

<CodeBlock 
    code={`{
    "compilerOptions": {
        "moduleResolution": "bundler",
        "strict": true
    }
}`}
    language="json"
    filename="tsconfig.json"
/>

<h2 id="next-steps">Next Steps</h2>

<p>
    Now that you have Svlendid installed, check out the <a href="/docs/getting-started/quick-start">Quick Start</a> guide to start building.
</p>

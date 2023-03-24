# ✍️ Lesson 02: Server-Side Rendering

By default Astro uses static generation and it builds all the pages at build-time as opposed to at request time. However, there are some scenarios and use-cases where server-side rendering must be used.

Astro supports server-side rendering and setting it up couldn't be easier, and it can be done in two steps. First it needs to be enabled in the `astro.config.mjs` file:

```js
export default defineConfig({
  output: 'server',
});
```

This will work in development mode, however when it comes to deploying your project you also need to install one of the runtime environments. Currently Astro supports the following:

- Cloudflare
- Deno
- Netlify
- Node.js
- Vercel

> Remember you can use `npx astro add [provider]` to add your provider and have it be configured automagically by Astro.

# IMPORTANT NOTICE

> ⚠️ Here is something really important to remember: when you enable server-side rendering Astro will <strong>switch from static rendering to SSR on ALL PAGES</strong>.

## Hybrid rendering

As mentioned above, upon switching to SSR, all pages would be server rendered which may not be required. Astro supports hybrid rendering. To enable this you need to add the following line in the top, frontmatter section of the `.astro` pages that you wish to prerender (or `.mdx`, `.ts`, and `.js`):

```
export const prerender = true;
```

With this option we now have full control and flexibility over which pages are server rendered and which pages are rendered at build time.

# Proceed to the next section

[Lesson 03: Data Fetching](./03-data-fetching.md)

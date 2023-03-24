# ✍️ Lesson 00: The Basics of Astro

In their own words, Astro is

> the all-in-one web framework designed for speed. Pull your content from anywhere and deploy everywhere, all powered by your favorite UI components and libraries.

The title of this workshop is 'Ship Less JavaScript with Astro' and the way Astro functions is that it tries to ship no JavaScript at all. This alone will produce faster websites. Of course there are some legit reasons for wanting to use JavaScript, and we will learn what optimisation Astro has in place to make sure that if JavaScript is indeed needed, it still gets loaded in the most performant way.

> Please note that throughout this workshop we will use `npm` but the Astro CLI commands also support `pnpm` and `Yarn`.

# Create the basic application

To setup a basic application you can run the command below:

```
 npm create astro@latest
```

To run the project for development you can run the command below from the project folder that was created in the earlier step:

```
npm run dev
```

> Astro also supports [starter templates](https://docs.astro.build/en/install/auto/#starter-templates), please refer to the documentation to learn more about this, and other features.

The `create` command will ask a couple of questions such as the location of the project and whether you'd like to use TypeScript at all.

## Folders and files

A couple of important folders and files to note are:

- `astro.config.mjs` - this file allows you to manage the various configuration options in Astro. Most of the time if you use the Astro CLI to ammend your project, this file will be updated automatically.
- `src/pages` - this is the place where you can add your routes - which normally would have a `.astro` extension, however you can use `.md` and `.mdx`, `.html` and `.js` or `.ts` (as API endpoints) as well.

## Anatomy of a `.astro` file

Any `.astro` file can be dissected into 2 (or 3) sections.

```
---
const name = 'John'
---

<p>Hello, {name}!</p>

<script></script>
```

The top section - aka the frontmatter - demarked by the `---` symbols is where you can write JavaScript code that is executed when the page is built.

> Astro, by default statically renders all pages at build-time, however it also [supports server-side rendering](https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project), which needs to be configured in the `astro.config.mjs` file.

In between the `---` you can define variables, which can be reused in the second section which is what I call the "HTML section". Essentially this is the section where you can add all your HTML elements that will be displayed by the browser. Variables defined in the frontmatter can be interpolated by using the `{}` syntax.

Last but not least, there are some scenarios where you want to also execute some client side JavaScript. This is possible by adding a `<script>` element at the end of the page, this is useful for things such as adding the current date as part of a copyright text.

> You may be wondering, why not just add the date as a frontmatter variable and interpolate that vs using client side JavaScript. The answer is simple - imagine that you do a build of your page on 22nd December 2022. The year 2022 will be added to all built pages, however if you don't do a build in 2023, that date will not update as it would have been statically added to your HTML at build time.

> Note that by default any JavaScript added to the `<script>` element will be bundled and added to the `<head>` of the staticly generated page using the `type="module"` attribute. If you want your JavaScript to be inline you need to add `<script is:inline>`.

> Also note that you can add TypeScript in the `<script>` element too as when Astro builds the project it will transpile that to JavaScript.

# Islands and the client directive

Astro is a champion of the so called [islands architecture](https://docs.astro.build/en/concepts/islands/). Simply put, the island architecture advocates for the creation of components and only enabling and loading JS for the components that actually require it. Compare this with React where regardless of whether a component uses JavaScript at all, the whole React framework is loaded.

> By default, Astro ships no JavaScript for any component created, unless you add a `<script>` element to the bottom of a router file.

Astro takes this architecture concept to the next level. You get to control when Astro should load the JavaScript for your component. These are the currently supported options:

- `client:load` - high priority, useful for key elements that require immediate interactivity. The JavaScript for the component will be loaded on page load.
- `client:idle` - low priority, ideal for components requiring less immediacy. The JavaScript for the component will be loaded after either the `requestIdleCallback` or `load` event fired by the browser.
- `clientvisible` - low priority, ideal for components that are not visible on initial page load and are not above the fold. The component JavaScript is loaded when the component is visible in the viewport (uses the `IntersectionObserver`).
- `client:media` - low priority, ideal for components that are only visible in certain screen sizes. The JavaScript gets loaded when the CSS media query specified is triggered (i.e. `client:media="(max-width: 400px)"`)
- `client:only` - this attribute skips HTML server-rendering and renders only on the client, but you need to specify the framwork to load because Astro will not know (i.e. `<MyReactComponent client:only="react" />`).

# Astro Integrations

Astro has some built-in integrations that are supported out of the box. (Note that you can build a [custom integration yourself](https://docs.astro.build/en/reference/integrations-reference/) as well).

These integrations can be grouped into three buckets: `renderers`, `libraries` and `features`.

## TailwindCSS

For this workshop we are going to be using TailwindCSS and luckily for us, Astro already has a [`libraries` integration](https://docs.astro.build/en/guides/integrations-guide/tailwind/) for this CSS framwork.

To enable this, we simply need to execute the following command:

```
npx astro add tailwind
```

Let's move on to discussing Layouts and the file based routing a bit more in detail in Astro in the next section.

### CSS in Astro

Altough it's not part of this workshop but I still wanted to point out that Astro supports CSS styles of course. Adding a `<style>` element to any `.astro` file will created a <strong>scoped</strong> style. If you want your styles to be global, you need to add the `<style is:global>` instead.

One more cool feature is the fact that you can reference any CSS variable available on the page:

```astro
---
const foregroundColor = "rgb(221 243 228)";
const backgroundColor = "rgb(24 121 78)";
---
<style define:vars={{ foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--backgroundColor);
    color: var(--foregroundColor);
  }
</style>
<h1>Hello</h1>
```

For further information please visit the [Astro documentation on CSS & Styling](https://docs.astro.build/en/guides/styling/).

# Proceed to the next section

[Lesson 01: Layouts and Routing](./01-layouts-and-routing.md)

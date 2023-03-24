# ✍️ Lesson 01: Layouts and Routing

In this section we'll take a look at how to work with Layouts, Routing and Components in Astro.

# Layouts

Even though every `.astro` page could contain a full blown HTML document, it makes little sense to replicate that, plus there are some things that would be changing based on the page that is currently being viewed - such as different `<meta>` elements and a different `<title>` to mention a few.

As such it would make sense to create an overall layout and use that for all the pages. Although it's not a hard requirement, it again would make sense to store the layout file in a folder called `layouts` as that will also allow us to add multiple layout files - for example, one for the navigation and one for a footer.

You can slice and dice your application in any way you want, for the workshop I decided to add the following files:

- `layouts/Layout.astro` - the main layout file
- `layouts/Head.astro` - a section for adding a custom `<head>` element potentially per each page
- `layouts/Nav.astro` - a navigation bar
- `layouts/Footer.astro` - a footer section

All in all, this is how the `layouts/Layout.astro` file looks like:

```astro
---
import Head from './Head.astro';
import Nav from './Nav.astro';
const {
  title = 'Footie is the best',
  description = 'An online football magazine',
} = Astro.props;

import Footer from './Footer.astro';
---

<html lang="en">
  <Head {title} {description} />
  <body>
    <Nav />
    <div
      class="bg-white my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0"
    >
      <main class="bg-sky-300 md:w-2/3 lg:w-3/4 px-5 py-40">
        <h1 class="text-2xl md:text-4xl"><slot /></h1>
      </main>
    </div>
    <Footer />
  </body>
</html>
```

Notice that `import` works out of the box and also notice `Astro.props`. This is a special, built in object that essentially allows us to send properties to components and then access them. In the code above, if `Astro.props` does <strong>not</strong> contain the `title` or `description` keys, I set them to have default values, otherwise whatever gets sent as props will be used:

```astro
<Layout /> <!-- 👈🏼 will use the defaults -->

<Layout title="My Title" /> <!-- 👈🏼 will set title to "My Title", description will be the default -->
```

> If you look carefully there's another built in object being used here, that is `Astro.url`. There are multiple objects that can be accessed from the [Astro object](https://docs.astro.build/en/reference/api-reference/#astro-global).

Also take note of `<slot />`. This is the place where the actual content from the individual `.astro` pages will get injected/loaded.

Last but not least, please take a look at the `<Head>` astro component. If the property and the variable that holds the value that you wish to send to the property are the same you can use a simpler syntax:

```astro
const title = 'my title';
<Head title={title} />
<!-- can be simplified to 👇 -->
<Head {title} />
```

# Components

Other than layout components, I personally like to create a `components` folder where I would store my components. In Astro you can add components of any "type" - for this workshop we are adding both `.astro` and a `.jsx` component.

# Routing

As we discussed before routing in Astro is based on files found in the `pages` folder. We are not going to go through all the rules for the routes - I will just [defer to the docs](https://docs.astro.build/en/core-concepts/routing/).

We are going to discuss three types of routes as part of this workshop: static routes, dynamic routes and API routes.

## Static routes

Static routes are straight forward. `.astro` files will become routes:

`src/pages/about.astro` will become `example.com/about`

`src/pages/destinations/london.astro` will become `example.com/destinations/london`

> Do note that `.md`, `.mdx` as well as `.html` files can also be used to generate routes. As such, `/src/pages/hello.md` will become `example.com/hello`.

## Dynamic routes

There are situations where we are not able to add all the routes manually because the path can change dynamically - for example what if we have 100+ destinations? It's not viable to add 100+ individual `.astro` files.

Astro supports dynamic routes:

`src/pages/[destination]` can become `src/pages/*`

It's important to note that Astro does generate all pages at build time, and with dynamic routes we need to give it some information - in other words, how would Astro know what files to generate for our dynamic route?

This can be achieved by using `getStaticPaths()` which is a built in method. This method needs to return an array of objects where there's a mandatory `params` object which also needs another mandatory property that should match the dynamic route definition (in the above case it's `destination`):

```astro
// src/pages/[destination].astroconst destinations = ['london', 'rome', 'san
francisco', 'singapore', 'cairo', 'medellin']; export function getStaticPaths()
{ return destinations.map(destination => ({ params: { destination } })); } /*
returns: [{ params: { destination: 'london' } }, { params: { destination: 'rome'
} }, { // etc }] */
```

> If you have multipe parameters (i.e. `/src/pages/[city]-[country].astro`), you can pass multiple props to the `params` object:
>
> ```
> return [{ params: { city: 'london', country: 'uk'}}]
> ```

### Rest params

Astro also works with rest parameters as part of the dynamic URL routing: `src/pages/destinations/[...path].astro`. This provides with more flexibility. Do note that returning `{params: { path: undefined }}` would effectively match `example.com/destinations/`.

## Server Side Rendering

Just a quick note that for server-side rendered pages (more on this later), you wouldn't be using `getStaticPaths()` as the content would be rendered at request time, not at build time.

## API endpoints

> To create server endpoints (API routes), you need to enable SSR. SSR is covered in the next chapter in detail.

Adding a `.js` or `.ts` file to the `pages` directory will create REST API endpoints that has access to both the `request` and `params` objects.

When creating server endpoints, you can export functions that match HTTP methods to handle a particular request. The only difference is with the HTTP method of `delete` as that is also a JavaScript built-in keyword. For handling HTTP delete request, `del` most be used in Astro. Here's an example on how to handle HTTP `GET` and `DELETE` from Astro:

> Note that the `.js` and `.ts` extensions will be removed by Astro, as such `src/pages/[city].json.ts` will become `example.com/*.json`.

```typescript
// src/pages/[city].json.ts
const cities = ['london', 'rome', 'singapore'];
export const get = ({ params, request }) => {
  const { city } = params;
  const [myCity] = cities.filter((city) => city === city);
  if (myCity) {
    return {
      body: JSON.stringify({
        message: `This was a GET request to display ${myCity}`,
      }),
    };
  } else {
    return {
      body: JSON.stringify({
        message: `This was a GET request but city ${city} was not found.`,
      }),
    };
  }
};
export const del = ({ request }) => {
  // handle HTTP delete
};
```

> There's also a special `export const all` which can handle all methods and you can use some logic by accessing `request.method`.

# Proceed to the next section

[Lesson 02: Server Side Rendering](./02-server-side-rendering.md)

# ✍️ Lesson 03: Data Fetching

In this lesson we'll learn how to fetch data in Astro.

The good news? It is super-duper simple.

Remember that we have frontmatter (that's the bit between `---` on each `.astro` page on top). And in there we can write JavaScript. Believe it or not, Astro supports [top level await](https://v8.dev/features/top-level-await) and Web APIs out of the box so we can simply use the [`Fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to request any data.

This means that on any `.astro` page we can simply do the following:

```astro
---
const response = await fetch('api-endpoint');
const data = await response.json();
---
<pre>{JSON.stringify(data)}</pre>
```

This makes is really convenient to fetch any data.

Furthermore, Astro can also work with GraphQL endpoints:

```astro
---
const method = 'POST';
const query = `{
  query getDestination($id:ID) {
      destination($id) {
        name,
        flag
      }
    }
  }
}`;
const variables = {
  id: 'london'
}

const options = {
  method,
  body: {
    query,
    variables
  }
}
const response = await fetch('graphql-endpoint', options);
const data = await response.json();
---
<pre>{JSON.stringify(data)}</pre>
```

> Astro can also be [integrated with various Headless CMS providers](https://docs.astro.build/en/guides/cms/).

## Data fetching from a server endpoint

As we discussed during the routing module, Astro can also create server endpoints. It is then possible to consume data coming back from these server endpoints.

Providing the fact that we added `src/pages/api/products.json.ts` (a server endpoint) we could then easily access that on any `src/pages/` page by doing something along the lines of on the top of a `.astro` file:

```js
const response = await fetch(`${Astro.url.origin}/api/products.json`);
const { products } = await response.json();
```

## Forms

Maybe not necessarily related to data fetching but I thought I'd mention working with form data here as well.

> Note that `formData` is only available if you have server-side rendering enabled.

Any form data can be accessed in the `frontmatter` part of `.astro` files:

```astro
---
if (Astro.request.method === 'POST') {
  const data = await Astro.request.formData();
  const name = data.get('name');
  // process 'data' or 'name', e.g. send it to a server via `fetch()`
}
---
<h1>Form</h1>
<form method="post">
<input type="text" name="name" />
<button>Submit</button>
</form>
```

# Proceed to the next section

[Lesson 04: Content Collections](./04-content-collections.md)

```

```

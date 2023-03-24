# ✍️ Lesson 04: Content Collections

One of the additions of the `v2` Astro release is [content collections](https://docs.astro.build/en/guides/content-collections/). This feature is especially useful if you work with `.md` or `.mdx` files. With content collections you can manage your content plus, furthermore you can also create data validation and TypeScript type-safety for all the content in an Astro project

## `src/content`

To utilise content collections a special folder has been reserved by Astro: `src/content`. You can then create sub-folders in this location which will create individual content collections, for example: `src/content/dev-blog` and `/src/content/coroporate-blog`.

You can configure each content collection in a `config.ts` (or `.js`) file, where you can also use collection schemas by using [Zod](https://github.com/colinhacks/zod) (this is built into Astro):

```typescript
import { z, defineCollection } from 'astro:content';
const devBlogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string().default('The Dev Team'),
    tags: z.array(z.string()),
    date: z.date(),
    draft: z.boolean().default(true),
    description: z.string(),
  }),
});

const corporateBlogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
    featured: z.boolean(),
    language: z.enum(['en', 'es']),
  }),
});

export const collections = {
  devBlog: devBlogCollection,
  corporateBlog: corporateBlogCollection,
};
```

> Please note that the below examples assume that the `.md` files also have a frontmatter which will match the items highlighted above for the schema.

## Querying data

Once you have all the `.md` files in place and athe `config.ts` file ready, you can start querying the data in collections. This couldn't be simpler:

```astro
---
import { getCollection, getEntryBySlug } from 'astro:content'
const allDevBlogPosts = await getCollection('devBlogCollection');
const singleDevBlogPost = await getEntryBySlug('devBlogCollection', 'some-post-slug');
---
<h1>{singleDevBlogPost.data.title}</h1>
<!-- rest of the article -->
```

> Note that you can filter for draft/unpublished post as well in the frontmatter section by iterating through all articles like so:
>
> ```
> import { getCollection } from 'astro:content';
> const draftBlogEntries = await getCollection('blog', ({ data }) => {
>   return data.draft !== true;
> });
> ```

## Displaying the content

Now that we know how to query, it's time to discuss how to actually display the content. Astro provides us with a convenience method called `render()` to render the entire content of the markdown into a built-in Astro componented `<Content />`.

```astro
---
import { getEntryBySlug } from 'astro:content'
const singleDevBlogPost = await getEntryBySlug('devBlogCollection', 'some-post-slug');
---
<h1>{singleDevBlogPost.data.title}</h1>
<Content />
```

# Proceed to the next section

[Lesson 04: Image Optimisation](./05-image-optimisation.md)

```

```

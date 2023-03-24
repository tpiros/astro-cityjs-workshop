import { z, defineCollection } from 'astro:content';
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
    description: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};

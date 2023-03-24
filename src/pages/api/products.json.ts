import { APIRoute } from 'astro';
import { listProducts } from '../../utils/db';

export const get: APIRoute = async () => {
  const products = await listProducts();

  return {
    body: JSON.stringify({ products }),
  };
};

export const post: APIRoute = () => {
  return {
    body: JSON.stringify({
      message: 'This was a POST!',
    }),
  };
};

// delete should be del

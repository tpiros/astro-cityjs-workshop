import { APIRoute } from 'astro';
import { purchaseProduct } from '../../utils/db';

export const get: APIRoute = async ({ params, request }) => {
  if (request.headers.get('x-api-token') !== 'abc-123') {
    return new Response('Please send the right API token', { status: 403 });
  } else {
    const id = params.id;
    const randomQuantity = Math.floor(Math.random() * 3) + 1;
    const updatedProductList = await purchaseProduct(id, randomQuantity);

    return {
      body: JSON.stringify({ updatedProductList }),
    };
  }
};

export const post: APIRoute = ({ request }) => {
  return {
    body: JSON.stringify({
      message: 'This was a POST!',
    }),
  };
};

// delete should be del

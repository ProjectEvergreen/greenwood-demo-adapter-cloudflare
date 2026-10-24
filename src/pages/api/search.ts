import '@lit-labs/ssr-dom-shim/register-css-hook.js';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { html } from 'lit';
import '../../components/card/card.ts';
import { getProducts } from '../../services/products.ts';
import type { Product } from '../../services/products.ts';

export async function handler(request: Request): Promise<Response> {
  const formData = await request.formData();
  const termValue = formData.get('term');
  const term = typeof termValue === 'string' ? termValue : '';
  const products = (await getProducts() as Product[])
    .filter((product => {
      return term !== '' && product.title.toLowerCase().includes(term.toLowerCase());
    }));
  let body = '';

  if (products.length === 0) {
    body = 'No results found.';
  } else {
    body = await collectResult(render(html`
      ${products.map(({ title, thumbnail, id }, idx) => html`
        <app-card
          id=${id}
          title="${idx + 1}) ${title}"
          thumbnail=${thumbnail}
        ></app-card>
      `)}
    `));
  }

  return new Response(body, {
    headers: new Headers({
      'Content-Type': 'text/html'
    })
  });
}

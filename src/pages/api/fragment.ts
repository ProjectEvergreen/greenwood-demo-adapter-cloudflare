import '@lit-labs/ssr-dom-shim/register-css-hook.js';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { html } from 'lit';
import '../../components/card/card.ts';
import { getProducts } from '../../services/products.ts';
import type { Product } from '../../services/products.ts';

export async function handler(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const limit = parseInt(params.get('limit') ?? '5', 10);
  const offset = parseInt(params.get('offset') ?? '0', 10);
  const products = (await getProducts() as Product[]).slice(offset, offset + limit);
  const body = await collectResult(render(html`
    ${products.map(({ title, thumbnail, id }, idx) => html`
      <app-card
        id=${id}
        title="${offset + idx + 1}) ${title}"
        thumbnail=${thumbnail}
      ></app-card>
    `)}
  `));

  return new Response(body, {
    headers: new Headers({
      'Content-Type': 'text/html'
    })
  });
}

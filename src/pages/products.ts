import { html } from 'lit';
import '../components/card/card.ts';
import { getProducts } from '../services/products.ts';
import type { Product } from '../services/products.ts';

export async function getBody() {
  const products = await getProducts() as Product[];

  return html`
    <h2>SSR Page (w/ Lit SSR)</h2>
    <p>This is an example of a Greenwood SSR page route server-rendering Lit components; the same Card component used for the Fragments API demo on the home page in fact! Greenwood is also statically bundling the shared template (written in HTML) so that you can still share page templates even within SSR pages.</p>

    <h3>List of Products: ${products.length}</h3>
    <div class="products-cards-container">
      ${products.map(({ title, thumbnail, id }) => html`
        <app-card id=${id} title=${title} thumbnail=${thumbnail}></app-card>
      `)}
    </div>
  `;
}

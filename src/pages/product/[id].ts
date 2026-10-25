import { html } from 'lit';
import '../../components/card/card.ts';
import { getProducts } from '../../services/products.ts';
import type { Product } from '../../services/products.ts';
import type { Compilation, Page } from '@greenwood/cli';

export async function getBody(
  compilation: Compilation,
  page: Page,
  request: Request,
  params: { id: string },
) {
  const { title, thumbnail } = await getProducts(params.id) as Product;

  return html`
    <div class="products-cards-container">
      <app-card title=${title} thumbnail=${thumbnail}></app-card>
    </div>
  `;
}

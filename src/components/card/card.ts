import { LitElement, html } from 'lit';
import sheet from './card.css' with { type: 'css' };
import type { ModalDetail } from '../modal/modal.ts';

export default class Card extends LitElement {
  static properties = {
    title: { type: String },
    thumbnail: { type: String },
    id: { type: String },
  };

  declare title: string;
  declare thumbnail: string;
  declare id: string;

  static styles = [sheet];

  constructor() {
    super();
    this.title = '';
    this.thumbnail = '';
    this.id = '';
  }

  selectItem(): void {
    const itemSelectedEvent = new CustomEvent<ModalDetail>('update-modal', {
      detail: {
        content: `You selected the "${this.title}"`,
      },
    });

    window.dispatchEvent(itemSelectedEvent);
  }

  render() {
    const { title, thumbnail, id } = this;

    return html`
      <div>
        <h3>${title}</h3>
        <img src=${thumbnail} alt=${title} loading="lazy" width="100%">
        ${id ? html`<a href="/product/${id}/">View Item Details</a>` : ''}
        <button @click=${this.selectItem}>Preview Item Details</button>
      </div>
    `;
  }
}

customElements.define('app-card', Card);

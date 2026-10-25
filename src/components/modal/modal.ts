import { LitElement, html } from 'lit';
import sheet from './modal.css' with { type: 'css' };

export type ModalDetail = {
  content: string;
};

declare global {
  interface WindowEventMap {
    'update-modal': CustomEvent<ModalDetail>;
  }
}

export default class Modal extends LitElement {
  static properties = {
    content: { state: true },
  };

  declare content: string;

  static styles = [sheet];

  constructor() {
    super();
    this.content = '';
  }

  private readonly onUpdateModal = (event: CustomEvent<ModalDetail>): void => {
    this.updateModal(event.detail);
  };

  async updateModal(detail: ModalDetail): Promise<void> {
    this.content = detail.content;
    await this.updateComplete;
    this.shadowRoot?.querySelector('dialog')?.showModal();
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('update-modal', this.onUpdateModal);
  }

  disconnectedCallback(): void {
    window.removeEventListener('update-modal', this.onUpdateModal);
    super.disconnectedCallback();
  }

  private closeModal(): void {
    this.shadowRoot?.querySelector('dialog')?.close();
  }

  render() {
    return html`
      <dialog>
        <h3 id="content">${this.content}</h3>
        <button autofocus @click=${this.closeModal}>Close</button>
      </dialog>
    `;
  }
}

customElements.define('app-modal', Modal);

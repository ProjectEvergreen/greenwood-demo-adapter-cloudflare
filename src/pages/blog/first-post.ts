export default class FirstPostsPage extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `<h2>First Post Page</h2>`;
  }
}

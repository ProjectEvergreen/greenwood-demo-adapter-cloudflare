window.addEventListener('DOMContentLoaded', () => {
  const greetingForm = document.querySelector('form');
  const greetingOutput = document.getElementById('greeting-output');

  greetingForm?.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault();

    const form = new FormData(greetingForm);
    const name = String(form.get('name') ?? '');
    const url = new URL('/api/greeting', window.location.href);
    url.searchParams.set('name', name);
    const data: { message: string } = await fetch(url).then(response => response.json());

    if (greetingOutput) {
      greetingOutput.textContent = `${data.message}! 👋`;
    }
  });

  const limit = 10;
  let offset = -limit;
  const loadProducts = document.getElementById('load-products');
  const productsOutput = document.getElementById('load-products-output');

  loadProducts?.addEventListener('click', async () => {
    offset += limit;

    const html = await fetch(`/api/fragment?offset=${offset}&limit=${limit}`)
      .then(response => response.text());
    const fragment = Document.parseHTMLUnsafe(html);

    productsOutput?.insertAdjacentHTML('beforeend', fragment.body.innerHTML);
  });
});

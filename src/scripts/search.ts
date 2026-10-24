window.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('form');
  const searchOutput = document.getElementById('search-products-output');

  searchForm?.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(searchForm);
    const term = String(formData.get('term') ?? '');
    const html = await fetch('/api/search', {
      method: 'POST',
      body: new URLSearchParams({ term }).toString(),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(response => response.text());
    const fragment = Document.parseHTMLUnsafe(html);

    if (searchOutput) {
      searchOutput.innerHTML = fragment.body.innerHTML;
    }
  });
});

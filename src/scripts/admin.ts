window.addEventListener('DOMContentLoaded', () => {
  const testWebhook = document.getElementById('test-webhook');
  const webhookOutput = document.getElementById('test-webhook-output');

  testWebhook?.addEventListener('click', async (event: MouseEvent) => {
    event.preventDefault();

    const data: { message: string } = await fetch('/api/webhook/event', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Event',
        time: new Date().getTime()
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

    if (webhookOutput) {
      webhookOutput.textContent = data.message;
    }
  });
});

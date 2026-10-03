import { getMessage } from '../../services/message.ts';

export async function handler(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const name = params.get('name') ?? 'Greenwood';
  const body = { message: getMessage(name) };

  return new Response(JSON.stringify(body), {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
}

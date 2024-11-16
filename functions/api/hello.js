export function onRequest(context) {
  console.log('hello world???')
  return new Response(context.params.user)
}
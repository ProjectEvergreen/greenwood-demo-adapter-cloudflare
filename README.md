# greenwood-demo-adapter-cloudflare

A demonstration repo for deploying a full-stack [**Greenwood**](https://www.greenwoodjs.dev/) app with AWS static hosting and serverless functions.

> ⚠️ _**Note**: This repo is currently a [work in progress](https://github.com/ProjectEvergreen/greenwood/issues/1143)_

> ⚠️ _**Note**: Currently this repo is a WIP_

## Setup

To run locally
1. Clone the repo
1. Run `npm ci`

You can now run these npm scripts locally:
- `npm run dev` - Start the demo with Greenwood local dev server
- `npm run serve` - Start the demo with a production Greenwood build

## Demo

This repo aims to demonstrate a couple of Greenwood's features ([API Routes](https://www.greenwoodjs.dev/docs/pages/api-routes/) and [SSR pages](https://www.greenwoodjs.dev/docs/pages/server-rendering/)) leveraging Netlify's serverless and edge function capabilities, focused on using Web Components (WCC) and Web Standards to deliver the content for the demo.

## Status

|Feature    |Greenwood |Workers|
|---------- |----------|-------|
|API Routes |   ✅     |   ⚠️   |
|SSR Pages  |   ✅     |   ⚠️   |

You can see the live demo at [https://greenwood-demo-adapter-cloudflare.pages.dev/](https://greenwood-demo-adapter-cloudflare.pages.dev/).

## Workers

The demos include the following examples:

### API Routes

- ⚠️ [`/api/greeting?name{xxx}`](https://greenwood-demo-adapter-cloudflare.pages.dev/api/greeting) - An API that returns a JSON response and optionally uses the `name` query param for customization.  Otherwise returns a default message.
- ⚠️ [`/api/fragment`](https://greenwood-demo-adapter-cloudflare.pages.dev/api/fragment) - An API for returning fragments of server rendered Web Components as HTML, that are then appended to the DOM.  The same card component used in SSR also runs on the client to provide interactivity, like event handling.

### SSR Pages

- ⚠️ [`/products/`](https://greenwood-demo-adapter-cloudflare.pages.dev/products/) - SSR page for rendering Greenwood pages.
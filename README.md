# greenwood-demo-adapter-cloudflare

A demonstration repo for deploying a full-stack [**Greenwood**](https://www.greenwoodjs.dev/) app with Cloudflare Workers and Static Assets.

> ⚠️ _**Note**: This repo is currently a [work in progress](https://github.com/ProjectEvergreen/greenwood/issues/1143)_

## Setup

To run locally
1. Clone the repo
1. Run `npm ci`

You can now run these npm scripts locally:
- `npm run dev` - Start the demo with Greenwood local dev server
- `npm run serve` - Start the demo with a production Greenwood build

To preview the production build in the Cloudflare Workers runtime:

```sh
npm run build
npx wrangler dev
```
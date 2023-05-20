# greenwood-demo-adapter-cloudflare

A demonstration repo for using Greenwood with Cloudflare Pages and Edge functions (Workers).

> ⚠️ _**Note**: Currently this repo is a WIP_

A demonstration repo for using Greenwood with Cloudflare Pages and Edge functions for APIs and SSR pages and used in part of crafting the design for [introducing platform "adapters" into Greenwood](https://github.com/ProjectEvergreen/greenwood/issues/1008).  It also takes reference from [this repo / presentation](https://github.com/thescientist13/web-components-at-the-edge/) for some earlier prototypes for server rendering Web Components.

## Setup

To run locally
1. Clone the repo
1. Run `npm ci`

You can now run these npm scripts
- `npm run dev` - Start the demo with Greenwood local dev server
- `npm run serve` - Start the demo with a production Greenwood build

## Demo

This repo aims to demonstrate a couple of Greenwood's features ([API Routes](https://www.greenwoodjs.io/docs/api-routes/) and [SSR pages](https://www.greenwoodjs.io/docs/server-rendering/#routes)) leveraging Netlify's serverless and edge function capabilities, focused on using Web Components (WCC) and Web Standards to deliver the content for the demo.

## Status

|Feature    |Greenwood |Edge|
|---------- |----------|----|
|API Routes |   ❓     | ❓ |
|SSR Pages  |   ❓     | ❓ |

You can see the live demo at [https://greenwood-demo-adapter-vercel.vercel.app/](https://greenwood-demo-adapter-vercel.vercel.app/).

## Edge

The serverless demos include the following examples:

### API Routes

TODO

## Adapter Implementation Thoughts / Questions

TBD
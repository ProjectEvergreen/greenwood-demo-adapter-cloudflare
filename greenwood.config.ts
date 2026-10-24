import { greenwoodPluginRendererLit } from '@greenwood/plugin-renderer-lit';
import { greenwoodPluginAdapterCloudflare } from './cloudflare-adapter.js';

export default {
  isolation: true,
  plugins: [
    greenwoodPluginRendererLit(),
    greenwoodPluginAdapterCloudflare(),
  ],
};

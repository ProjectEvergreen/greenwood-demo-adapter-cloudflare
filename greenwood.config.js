import { greenwoodPluginAdapterCloudflare } from './cloudflare-adapter.js';

// this ensure things like fs -> node:fs
export function namespaceNodeSpecifiers(options = {}) {
  const nodeSpecifiers = ['fs'];

  return [{
    type: 'rollup',
    name: 'plugin-namespace-node-specifiers',
    provider: () => [{
      name: 'namespace-node-specifiers',
      async resolveId(id) {        
        if (nodeSpecifiers.includes(id)) {
          return {
            id: `node:${id}`,
            external: true
          };
        }
      }
    }]
  }];
};

export default {
  plugins: [
    namespaceNodeSpecifiers(),
    greenwoodPluginAdapterCloudflare()
  ]
}
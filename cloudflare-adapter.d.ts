import type { Compilation, Plugin } from '@greenwood/cli';

export interface CloudflareAdapterPlugin extends Plugin {
  type: 'adapter';
  provider: (compilation: Compilation) => () => Promise<void>;
}

export declare function greenwoodPluginAdapterCloudflare(): CloudflareAdapterPlugin[];

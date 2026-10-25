import type { Compilation, Plugin } from '@greenwood/cli';

export interface CloudflareAdapterPlugin extends Plugin {
  type: 'adapter';
  provider: (compilation: Compilation) => () => Promise<void>;
}

export interface CloudflareAdapterOptions {
  /** Compatibility settings for isolated route Workers. Match wrangler.toml when overriding. */
  compatibilityDate?: string;
  compatibilityFlags?: string[];
}

export declare function greenwoodPluginAdapterCloudflare(options?: CloudflareAdapterOptions): CloudflareAdapterPlugin[];

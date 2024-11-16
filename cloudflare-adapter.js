import fs from 'fs/promises';
import path from 'path';
import { checkResourceExists } from '@greenwood/cli/src/lib/resource-utils.js';

function generateOutputFormat(id, type) {
  const handlerAlias = '$handler';
  const path = type === 'page'
    ? `${id}.route`
    : id;

  return `
    import { handler as ${handlerAlias} } from './${path}.js';

    export async function onRequest (context = {}) {
      console.log({ context });
      const { request } = context;
      const { body, url, headers = {}, method } = request;
      const contentType = headers['content-type'] || '';
      let format = body;

      if (['GET', 'HEAD'].includes(method.toUpperCase())) {
        format = null
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = new FormData();

        for (const key of Object.keys(body)) {
          formData.append(key, body[key]);
        }

        // when using FormData, let Request set the correct headers
        // or else it will come out as multipart/form-data
        // https://stackoverflow.com/a/43521052/417806
        format = formData;
        delete headers['content-type'];
      } else if(contentType.includes('application/json')) {
        format = JSON.stringify(body);
      }

      const req = new Request(new URL(url, \`http://\${headers.host}\`), {
        body: format,
        headers: new Headers(headers),
        method
      });
      const res = await ${handlerAlias}(req);

      res.headers.forEach((value, key) => {
        response.setHeader(key, value);
      });
      response.status(res.status);
      response.send(await res.text());
    }
  `;
}

async function setupFunctionBuildFolder(id, outputType, outputRoot) {
  const outputFormat = generateOutputFormat(id, outputType);

  await fs.mkdir(outputRoot, { recursive: true });
  await fs.writeFile(new URL('./index.js', outputRoot), outputFormat);
}

// https://developers.cloudflare.com/pages/functions/routing/
async function cloudflareAdapter(compilation) {
  const { outputDir, projectDirectory } = compilation.context;
  const { basePath } = compilation.config;
  const adapterOutputUrl = new URL('./functions/', projectDirectory);
  const ssrPages = compilation.graph.filter(page => page.isSSR);
  const apiRoutes = compilation.manifest.apis;

  if (!await checkResourceExists(adapterOutputUrl)) {
    await fs.mkdir(adapterOutputUrl, { recursive: true });
  }

  for (const page of ssrPages) {
    const outputType = 'page';
    const { id, outputHref } = page;
    const outputRoot = new URL(`./${basePath}/${id}/`, adapterOutputUrl);
    const chunks = (await fs.readdir(outputDir))
      .filter(file => file.startsWith(`${id}.route.chunk`) && file.endsWith('.js'));

    await setupFunctionBuildFolder(id, outputType, outputRoot);

    // handle user's actual route entry file
    await fs.cp(
      new URL(outputHref),
      new URL(`./${outputHref.replace(outputDir.href, '')}`, outputRoot),
      { recursive: true }
    );

    // and any (URL) chunks for the page
    for (const chunk of chunks) {
      await fs.cp(
        new URL(`./${chunk}`, outputDir),
        new URL(`./${chunk}`, outputRoot),
        { recursive: true }
      );
    }
  }

  for (const [key, value] of apiRoutes.entries()) {
    const outputType = 'api';
    const { id, outputHref } = apiRoutes.get(key);
    const outputRoot = new URL(`.${basePath}/api/${id}/`, adapterOutputUrl);
    const { assets = [] } = value;

    await setupFunctionBuildFolder(id, outputType, outputRoot);

    await fs.cp(
      new URL(outputHref),
      new URL(`./${id}.js`, outputRoot),
      { recursive: true }
    );

    for (const asset of assets) {
      const name = path.basename(asset);

      await fs.cp(
        new URL(asset),
        new URL(`./${name}`, outputRoot),
        { recursive: true }
      );
    }
  }
}

const greenwoodPluginAdapterCloudflare = (options = {}) => [{
  type: 'adapter',
  name: 'plugin-adapter-cloudflare',
  provider: (compilation) => {
    return async () => {
      await cloudflareAdapter(compilation, options);
    };
  }
}];

export { greenwoodPluginAdapterCloudflare };
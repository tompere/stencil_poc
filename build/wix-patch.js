const path = require('path');
const fs = require('fs-extra');
const bundle = require('../src/stencil-dist/server');
const { argv } = require('process');

const config = {
  stencil_server_bundle: './src/stencil-dist/server/index.js',
  components: require('../src/custom-elements'),
  snippets_dir: './build/snippets',
  components_bundle_name: 'ssr-components.js',
  stencil_runtime_bundle_name: 'ssr-stencil-runtime.js',
  internal_hook_className: 'InternalHookComponent',
}

async function readSnippet(name) {
  return fs.readFile(path.resolve(path.join(config.snippets_dir), `${name}.js`), {encoding: 'utf8'})
}

const toCode = async (val, index) => {
  if (typeof val === 'string') {
    return val
  }
  if ('snippet' in val) {
    return readSnippet(val.snippet);
  }
  throw new Error(`cannot transofrm ${typeof val} (index ${index}) to code!`)
}

async function joinCode(arr) {
   const c = await Promise.all(arr.map(toCode))
   return c.join(';') 
}

async function generateStencilRuntimeFile() {
  let src = await fs.readFile(path.resolve(config.stencil_server_bundle), { encoding: 'utf8' })
  const hook = `${config.internal_hook_className},`
  src = src.replace(hook,`${hook}...__stencil__.fetchRegisteredComponents(),`)
  return await joinCode([
    { snippet: 'top'},
    src,
    { snippet: 'publicAPIs' } 
  ])
}

const writeFile = (fileName, content) => fs.outputFile(path.resolve('.', 'dist', fileName), content)

async function generateComponentsClassesFile() {
  const classes = await Promise.all(config.components.map(async (tagName) => {
    await bundle.renderToString(`<${tagName}></${tagName}>`)
    try {
      const obj = (global.__stencilComponents__).find(e => e[tagName])
      return obj[tagName].toString()
    } catch (error) {
      throw new Error(`${tagName} doesn't seems to be defined, make sure you stencil-build the project`) 
    }
  }));
  const internalAPIs = await readSnippet('internalAPIs');
  return `(function() { ${internalAPIs}; return [${classes.map(c => `(${c})`).join(',')}] })()`;
}

async function main() {
  const ssrCopmponents = await generateComponentsClassesFile()
  await writeFile(config.components_bundle_name, ssrCopmponents)
  const stencilRuntime = await generateStencilRuntimeFile()
  await writeFile(config.stencil_runtime_bundle_name, stencilRuntime)
}

const [,, type] = argv

main(type).then(console.log)

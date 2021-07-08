const path = require('path');
const fs = require('fs-extra');
const { argv } = require('process');

const config = {
  stencil_server_bundle: './src/stencil-dist/server/index.js',
  snippets_dir: './build/snippets',
  stencil_runtime_bundle_name: 'ssr-stencil-runtime.js',
  internal_hook_className: '__WixInternalHook__',
}

async function readSnippet(name) {
  return fs.readFile(path.resolve(path.join(config.snippets_dir), `${name}.js`), {encoding: 'utf8'})
}

const writeFile = (fileName, content) => fs.outputFile(path.resolve('.', 'src', 'wix-dist', fileName), content)

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
  const initCode = `
  ...((() => {
    // global.__stencil__.internals = ['registerInstance', 'h'].reduce((acc, f) => {
    //   // acc[f] = (...args) => eval(\`(() => \$\{f\})()\`)(...args);
    //   return acc;
    // }, {});
    global.__stencil__.internals.registerInstance = (...args) => registerInstance(...args);
    global.__stencil__.internals.h = (...args) => h(...args);
    return [].concat(global.__stencil__.registry);
  })())
  `
  src = src.replace(hook,`${initCode},`)
  return await joinCode([
    { snippet: 'top'},
    src,
    { snippet: 'publicAPIs' } 
  ])
}

async function main() {
  const stencilRuntime = await generateStencilRuntimeFile()
  await writeFile(config.stencil_runtime_bundle_name, stencilRuntime)
}

const [,, type] = argv

main(type).then(console.log).catch((err) => {
  console.error(err)
  process.exit(1) 
})
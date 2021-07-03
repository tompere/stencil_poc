const path = require('path');
const fs = require('fs-extra');
const bundle = require('../src/stencil-dist/server');
const { argv } = require('process');

const config = {
  components: require('../src/custom-elements'),
  snippets_dir: './build/snippets',
  components_bundle_name: 'ssr-components.js',
}

async function readSnippet(name) {
  return fs.readFile(path.resolve(path.join(config.snippets_dir), `${name}.js`), {encoding: 'utf8'})
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
}

const [,, type] = argv

main(type).then(console.log).catch((err) => {
  console.error(err)
  process.exit(1) 
})

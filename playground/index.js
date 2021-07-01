const bundle = require('../src/stencil-dist/server')

// bundle.renderToString('<mock-custom-element></mock-custom-element>').then(() => {
//   global.__stencilComponents__.forEach(clzz => {
//     console.log(clzz)
//     // bundle.render
//   })
// })

const extractClassCode = async (tagName) => {
  await bundle.renderToString(`<${tagName}></${tagName}>`)
  const obj = (global.__stencilComponents__).find(e => e[tagName])
  return obj[tagName].toString()
}

async function main() {
  const tagName = 'mock-custom-element'
  const code = global.__stencilComponents__.map(c => {

  })
  const obj = (global.__stencilComponents__).find(e => e[tagName])
  console.log('>', obj[tagName].toString())
}

main().then(console.log)


const fs = require('fs-extra')

console.log(JSON.stringify(fs.readFileSync('./packages/components-lib/dist/ssr-components.bundle.js', { encoding: 'utf-8' })))
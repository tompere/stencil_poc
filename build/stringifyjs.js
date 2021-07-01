const path = require("path")
const fs = require("fs-extra")

const [,, srcFile] = process.argv

if (!srcFile) {
	throw new Error(`expectd src file path as arg`)
}

const ThunderboltStencilModule = (code) => `/* eslint-disable no-template-curly-in-string */
import { IsolatePolyfill } from '../isolateNodeBridge'

export const stencilRuntime: IsolatePolyfill = {
	name: '__stencil__',
	// language=JavaScript
	code: ${JSON.stringify(code)},
}
` 

const srcContent = fs.readFileSync(path.resolve(srcFile)).toString()

const f = path.resolve('.', `code_${Date.now()}.ts`)
fs.outputFileSync(f, ThunderboltStencilModule(srcContent), 'utf8')

console.log(`created file ${f}`)


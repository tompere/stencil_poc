__stencil__.initRuntime = async () => {
  // initialize APIs, referenced from wix-internal-hook-component constructor 
  await exports.renderToString('<wix-internal-hook-component></wix-internal-hook-component>')
}

__stencil__.renderComponentToString = async (CompClass, props) => {
  const tagName = CompClass.cmpMeta.$tagName$ + ""
  const attributes = Object.keys(CompClass.cmpMeta.$members$).map(k => `${k}="${`${props[k]}`}"`).join(' ')
  const { html, diagnostics } = await exports.renderToString(`<${tagName} ${attributes} ></${tagName}>`);
  if (html) {
    const [ extracted ] = html.match(new RegExp(`<${tagName}(.)+\/${tagName}>`,"gm"))
    return extracted;
  }
  const [ { messageText } ] = diagnostics
  throw new Error(messageText)
}
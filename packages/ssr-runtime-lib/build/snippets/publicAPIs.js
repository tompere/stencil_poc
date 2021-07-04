global.__stencil__.initRuntime = async (CompClasses) => {
  global.__stencil__.registry.push(...CompClasses);
  // initialize APIs, referenced from wix-internal-hook-component constructor 
  return exports.renderToString('<wix-internal-hook-component></wix-internal-hook-component>')
}

global.__stencil__.renderComponentToString = async (CompClass, props) => {
  const tagName = CompClass.cmpMeta.$tagName$ + ""
  const attributes = Object.keys(CompClass.cmpMeta.$members$).map(k => `${k}="${`${props[k]}`}"`).join(' ');
  const { html, diagnostics } = await exports.renderToString(`<${tagName} ${attributes} ></${tagName}>`);
  if (html && diagnostics.length === 0) {
    const [ extracted ] = html.match(new RegExp(`<${tagName}(.)+\/${tagName}>`,"gm"))
    return extracted;
  }
  throw new Error(JSON.stringify(diagnostics))
}
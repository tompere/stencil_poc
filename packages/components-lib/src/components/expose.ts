declare const global: any;

const getComponentModule = (classRef) => eval('cmpModules').get(classRef.cmpMeta.$tagName$)

export const expose = (classRef) => {
  if (process.env.WIX_PATCH === 'true') {
    global.__stencilComponents__ = global.__stencilComponents__ || [];
    global.__stencilComponents__.push(getComponentModule(classRef));
  }
}
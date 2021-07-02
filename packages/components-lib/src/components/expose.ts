declare const global: any;

const getComponentModule = (classRef) => eval('cmpModules').get(classRef.cmpMeta.$tagName$)

export const expose = (classRef) => {
  global.__stencilComponents__ = global.__stencilComponents__ || [];
  global.__stencilComponents__.push(getComponentModule(classRef));
}
var global = self, exports = {};
self.__stencil__ = {
  registry: [],
  internals: {}
}
self.__stencil__.fetchRegisteredComponents = function() {
  return [].concat(self.__stencil__.registry)
}
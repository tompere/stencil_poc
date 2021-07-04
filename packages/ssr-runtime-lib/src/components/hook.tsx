import { Component } from '@stencil/core';

@Component({
  tag: 'wix-internal-hook-component',
})
export class InternalHookComponent {
  constructor() {
    // @ts-ignore
    global.__stencil__.internals = {
      // @ts-ignore
      registerInstance: (...args) => eval('(function(){ return registerInstance; })()')(...args),
      // @ts-ignore
      h: (...args) => eval('(function(){ return h; })()')(...args),
    }
  }

  render() {
    return null;
  }
}

import { Component, h } from '@stencil/core';

@Component({
  tag: 'wix-internal-hook-component',
})
export class InternalHookComponent {
  constructor() {
    // @ts-ignore
    __stencil__.internals = {
      // @ts-ignore
      registerInstance: (...args) => eval('(function(){ return registerInstance; })()')(...args),
      // @ts-ignore
      h: (...args) => h(...args),
    }
  }

  render() {
    return null;
  }
}

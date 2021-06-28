import { Component, h } from '@stencil/core';

@Component({
  tag: 'wix-default-custom-element',
})
export class AppRoot {

  render() {
    return (
      <div>
        <h1>Hello Wix</h1>
      </div>
    );
  }
}

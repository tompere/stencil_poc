import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'wix-default-custom-element',
})
export class AppRoot {

  @Prop() wham: string;

  render() {
    return (
      <div>
        <h1>{`wham ${this.wham}`}</h1>
      </div>
    );
  }
}

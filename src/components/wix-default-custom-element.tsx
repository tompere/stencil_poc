import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mock-custom-element',
})
export class AppRoot {

  @Prop() wham: string;

  render() {
    return (
      <div>
        <h1>{`I say ${this.wham}`}</h1>
      </div>
    );
  }
}

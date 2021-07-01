import { Component, h, Prop } from '@stencil/core';
import { expose } from './expose';

@Component({
  tag: 'wix-default-custom-element',
})
export class AppRoot {

  constructor() {
    expose(AppRoot)
  }

  @Prop() wham: string;

  render() {
    return (
      <div>
        <h1>{`I say ${this.wham}`}</h1>
      </div>
    );
  }
}

import { Component, h, Prop } from '@stencil/core';
import { expose } from './expose';

@Component({
  tag: 'foo-custom-element-client',
})
export class FooComp {

  constructor() {
    expose(FooComp)
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

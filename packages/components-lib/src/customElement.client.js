import { FooCustomElement } from './stencil-dist/client'

if (!customElements.get(FooCustomElement.is)) {
  customElements.define(FooCustomElement.is, FooCustomElement);
}
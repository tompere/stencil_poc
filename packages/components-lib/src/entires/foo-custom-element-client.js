import { FooCustomElementClient } from '../stencil-dist/client'

if (!customElements.get(FooCustomElementClient.is)) {
  customElements.define(FooCustomElementClient.is, FooCustomElementClient);
}
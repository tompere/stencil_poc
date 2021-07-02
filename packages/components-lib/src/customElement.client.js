import { WixDefaultCustomElement } from './stencil-dist/client'

if (!customElements.get(WixDefaultCustomElement.is)) {
  customElements.define(WixDefaultCustomElement.is, WixDefaultCustomElement);
}
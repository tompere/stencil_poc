import { WixDefaultCustomElement } from '../dist/custom-elements'

if (!customElements.get(WixDefaultCustomElement.is)) {
  customElements.define(WixDefaultCustomElement.is, WixDefaultCustomElement);
}
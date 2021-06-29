const { renderToString } = require('../dist/wixCustomElement.server')


renderToString('<wix-default-custom-element wham="tomp"></wix-default-custom-element>').then(res => console.log(res))
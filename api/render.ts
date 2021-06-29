import { VercelRequest, VercelResponse } from '@vercel/node'
import { renderToString } from '../dist/wixCustomElement.server'

export default async (request: VercelRequest, response: VercelResponse) => {
  const {html} = await renderToString('<wix-default-custom-element wham="rendered in server"></wix-default-custom-element>')
  response.status(200).send(html)
}
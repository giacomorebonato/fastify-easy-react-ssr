import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import type { ReactSSROptions } from './@types/react-ssr-options.js'
import { getEntryServerPath } from './get-entry-server-path.js'

import { renderForDev } from './render-for-dev.js'
import { renderForProd } from './render-for-prod.js'

const NODE_ENV = process.env['NODE_ENV']

const defaultOptions = {
  notFoundRoute: '/not-found',
  ssrOutlet: '<!--ssr-outlet-->',
}

export const fastifyEasyReactSSR = fastifyPlugin<Partial<ReactSSROptions>>(
  async (server: FastifyInstance, options) => {
    const entryServerPath = getEntryServerPath()
    const finalOptions = { ...defaultOptions, ...options, entryServerPath }

    if (NODE_ENV === 'production') {
      await renderForProd(server, finalOptions)
    } else {
      await renderForDev(server, finalOptions)
    }
  }
)

export default fastifyEasyReactSSR

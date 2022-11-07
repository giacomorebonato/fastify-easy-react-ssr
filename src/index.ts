import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import Fs from 'fs'
import Path from 'path'
import 'react'
import type { ReactSSROptions } from './@types/react-ssr-options.js'
import { entryServerDevPaths, entryServerProdPaths } from './paths.js'
import { renderForDev } from './render-for-dev.js'
import { renderForProd } from './render-for-prod.js'

const NODE_ENV = process.env['NODE_ENV']
const APP_ROOT = process.cwd()

const defaultOptions = {
  notFoundRoute: '/not-found',
  assetsPath: Path.join(APP_ROOT, 'dist', 'client', 'assets'),
  ssrOutlet: '<!--ssr-outlet-->',
}

const getEntryServerPath = () => {
  const filePaths =
    NODE_ENV === 'production' ? entryServerProdPaths : entryServerDevPaths

  for (let filePath of filePaths) {
    if (Fs.existsSync(filePath)) {
      return filePath
    }
  }

  throw Error(`Couldn't find entry-server file in \n${filePaths.join('\n')}`)
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

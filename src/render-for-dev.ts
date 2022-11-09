import fastifyMiddie from '@fastify/middie'
import type { FastifyInstance } from 'fastify'
import fs from 'fs'
import path from 'path'
import 'react'
import type { ReactSSROptions } from './@types/react-ssr-options.js'

const NODE_ENV = process.env['NODE_ENV']
const APP_ROOT = process.cwd()
const TEMPLATE =
  NODE_ENV === 'development'
    ? fs.readFileSync(path.join(APP_ROOT, 'index.html'), 'utf-8')
    : fs.readFileSync(
        path.join(APP_ROOT, 'src', '__tests__', 'index.html'),
        'utf-8'
      )

export const renderForDev = async (
  server: FastifyInstance,
  options: ReactSSROptions & { entryServerPath: string }
) => {
  if (typeof server.use === 'undefined') {
    await server.register(fastifyMiddie)
  }

  const { createViteServer } = await import('./create-vite-server.js')
  const vite = await createViteServer()
  await server.use(vite.middlewares)

  server.get('*', async (req, reply) => {
    const transformed = await vite.transformIndexHtml(req.url, TEMPLATE)
    const render = (await vite.ssrLoadModule(options.entryServerPath))['render']
    const appHtml = render(req.url)

    if (appHtml === '') {
      return await reply.redirect(options.notFoundRoute)
    }

    const html = transformed.replace(options.ssrOutlet, appHtml)
    return await reply.status(200).type('text/html').send(html)
  })

  server.addHook('onClose', async () => {
    await vite.close()
  })
}

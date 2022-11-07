import type { FastifyInstance } from 'fastify'
import fs from 'fs'
import path from 'path'
import 'react'
import type { ReactSSROptions } from './@types/react-ssr-options'

const APP_ROOT = process.cwd()

export const renderForProd = async (
  server: FastifyInstance,
  options: ReactSSROptions & { entryServerPath: string }
) => {
  const template = fs.readFileSync(
    path.join(APP_ROOT, 'dist/client/index.html'),
    'utf-8'
  )

  await server.register((await import('@fastify/compress')).default)
  await server.register((await import('@fastify/static')).default, {
    root: path.join(APP_ROOT, 'dist/client/assets'),
    prefix: '/assets',
  })

  server.get('*', async (req, reply) => {
    const render = (await import(options.entryServerPath)).render
    const appHtml = render(req.url)

    if (appHtml === '') {
      return await reply.redirect(options.notFoundRoute)
    }

    const html = template.replace(options.ssrOutlet, appHtml)

    return await reply.status(200).type('text/html').send(html)
  })
}

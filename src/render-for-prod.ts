import type { FastifyInstance } from 'fastify'
import fs from 'fs'
import path from 'path'
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

  const { default: fastifyCompress } = await import('@fastify/compress')
  await server.register(fastifyCompress)

  const { default: fastifyStatic } = await import('@fastify/static')
  await server.register(fastifyStatic, {
    root: path.join(APP_ROOT, 'dist/client/assets'),
    prefix: '/assets',
  })

  server.get('*', async (req, reply) => {
    const { render } = await import(options.entryServerPath)
    const appHtml = render(req.url)

    if (appHtml === '') {
      return await reply.redirect(options.notFoundRoute)
    }

    const html = template.replace(options.ssrOutlet, appHtml)

    return await reply.status(200).type('text/html').send(html)
  })
}

import Path from 'path'
import { createServer } from 'vite'

const NODE_ENV = process.env['NODE_ENV']

export const createViteServer = async () => {
  const vite = await createServer({
    root:
      NODE_ENV === 'development'
        ? process.cwd()
        : Path.resolve(process.cwd(), 'src', 'test'),
    logLevel: NODE_ENV === 'test' ? 'error' : 'info',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    appType: 'custom',
  })

  return vite
}

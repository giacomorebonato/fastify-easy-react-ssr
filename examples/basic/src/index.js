import Fastify from 'fastify'
import fastifyEasyReactSSR from 'fastify-easy-react-ssr'

const fastify = Fastify({
  logger: {
    transport: {
			target: 'pino-pretty',
			options: {
				colorize: true,
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
  },
})

await fastify.register(fastifyEasyReactSSR)

try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (error) {
  console.error(error)
  process.exit(1)
}
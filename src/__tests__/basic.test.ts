import { jest } from '@jest/globals'
import Fastify, { FastifyInstance } from 'fastify'
import { fastifyEasyReactSSR } from '../index.js'

describe('basic test', () => {
  let fastify: FastifyInstance

  beforeAll(async () => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn())
    fastify = Fastify()
    await fastify.register(fastifyEasyReactSSR)
  })

  afterAll(async () => {
    await fastify.close()
  })

  it('renders home', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.body).toContain('<h1>Home</h1>')
  })

  it('renders about', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/about',
    })

    expect(response.body).toContain('<h1>About</h1>')
  })

  it('redirects to not found when page does not exist', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/do-not-exist-fake-url',
    })

    expect(response.statusCode).toEqual(302)
    expect(response.headers['location']).toEqual('/not-found')
  })

  it('renders /not-found', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/not-found',
    })

    expect(response.body).toContain('<h1>Not found</h1>')
  })
})

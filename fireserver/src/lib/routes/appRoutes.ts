import { FastifyInstance } from 'fastify'

export const appRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request, response) => {
    // return array with many
    response.send('Hello')
  })
}

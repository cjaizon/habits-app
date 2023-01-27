import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './lib/routes/appRoutes.js'
import { authRoutes } from './lib/routes/authRoutes.js'

const app = Fastify()

app.register(cors)
app.register(appRoutes)
app.register(authRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then((port) => console.log(`HTTP Server running on port ${port}!`))

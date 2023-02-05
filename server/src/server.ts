import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './lib/routes'
import { Auth } from './lib/middleware/Auth'

const app = Fastify()
const auth = new Auth()
// nothing new

app.register(cors)
app.register(auth.decodeToken)
app.register(appRoutes)

const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' }, (err, address) =>
      console.log(`HTTP Server running on port ${address}`)
    )
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()

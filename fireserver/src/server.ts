import express from 'express'
import cors from 'cors'
import { Auth } from './lib/middleware/Auth'
import summaryRoute from './lib/routes/Summary'

const app = express()
const auth = new Auth()
const port = 3333

app.use(cors())
app.use(auth.decodeToken)
app.use(summaryRoute)

app.listen(port, () => {
  console.log(`HTTP Server running on port ${port}!`)
})

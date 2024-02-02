import express from 'express'
import cors from 'cors'
import cp from 'cookie-parser'
import router from './routes/router.js'
import { config } from 'dotenv'
config()

const app = express()
const port = process.env.PORT

app.use(cors({ credentials: true, origin: '*' }))
app.use(express.json())
app.use(cp())

app.use('/', router)

app.listen(port, err => {
  if (err) throw console.log(err)
  console.log(`Running on http://localhost:${port}`)
})
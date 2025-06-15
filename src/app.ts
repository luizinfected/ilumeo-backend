import express from 'express'
import { AppDataSource } from './db'
import cors from 'cors'

import router from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

AppDataSource.initialize().then(() => {
  console.info('Connected to db')
}).catch((err) => {
  console.error('Error on connecting to db: ', err)
})

export default app

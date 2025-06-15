import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.SERVER_PORT || 3333

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`)
})

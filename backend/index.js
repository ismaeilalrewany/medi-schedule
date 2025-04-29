import { app, startApp } from "./app/app.js"
import https from 'https'
import fs from 'fs'
import 'dotenv/config'

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await startApp()

    if (process.env.USE_HTTPS === 'true') {
      const options = {
        key: fs.readFileSync("../localssl/cert.key"),
        cert: fs.readFileSync("../localssl/cert.crt")
      }

      https.createServer(options, app).listen(PORT, () => {
        console.log(`Server connected: https://127.0.0.1:${PORT}`)
      })
    } else {
      app.listen(PORT, () => {
        console.log(`Server connected: http://127.0.0.1:${PORT}`)
      })
    }
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

startServer()
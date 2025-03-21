import { app, startApp } from "./app/app.js"
import 'dotenv/config'

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await startApp()

    app.listen(PORT, () => {
      console.log(`Server connected: http://127.0.0.1:${PORT}`)
    })
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

startServer()
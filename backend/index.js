import app from "./app/app.js"
import 'dotenv/config'

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server connected: http://127.0.0.1:${PORT}`)
})
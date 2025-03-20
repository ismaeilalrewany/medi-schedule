import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@medi-schedule-dev.sqkno.mongodb.net/?retryWrites=true&w=majority&appName=medi-schedule-dev`)
    console.log('Database connected successfully')
  } catch (error) {
    console.log(error)
  }
}

export default connect
import express from 'express'
import connect from './database/connect.js'
import cors from 'cors'
import Admin from './database/models/Admin.js'
import patientsRouter from './routes/patients.js'

export const app = express()

export const startApp = async () => {
  try {
    // Wait for the database connection
    await connect()

    // Create the default admin after connection is established
    await Admin.createDefaultAdmin()

    // Middleware
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // Routes
    app.use('/api/patients', patientsRouter)

    console.log('App initialized successfully')
  } catch (error) {
    console.error('Error initializing app:', error)
    process.exit(1)
  }
}
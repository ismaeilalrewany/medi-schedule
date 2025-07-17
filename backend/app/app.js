import express from 'express'
import connect from './database/connect.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import AdminModel from './database/models/Admin.js'
import patientsRouter from './routes/patients.js'
import doctorsRouter from './routes/doctors.js'
import adminsRouter from './routes/admins.js'
import commonsRouter from './routes/commons.js'
import 'dotenv/config'

export const app = express()

export const startApp = async () => {
  try {
    await connect()
    // await AdminModel.createDefaultAdmin()

    app.use(cors({
      origin: (origin, callback) => {
          const allowedOrigins = [process.env.FRONTEND_URL]
          if (!origin || allowedOrigins.indexOf(origin) !== -1) {
              callback(null, origin)
          } else {
              callback(new Error('Not allowed by CORS'))
          }
      },
      credentials: true,
    }))

    app.use(cookieParser(process.env.COOKIE_SECRET))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // Routes
    app.use('/api/patients', patientsRouter)
    app.use('/api/doctors', doctorsRouter)
    app.use('/api/admins', adminsRouter)
    app.use('/api', commonsRouter)

    // Normalize URL
    app.use((req, res, next) => {
      req.url = req.url.replace(/\/+/g, '/');
      next();
    })

    // Global error handler
    app.use((err, req, res, next) => {
      console.error('Global error:', err)
      
      // Don't expose error details in production
      const isDevelopment = process.env.NODE_ENV === 'development'
      
      res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(isDevelopment && { stack: err.stack }),
        timestamp: new Date().toISOString()
      })
    })

    console.log('App initialized successfully')
  } catch (error) {
    console.error('Error initializing app:', error)
    process.exit(1)
  }
}
import express from 'express'
import connect from './database/connect.js'
// import cookieParser from 'cookie-parser'
import cors from 'cors'
import AdminModel from './database/models/Admin.js'
import patientsRouter from './routes/patients.js'
import doctorsRouter from './routes/doctors.js'
import adminsRouter from './routes/admins.js'
import auth from './middleware/auth.js'

export const app = express()

export const startApp = async () => {
  try {
    // Wait for the database connection
    await connect()

    // Create the default admin after connection is established
    await AdminModel.createDefaultAdmin()

    // Middleware
    // app.use(cors({
    //   origin: (origin, callback) => {
    //     if (!origin || origin === process.env.FRONTEND_URL) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error('Not allowed by CORS'))
    //     }
    //   },
    //   origin: '*', // Allow all
    //   credentials: true,
    //   exposedHeaders: ['Set-Cookie'],
    //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //   allowedHeaders: ['Content-Type', 'Authorization'],
    // }))

    app.use(
      cors({
        origin: process.env.FRONTEND_URL || "https://medi-schedule-epst.vercel.app",
        methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        credentials: true,
      })
    )
    app.options('*', cors())

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    // app.use(cookieParser())

    // Routes
    app.use('/api/patients', patientsRouter)
    app.use('/api/doctors', doctorsRouter)
    app.use('/api/admins', adminsRouter)

    // Check auth common route
    app.get('/api/check-auth', auth, (req, res) => {
      res.status(200).json({ message: 'Authenticated' })
    })

    // Normalize URL
    app.use((req, res, next) => {
      req.url = req.url.replace(/\/+/g, '/');
      next();
    })

    console.log('App initialized successfully')
  } catch (error) {
    console.error('Error initializing app:', error)
    process.exit(1)
  }
}
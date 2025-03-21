import express from 'express'

const router = express.Router()

router.get('/login', (req, res) => {
  res.status(200).json({ message: 'Patient logged in' })
})

export default router
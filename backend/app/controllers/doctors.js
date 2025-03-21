class DoctorsController {
  static async login(req, res) {
    res.status(200).json({ message: 'Login successful' })
  }
}

export default DoctorsController
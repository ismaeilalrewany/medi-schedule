class AdminsController {
  static async login(req, res) {
    res.status(200).json({ message: 'Login successful' })
  }
}

export default AdminsController
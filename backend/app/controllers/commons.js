class CommonsController {
  static checkAuth (req, res) {
    res.status(200).json({ message: 'Authenticated', role: req.user.role })
  }

  static checkServer (req, res) {
    res.status(200).json({ message: 'Server is running' })
  }
}

export default CommonsController
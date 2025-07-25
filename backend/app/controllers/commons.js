class CommonsController {
  static catchNotFound(req, res) {
    res.status(404).json({
      message: 'API endpoint not found',
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    })
  }

  static checkAuth(req, res) {
    res.status(200).json({ message: 'Authenticated', role: req.user.role })
  }

  static checkServer(req, res) {
    res.status(200).json({ message: 'Server is running' })
  }
}

export default CommonsController

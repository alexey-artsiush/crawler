const jwt = require('jsonwebtoken')

module.exports = function() {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).json({message: "No authorization"})
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if (decoded.isActivated === false) {
        return res.status(403).json({message: "Profile activation required"})
      }
      req.user = decoded;
      next()
      } catch (e) {
        res.status(401).json({message: "No authorization"})
    }
  };
}




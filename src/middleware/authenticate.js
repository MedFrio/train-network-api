// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = decoded.userId; // Assuming the payload has userId field
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = authenticate;

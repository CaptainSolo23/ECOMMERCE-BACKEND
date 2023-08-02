// middleware para verificar si el usuario tiene rol de "admin"
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

const isAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtenemos el token del encabezado
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener los datos del usuario con el id del payload del token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401);
        throw new Error('Usuario no encontrado');
      }

      // Verificar si el usuario tiene el rol de "admin"
      if (user.role !== 'admin') {
        res.status(403);
        throw new Error('Authorization denied: not admin');
      }

      // Asignar el usuario verificado a req.user
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Acceso no autorizado');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('No se proporcionó ningún token');
  }
});

module.exports = { isAdmin };

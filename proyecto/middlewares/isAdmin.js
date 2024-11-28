// middlewares/isAdmin.js

const isAdmin = (req, res, next) => {
  // Verificar si el usuario está autenticado y tiene el rol de "admin"
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next(); // El usuario es admin, continuar con la petición
  } else {
    // Si no es admin, redirigir al login o mostrar un mensaje de error
    return res
      .status(403)
      .send(
        "Acceso denegado. Solo los administradores pueden cargar archivos."
      );
  }
};

module.exports = isAdmin;

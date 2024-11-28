var express = require("express");
var router = express.Router();
var isAuthenticated = require("../middlewares/isAuthenticated");

// Redirigir a login si el usuario no está autenticado
router.get("/", (req, res) => {
  try {
    console.log("entree");

    if (!req.isAuthenticated()) {
      return res.redirect("/auth/login");
    }

    res.render("index", { user: req.user }); // Pasa el usuario a la vista
  } catch (err) {
    console.error("Error en la ruta /: ", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

// Página de login
router.get("/login", (req, res) => {
  res.render("login"); // Muestra el formulario de login
});

// Procesar login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

// Página de registro
router.get("/register", (req, res) => {
  res.render("register"); // Muestra el formulario de registro
});

// Procesar registro
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already taken");
    }

    // Crear el nuevo usuario
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect("/auth/login"); // Redirigir a login después de registrarse
  } catch (err) {
    res.status(500).send("Error registering user");
  }
});

// Ruta de logout
router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/auth/login"));
});

module.exports = router;

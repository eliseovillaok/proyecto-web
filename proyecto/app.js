var express = require("express");
var path = require("path");
var logger = require("morgan");
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
const User = require("./models/user");

const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var uploadRouter = require("./routes/upload");

// Usuario admin por defecto.
(async () => {
  const admin = await User.findOne({ username: "admin" });
  if (!admin) {
    const newAdmin = new User({
      username: "admin",
      password: "admin",
      role: "admin",
    });
    await newAdmin.save();
    console.log("Admin user created: admin/admin");
  }
})();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configuración de la estrategia local de Passport
passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialización y deserialización del usuario
passport.serializeUser((user, done) => {
  done(null, user.id); // Guardar solo el id en la sesión
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Recuperar el usuario completo de la base de datos
    done(null, user); // Guardar el usuario completo en req.user
  } catch (err) {
    done(err);
  }
});

// Configuración de sesión
app.use(
  session({
    secret: "secret_key", // cambiarla en produccion
    resave: false,
    saveUninitialized: true,
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session()); // Ahora passport.session() se ejecuta después de la sesión

// Rutas
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/upload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // Llama al middleware de error 404
});

// Error handler middleware
app.use(function (err, req, res, next) {
  // Si es un error 404, renderiza la página de error personalizada
  if (err.status === 404) {
    res.status(404);
    res.render("error-404"); // Renderiza error-404.pug
  } else {
    // En caso de otros errores, renderiza el error genérico
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err, // Esto solo se muestra en desarrollo
    });
  }
});

// Conexión a MongoDB
var url = process.env.DATABASE_URL; // DATABASE_URL de docker-compose.yml en Express
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

module.exports = app;

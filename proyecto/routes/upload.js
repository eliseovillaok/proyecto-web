const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Crea la carpeta uploads si no existe
}

const upload = multer({
  dest: uploadDir,
});

router.post("/dataset", isAdmin, upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    console.log("Archivo cargado correctamente:", filePath);
    //
    // ACÁ VA LA LOGICA QUE AGARRA EL ARCHIVO Y LO CARGA EN MEILISEARCH
    //
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar el archivo.");
  }
});

module.exports = router;

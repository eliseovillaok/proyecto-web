const express = require("express");
const router = express.Router();
const multer = require("multer");
const isAdmin = require("../middlewares/isAdmin");

// Configuración de multer para subir archivos
const upload = multer({ dest: "uploads/" });

router.post("/upload", isAdmin, upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Procesa el archivo .xlsx y envíalo a MeiliSearch
    // (Implementa la lógica de procesamiento aquí)
    res.send("Archivo cargado correctamente y procesado.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar el archivo.");
  }
});

module.exports = router;

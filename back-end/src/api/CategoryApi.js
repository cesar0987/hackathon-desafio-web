const express = require("express");
const multer = require("multer");
const path = require('path');
const router = express.Router();
const categoryService = require("../services/CategoryService");

// Configurar almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'images')); // Cambia la ruta según la estructura de tu proyecto
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get("/categorylist", async (req, res) => {
  try {
    const categorias = await categoryService.getCategories();
    res.status(200).json(categorias);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error al intentar listar las categorías" });
  }
});

router.post("/create", upload.single('imagen'), async (req, res) => {
  try {
    const categoryData = {
      nombre: req.body.nombre,
      imagen: req.file ? `/images/${req.file.filename}` : null
    };
    const response = await categoryService.createCategory(categoryData);

    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }

    res.status(200).json({ message: response.message });
  } catch (error) {
    res.status(500).json({ message: "Error al intentar guardar" });
  }
});

module.exports = router;

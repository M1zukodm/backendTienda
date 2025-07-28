// Rutas para el producto
const express = require('express');
const router = express.Router();
const productoController= require('../controllers/producto');

// /api/productos
router.post('/', productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.put('/:id', productoController.actualizarProducto);
router.get('/:id', productoController.obtenerProducto);
router.delete('/:id', productoController.eliminarProducto);



router.get('/', (req, res) => {
    res.send('Creando producto...');
});


module.exports = router;

const Producto = require("../models/Producto");

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();

    res.status(201).json({
      msg: 'Producto creado con éxito',
      producto
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);




  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Obtener un solo producto
exports.obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: 'No existe el producto' });
    }

    res.json({
      msg: 'Producto encontrado',
      producto
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    const { nombre, categoria, ubicacion, precio } = req.body;
    let producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: 'No existe el producto' });
    }

    producto.nombre = nombre;
    producto.categoria = categoria;
    producto.ubicacion = ubicacion;
    producto.precio = precio;

    producto = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      producto,
      { new: true }
    );

    res.json({
      msg: 'Producto actualizado con éxito',
      producto
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: 'No existe el producto' });
    }

    await Producto.findByIdAndDelete(req.params.id);

    res.json({
      msg: 'Producto eliminado con éxito',
      id: req.params.id
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

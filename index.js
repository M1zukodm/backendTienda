const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Creamos el servidor
const app = express();

// Conexión a la base de datos
conectarDB();
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Ruta base para productos
app.use('/api/productos', require('./routes/producto'));

// Ruta principal (opcional, útil para pruebas)
app.get('/', (req, res) => {
    res.send('🚀 API funcionando correctamente');
});



// Escuchamos el puerto
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
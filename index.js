const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Creamos el servidor
const app = express();

// Conexión a la base de datos (usa variable de entorno en producción)
conectarDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', require('./routes/producto'));

// Ruta principal (opcional)
app.get('/', (req, res) => {
    res.send('🚀 API funcionando correctamente en Vercel');
});

// Configuración para Vercel
const PORT = process.env.PORT || 4000;  // Usa el puerto de Vercel o 4000 en local

if (require.main === module) {
    // Solo inicia el servidor si se ejecuta directamente (no en Vercel)
    app.listen(PORT, () => {
        console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
    });
}

// Exporta la app para Vercel (IMPORTANTE)
module.exports = app;
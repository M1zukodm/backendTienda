const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Creamos el servidor
const app = express();

// Conexión a la base de datos
conectarDB();

// Lista blanca de dominios permitidos
const whitelist = [
  'https://registro-tienda-sandy.vercel.app',
  'http://localhost:4200',    // Frontend en desarrollo (Angular)
  'http://localhost:4000'     // Backend local si necesitas
];

// Opciones de CORS más flexibles para desarrollo
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como apps móviles o Postman)
    if (!origin) return callback(null, true);
    
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Origen no permitido por CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,  // Si necesitas cookies/tokens
  optionsSuccessStatus: 200
};

// Aplicar CORS
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Ruta base para productos
app.use('/api/productos', require('./routes/producto'));

// Ruta principal
app.get('/', (req, res) => {
    res.send('🚀 API funcionando correctamente');
});

// Escuchamos el puerto
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
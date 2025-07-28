const mongoose = require('mongoose');

// Carga variables .env SOLO en desarrollo (no en Vercel)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const conectarDB = async () => {
    try {
        const connectionString = process.env.DB_MONGO || process.env.MONGODB_URI;
        if (!connectionString) {
            throw new Error('❌ No se encontró la URI de MongoDB. Revisa tus variables de entorno.');
        }

        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Conectado a MongoDB correctamente');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        process.exit(1); // Detiene la aplicación
    }
};

module.exports = conectarDB;
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variable.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO);
        console.log('✅ Conectado a la base de datos correctamente');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
        process.exit(1); // Detiene la app
    }
};

module.exports = conectarDB;
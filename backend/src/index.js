// backend/src/index.js
const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Cargar variables desde .env
dotenv.config();

// Configurar base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Crear app Express
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando!');
});

// Ruta de ejemplo para probar conexión a PostgreSQL
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ conectado: true, fecha: result.rows[0].now });
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
    res.status(500).json({ conectado: false });
  }
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

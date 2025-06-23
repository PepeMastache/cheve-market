const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware falso de autenticación (temporal)
router.use((req, res, next) => {
  req.user = { role: 'admin', id: '00000000-0000-0000-0000-000000000000' }; // Simulación
  next();
});

// POST /api/discount-codes — Crear un nuevo código de descuento
router.post('/', async (req, res) => {
  const { affiliate_id, code, pct_discount, pct_commission, expires_at } = req.body;

  if (!affiliate_id || !code || pct_discount == null || pct_commission == null) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  if (pct_discount < 0 || pct_discount > 100 || pct_commission < 0 || pct_commission > 100) {
    return res.status(400).json({ error: 'Porcentajes inválidos' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO discount_code (affiliate_id, code, pct_discount, pct_commission, expires_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [affiliate_id, code.toLowerCase(), pct_discount, pct_commission, expires_at]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'El código ya existe' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/discount-codes/:code — Obtener información de un código
router.get('/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query(
      `SELECT *, (expires_at IS NULL OR expires_at > now()) AS is_active
       FROM discount_code WHERE code = $1`,
      [code.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Código no encontrado' });
    }

    const data = result.rows[0];
    res.json({
      code: data.code,
      pct_discount: data.pct_discount,
      is_active: data.is_active,
      expires_at: data.expires_at,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Lógica de ejemplo para aplicar el descuento en una orden
async function aplicarDescuentoEnOrden({ total, code }) {
  try {
    const result = await pool.query(
      `SELECT * FROM discount_code WHERE code = $1 AND (expires_at IS NULL OR expires_at > now())`,
      [code.toLowerCase()]
    );

    if (result.rows.length === 0) return { totalFinal: total, descuento: 0, valido: false };

    const { id, pct_discount } = result.rows[0];
    const descuento = (pct_discount / 100) * total;
    const totalFinal = total - descuento;

    // Aquí registrarías el discount_code.id en la orden:
    // await pool.query(`INSERT INTO "order" (...) VALUES (..., $discount_code_id)`);

    return { totalFinal, descuento, discount_code_id: id, valido: true };
  } catch (err) {
    console.error(err);
    return { totalFinal: total, descuento: 0, valido: false };
  }
}

module.exports = { router, aplicarDescuentoEnOrden };

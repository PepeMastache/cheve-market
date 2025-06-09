const express = require('express');
const router = express.Router();

// Requiere el Pool desde el archivo principal (lo pasaremos más adelante si modularizamos)
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
  SELECT 
    p.id, p.slug, p.name, p.brand, p.style, 
    p.volume_ml, p.abv, p.rating_avg,
    (
      pp.base_cost + pp.operational_cost +
      (pp.base_cost + pp.operational_cost) * (pp.fixed_profit_margin + pp.variable_margin) / 100
    ) AS final_price,
    COALESCE(json_agg(pi.url ORDER BY pi.sort_order) FILTER (WHERE pi.url IS NOT NULL), '[]') AS images
  FROM product p
  LEFT JOIN product_price pp ON pp.product_id = p.id
  LEFT JOIN product_image pi ON pi.product_id = p.id
  GROUP BY p.id, pp.base_cost, pp.operational_cost, pp.fixed_profit_margin, pp.variable_margin
  ORDER BY p.name
`);

    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET /api/products?page=1&limit=6
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(`
      SELECT 
        p.id, p.slug, p.name, p.brand, p.style, 
        p.volume_ml, p.abv, p.rating_avg,
        COALESCE((
          COALESCE(pp.base_cost, 0) + COALESCE(pp.operational_cost, 0) +
          (COALESCE(pp.base_cost, 0) + COALESCE(pp.operational_cost, 0)) *
          (COALESCE(pp.fixed_profit_margin, 0) + COALESCE(pp.variable_margin, 0)) / 100
        ), 0)::numeric(10,2) AS final_price,
        COALESCE(json_agg(pi.url ORDER BY pi.sort_order) FILTER (WHERE pi.url IS NOT NULL), '[]') AS images
      FROM product p
      LEFT JOIN product_price pp ON pp.product_id = p.id
      LEFT JOIN product_image pi ON pi.product_id = p.id
      GROUP BY p.id, pp.base_cost, pp.operational_cost, pp.fixed_profit_margin, pp.variable_margin
      ORDER BY p.name
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    // Verificamos si aún hay más
    const countResult = await pool.query('SELECT COUNT(*) FROM product');
    const total = parseInt(countResult.rows[0].count, 10);
    const hasMore = offset + limit < total;

    res.json({
      products: result.rows,
      hasMore: result.rows.length === limit
    });
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});


// GET /api/products/all - Para productos destacados sin paginación
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id, p.slug, p.name, p.brand, p.style, 
        p.volume_ml, p.abv, p.rating_avg,
        COALESCE((
          COALESCE(pp.base_cost, 0) + COALESCE(pp.operational_cost, 0) +
          (COALESCE(pp.base_cost, 0) + COALESCE(pp.operational_cost, 0)) *
          (COALESCE(pp.fixed_profit_margin, 0) + COALESCE(pp.variable_margin, 0)) / 100
        ), 0)::numeric(10,2) AS final_price,
        COALESCE(json_agg(pi.url ORDER BY pi.sort_order) FILTER (WHERE pi.url IS NOT NULL), '[]') AS images
      FROM product p
      LEFT JOIN product_price pp ON pp.product_id = p.id
      LEFT JOIN product_image pi ON pi.product_id = p.id
      GROUP BY p.id, pp.base_cost, pp.operational_cost, pp.fixed_profit_margin, pp.variable_margin
      ORDER BY p.name
    `);
    res.json({ products: result.rows });
  } catch (err) {
    console.error('Error al obtener productos (all):', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        p.id, p.slug, p.name, p.brand, p.style, 
        p.volume_ml, p.abv, p.rating_avg,
        COALESCE((
          COALESCE(pp.base_cost, 0) + COALESCE(pp.operational_cost, 0) +
          (COALESCE(pp.base_cost, 0) + COALESCE(pp.operational_cost, 0)) *
          (COALESCE(pp.fixed_profit_margin, 0) + COALESCE(pp.variable_margin, 0)) / 100
        ), 0)::numeric(10,2) AS final_price,
        COALESCE(json_agg(pi.url ORDER BY pi.sort_order) FILTER (WHERE pi.url IS NOT NULL), '[]') AS images
      FROM product p
      LEFT JOIN product_price pp ON pp.product_id = p.id
      LEFT JOIN product_image pi ON pi.product_id = p.id
      WHERE p.slug = $1
      GROUP BY p.id, pp.base_cost, pp.operational_cost, pp.fixed_profit_margin, pp.variable_margin
      LIMIT 1
    `, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener producto por slug:', err);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

module.exports = router;

// backend/src/routes/affiliate-links.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const slugify = require('slugify');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// POST /api/affiliate-links
router.post('/', async (req, res) => {
  const { affiliate_id, product_id } = req.body;

  if (!affiliate_id || !product_id) {
    return res.status(400).json({ error: 'Faltan affiliate_id o product_id' });
  }

  try {
    const productResult = await pool.query('SELECT slug FROM product WHERE id = $1', [product_id]);
    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const productSlug = productResult.rows[0].slug;

    const affiliateResult = await pool.query(
      'SELECT display_name FROM affiliate_profile WHERE user_id = $1',
      [affiliate_id]
    );
    if (affiliateResult.rows.length === 0) {
      return res.status(404).json({ error: 'Afiliado no encontrado' });
    }

    const ref = slugify(affiliateResult.rows[0].display_name, { lower: true });
    const finalSlug = `${productSlug}?ref=${ref}`;

    const existing = await pool.query(`
      SELECT slug FROM affiliate_link
      WHERE affiliate_id = $1 AND product_id = $2
      LIMIT 1
    `, [affiliate_id, product_id]);

    const baseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:5173';

    if (existing.rows.length > 0) {
      return res.status(200).json({
        link: `${baseUrl}/producto/${existing.rows[0].slug}`,
        existing: true,
      });
    }

    await pool.query(`
      INSERT INTO affiliate_link (affiliate_id, product_id, slug)
      VALUES ($1, $2, $3)
    `, [affiliate_id, product_id, finalSlug]);

    res.status(201).json({
      link: `${baseUrl}/producto/${finalSlug}`,
      existing: false,
    });

  } catch (err) {
    console.error('Error al generar enlace de afiliado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;

// backend/src/routes/affiliate.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { slugify } = require('../utils/slugify'); // Lo crearemos enseguida

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// POST /api/affiliate-link
router.post('/affiliate-link', async (req, res) => {
  const { product_id, affiliate_id } = req.body;

  if (!product_id || !affiliate_id) {
    return res.status(400).json({ error: 'product_id y affiliate_id son obligatorios' });
  }

  try {
    // Verifica que el producto y afiliado existan
    const [productRes, affiliateRes] = await Promise.all([
      pool.query('SELECT slug FROM product WHERE id = $1', [product_id]),
      pool.query('SELECT display_name FROM affiliate_profile WHERE user_id = $1', [affiliate_id])
    ]);

    if (productRes.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    if (affiliateRes.rows.length === 0) return res.status(404).json({ error: 'Afiliado no encontrado' });

    const { slug } = productRes.rows[0];
    const { display_name } = affiliateRes.rows[0];
    const cleanRef = slugify(display_name);

    const generatedSlug = `${slug}-${cleanRef}`;

    // Verifica si ya existe
    const existing = await pool.query(
      'SELECT slug FROM affiliate_link WHERE affiliate_id = $1 AND product_id = $2',
      [affiliate_id, product_id]
    );

    if (existing.rows.length > 0) {
      return res.json({
        link: `https://chevemarket.com/shop/${slug}?ref=${cleanRef}`,
        message: 'Ya existe este enlace de afiliado'
      });
    }

    // Inserta nuevo enlace
    await pool.query(
      'INSERT INTO affiliate_link (affiliate_id, product_id, slug) VALUES ($1, $2, $3)',
      [affiliate_id, product_id, generatedSlug]
    );

    res.json({
      link: `https://chevemarket.com/shop/${slug}?ref=${cleanRef}`
    });

  } catch (err) {
    console.error('Error al crear enlace de afiliado:', err);
    res.status(500).json({ error: 'Error interno al crear el enlace' });
  }
});

module.exports = router;

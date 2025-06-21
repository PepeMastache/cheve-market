// src/routes/track-click.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post('/', async (req, res) => {
  const { slug, ref, sessionId } = req.body;

  if (!slug || !ref || !sessionId) {
    return res.status(400).json({ error: 'Datos incompletos para registrar clic' });
  }

  try {
    const fullSlug = `${slug}?ref=${ref}`;

    const linkResult = await pool.query(
      `SELECT id AS link_id, affiliate_id FROM affiliate_link WHERE slug = $1 LIMIT 1`,
      [fullSlug]
    );

    if (linkResult.rowCount === 0) {
      return res.status(404).json({ error: 'Enlace de afiliado no válido' });
    }

    const { link_id, affiliate_id } = linkResult.rows[0];

    // En el futuro puedes guardar user_id real si hay login
    const user_id = null;

    await pool.query(
      `INSERT INTO qualified_click (link_id, user_id, session_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, link_id) DO NOTHING`,
      [link_id, user_id, sessionId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Error al registrar clic:', err);
    res.status(500).json({ error: 'Error al registrar clic' });
  }
});

module.exports = router;

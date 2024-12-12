const express = require('express');
const pool = require('../db');
const response = require('../response');
const router = express.Router();

router.get('/', async (req, res) => {
  const { search, kategori } = req.query;

  try {
    if (search){
      const result = await pool.query(
        'SELECT * FROM menus WHERE LOWER(nama) LIKE $1',
        [`%${search.toLowerCase()}%`]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No data found for the specified search query" });
      }
      response(200, result.rows, 'Filtered menu items fetched successfully', res);
    } else if (kategori) {
      const result = await pool.query(
        'SELECT * FROM menus WHERE LOWER(kategori) = $1',
        [kategori]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No data found for the specified category" });
      }
      response(200, result.rows, 'Filtered menu items fetched successfully', res);
    } else {
      const result = await pool.query('SELECT * FROM menus');
      response(200, result.rows, 'Menu items fetched successfully', res);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Menu item not found' });
    } else {
      response(200, result.rows[0], 'Menu item fetched successfully', res);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

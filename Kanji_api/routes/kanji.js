const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/level/:level', (req, res) => {
    const level = req.params.level?.replace('N', '');  // 'N4' -> '4'
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
  
    db.all(
      'SELECT * FROM Kanji WHERE jlpt_level = ? LIMIT ? OFFSET ?',
      [level, limit, offset],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
  });

router.get('/:character', (req, res) => {
    const char = req.params.character;
    db.get('SELECT * FROM Kanji WHERE character = ? ', [char], (error, row) => {
        if (error) return res.status(500).json({error: error.message});
        if (!row) return res.status(404).json({message: 'Not Found'});
        res.json(row);
    });
} )

module.exports = router;
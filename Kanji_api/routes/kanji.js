const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/:character', (req, res) => {
    const char = req.params.character;
    db.get('SELECT * FROM Kanji WHERE character = ? ', [char], (error, row) => {
        if (error) return res.status(500).json({error: error.message});
        if (error) return res.status(404).json({message: 'Not Found'});
        res.json(row);
    });
} )

module.exports = router;
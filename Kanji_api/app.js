const express = require("express")
const app = express()
const kanjiRouter = require("./routes/kanji");
const db = require('./db');

// Kanji Route
app.use('/kanji', kanjiRouter)

// vocab Route
app.get('/vocab/:level', (req,res) => {
    const level = req.params.level?.toUpperCase();
    const limit = parseInt(req.query.limit) || 100;  // default to 100
    const offset = parseInt(req.query.offset) || 0;

    if (!level) {
        return res.status(400).json({ error: 'JLPT level is required in URL' });
      };

      db.all(
        'SELECT * FROM Vocab WHERE jlpt_level = ? LIMIT ? OFFSET ?',
        [level, limit, offset],
        (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(rows);
        }
      );
});


app.listen(3000, () => {
    console.log('Kanji API is running at http://localhost:3000');
});


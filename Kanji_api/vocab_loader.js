const fs = require('fs');
const db = require('./db');
const csv = require('csv-parser');
const path = require('path');

const levels = ['N1', 'N2', 'N3', 'N4', 'N5'];
const vocab_path = path.join(__dirname, 'data', 'vocab_list');

// Create SQlite table

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Vocab (
        expression TEXT PRIMARY KEY,
        reading TEXT,
        meaning TEXT,
        jlpt_level TEXT
        )`);
});

// insert data

const insert = db.prepare(`INSERT OR IGNORE INTO Vocab
    (expression, reading, meaning, jlpt_level)
    VALUES(?,?,?,?)`);


// read data file

levels.forEach(level => {
    const fileName = `${level.toLowerCase()}.csv`;
    const filePath = path.join(vocab_path,fileName);

    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      const expression = row.expression;
      const reading = row.reading;
      const meaning = row.meaning;

      if (expression && reading && meaning) {
        insert.run(expression, reading, meaning, level);
      }
    })

    .on('end', () => {
      console.log(`✅ Loaded ${fileName}`);
    });
});

// Finalize insert after all files processed (optional delay if needed)
setTimeout(() => {
    insert.finalize();
    console.log('🎉 All vocab loaded to SQLite!');
  }, 3000); // 3 second delay to allow streams to finish

const fs = require('fs');
const xml2js = require('xml2js');
const db = require('./db')

const xmlFile = './data/kanjidic2.xml';

//Prepare for the data base

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Kanji (
        character TEXT PRIMARY KEY,
        meaning TEXT,
        onyomi TEXT,
        kunyomi TEXT,
        jlpt_level TEXT
    )`)
});

// Parse xml file

const parser = new xml2js.Parser({ explicitArray: true });

fs.readFile(xmlFile, (error, data) => {
    if(error) {
        console.log("Failed to read xml file", error);
        return
    }

    parser.parseString(data, (error, result) => {
        if (error) {
            console.log("Failed to parse xml", error);
            return;

        }
        // ✅ Safe path to character list
        const characters = result.kanjidic2?.character || result.kanjidic?.character;

        if (!characters || characters.length === 0) {
        console.error('No kanji characters found in XML. ❌ Check XML structure.');
        return;
        }


        const insert = db.prepare(`INSERT OR IGNORE INTO Kanji 
            (character, meaning, onyomi, kunyomi, jlpt_level) 
            VALUES (?, ?, ?, ?, ?)`);

        characters.forEach(entry => {
            const literal = entry.literal?.[0];
            const readings = entry.reading_meaning?.[0]?.rmgroup?.[0]; 


            const meanings = (readings?.meaning || [] )
            .filter(m => typeof m === 'string')     // skip those with lang attributes
            .join(', ');

            const onyomi = (readings?.reading || [] )
            .filter(r => r.$.r_type === 'ja_on')
            .map(r => r._)
            .join(', ');

            const kunyomi = (readings?.reading || [] )
            .filter(r => r.$.r_type === 'ja_kun')
            .map(r => r._)
            .join(', ');

            const jlpt = entry.misc?.[0]?.jlpt?.[0] || null;

            insert.run(literal, meanings, onyomi, kunyomi, jlpt)
        });

        insert.finalize(() => {
            console.log("All Kanji loaded to SQLite DB!!!");
        });
    });
});


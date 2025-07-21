const express = require("express")
const app = express()
const kanjiRouter = require("./routes/kanji");

app.use('/kanji', kanjiRouter)

app.listen(3000, () => {
    console.log('Kanji API is running at http://localhost:3000');
});


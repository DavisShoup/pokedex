const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon.js');
const port = 3000

app.listen(port, () =>{
    console.log("listening!")
})

// INDEX
app.get('/pokedex', (req, res) => {
res.render('index.ejs', { data: Pokemon });
});


// SHOW
app.get('pokedex/:id', (req, res) => {
res.render('show.ejs', { data: Pokemon[req.params.id] });
});
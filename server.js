const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon.js');
const port = 3000
const methodOverride = require("method-override")
const { send } = require('express/lib/response');


//MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(express.static(__dirname + "/public"));

//LISTEN
app.listen(port, () =>{
    console.log("listening!")
})

// INDEX
app.get('/pokedex', (req, res) => {
res.render('index.ejs', { data: Pokemon });
});

// NEW
app.get("/pokedex/new", (req,res) => {
    res.render("new.ejs")
})

// DELETE

app.delete("/pokedex/:index", (req, res) => {
    Pokemon.splice(req.params.index, 1)
    res.redirect("/pokedex") 
  })  

// UPDATE

app.put("/pokedex/:index", (req, res) => {
    Pokemon[req.params.index].name = req.body.name
    Pokemon[req.params.index].id = req.body.id
    Pokemon[req.params.index].type = req.body.type
    Pokemon[req.params.index].stats.hp = req.body.hp
    Pokemon[req.params.index].stats.attack = req.body.attack
    Pokemon[req.params.index].stats.defense= req.body.defense
    res.redirect("/pokedex")
  })

// CREATE
app.post("/pokedex", (req, res) => {
    console.log(req.body);
    const createPokemon = {
      img: req.body.img,
      name: req.body.name,
      id: req.body.id,
      type: req.body.type,
      stats: {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
      }
    }
    Pokemon.unshift(createPokemon)
    res.redirect("/pokedex")
  })

// EDIT

app.get("/pokedex/:index/edit", (req, res) => {
    res.render(
      "edit.ejs",
      {
        data: Pokemon[req.params.index],
        index: req.params.index,
      }
    )
})


// SHOW
app.get('/pokedex/:index', (req, res) => {
res.render('show.ejs', { data: Pokemon[req.params.index], });
});



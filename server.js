const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon.js');
const port = 3000
const methodOverride = require("method-override")
const { send } = require('express/lib/response');


//MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method")) 

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
    Pokemon.splice(req.params.index, 1) //remove the item from the array
    res.redirect("/pokedex") //redirect back to index route
  })  

// UPDATE

app.put("/pokedex/:index", (req, res) => {
    Pokemon[req.params.index] = req.body //in our fruits array, find the index that is specified in the url (:indexOfFruitsArray).  Set that element to the value of req.body (the input data)
    res.redirect("/pokedex") //redirect to the index page
  })

// CREATE
app.post("/pokedex", (req, res) => {
    Pokemon.push(req.body)
    res.redirect("/pokedex") //send the user back to /fruits
  })

// EDIT

app.get("/pokedex/:index/edit", (req, res) => {
    res.render(
      "edit.ejs", //render views/edit.ejs
      {
        //pass in an object that contains
        data: Pokemon[req.params.index], //the fruit object
        index: req.params.index, //... and its index in the array
      }
    )
  })


// SHOW
app.get('/pokedex/:index', (req, res) => {
res.render('show.ejs', { data: Pokemon[req.params.index], });
});



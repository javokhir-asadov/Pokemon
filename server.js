// Require our dependencies
const express = require("express");
const pokemon = require("./models/pokemon.js");
const methodOverride = require("method-override");

// Initialize Express App
const app = express();

// Mount middleware
// static files
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

//-------ROUTES------//
//------ INDEX-------//
app.get("/pokemon", (req, res) => {
  res.render("index.ejs", { data: pokemon });
});

//--------NEW--------//
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});

//----DELETE-------//
app.delete("/pokemon/:indexOfPokemonArray", (req, res) => {
  pokemon.splice(req.params.indexOfPokemonArray, 1);
  res.redirect("/pokemon");
});
//---------Update---------//
app.put("/pokemon/:indexOfPokemonArray", (req, res) => {
  req.body.stats = {
    attack: req.body.attack,
    defense: req.body.defense,
    hp: req.body.hp,
    name: req.body.name,
  };
  if (req.body.name === pokemon[req.params.indexOfPokemonArray].name) {
    req.body.img = pokemon[req.params.indexOfPokemonArray].img;
  } else {
    req.body.img = "/images/Poke_Ball.png";
  }
  pokemon[req.params.indexOfPokemonArray] = req.body;
  res.redirect("/pokemon");
});
///--Create----POST-------//
app.post("/pokemon", (req, res) => {
  req.body.stats = {
    attack: req.body.attack,
    defense: req.body.defense,
    hp: req.body.hp,
  };
  for (let i = 0; i < Math.floor(Math.random() * 40); i++) {
    req.body.img = pokemon[i].img
  }
  pokemon.unshift(req.body);
  res.redirect("pokemon");
});


//----------Show------------//
app.get("/pokemon/:id", (req, res) => {
  res.render("show.ejs", { data: pokemon[req.params.id] });
});

//--------Edit-------//
app.get("/pokemon/:indexOfPokemonArray/edit", (req, res) => {
  res.render("edit.ejs", {
    data: pokemon[req.params.indexOfPokemonArray],
    index: req.params.indexOfPokemonArray,
  });
});

app.listen(3000);

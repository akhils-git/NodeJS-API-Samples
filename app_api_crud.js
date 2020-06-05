const express = require("express");
// For Validation
const Joi = require("joi");
const app = express();

//For JSON Parameter Supply
app.use(express.json());

const players = [
  { id: 1, name: "Sachin" },
  { id: 2, name: "Savrav" },
  { id: 3, name: "Dravid" },
  { id: 4, name: "Pathan" },
];

// ------ API Calls, With Parameters and Query Strings
app.get("/", (req, res) => {
  res.send("Welcome NodeJS API CRUD Oprations.");
});

app.get("/api/test/:id/:name", (req, res) => {
  res.send(req.params);
});
app.get("/api/test/withquerystring/:id", (req, res) => {
  res.send(req.query);
});

// ------ CRUD Oprations Started------

// Get All Players
app.get("/api/players", (req, res) => {
  res.send(players);
});
//Get a player by id
app.get("/api/players/:id", (req, res) => {
  const player = players.find((p) => p.id === parseInt(req.params.id));
  if (!player) {
    res.status(404).send("Given id not found !");
    return;
  } else {
    res.send(player);
  }
  res.send(player);
});

// Add new Player
app.post("/api/players", (req, res) => {
  const schima = {
    //id: Joi.number().integer(),
    name: Joi.string().min(3).max(10).required(),
  };

  // Basic Parameter validation
  //   if (!req.body.name || req.body.name.length < 3) {
  //     res.status(400).send("Bad Requst, Parameter incurrect !");
  //     return;
  //   }

  // Parameter validation useing Joi Library
  const result = Joi.validate(req.body, schima);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const player = {
    id: players.length + 1,
    name: req.body.name,
  };
  players.push(player);
  res.send(players);
});

//Update Player
app.put("/api/players", (req, res) => {
  const schima = {
    id: Joi.number().integer(),
    name: Joi.string().min(3).max(10).required(),
  };
  const result = Joi.validate(req.body, schima);

  // Finding Player
  const player = players.find((p) => p.id === parseInt(req.body.id));
  if (!player) {
    res.status(404).send("Given id not found !");
    return;
  }
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  player.name = req.body.name;
  res.send(player);
});
//Delete Player
app.delete("/api/players/:id", (req, res) => {
  // Finding Player
  const player = players.find((p) => p.id === parseInt(req.params.id));
  if (!player) {
    res.status(404).send("Given id not found !");
    return;
  }

  const index = players.indexOf(player);
  players.splice(index, 1);
  res.send(player);
});
// Server Listening
app.listen(4000, () => {
  console.log("Listening port 4000");
});

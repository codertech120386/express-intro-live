const express = require("express");
const app = express();

const users = require("./users.json");

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(users);
});

// users/dates
app.get("/users/dates", (req, res) => {
  res.send("User Dates");
});

app.get("/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = users.filter((user) => user.id === id);
  res.send(user);
});

app.put("/users/:id", (req, res) => {
  const id = +req.params.id;
  const userBody = req.body;
  const updatedUsers = users.map((user) => (user.id === id ? userBody : user));
  res.status(201).json(updatedUsers);
});

app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  const updatedUsers = users.filter((user) => user.id !== id);
  res.status(200).json(updatedUsers);
});

app.listen(1234, function () {
  console.log("Listening on 1234");
});

function logger(req, res, next) {
  console.log("Logging before");
  next();
  console.log("Logging after");
}

// get, put, patch, post, delete

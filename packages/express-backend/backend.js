import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";
import user from "./models/user.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices.getUsers(name, job)
    .then((result) => {
      const usersList = { users_list: result };
      res.send(usersList);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices.findUserById(id)
    .then((result) => {
      if (result) res.send(result);
      else res.status(404).send(`Not Found: ${id}`);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices.deleteUserById(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});
  
app.post("/users", (req, res) => {
  const user = req.body;
  userServices.addUser(user)
    .then((savedUser) => {
      if (savedUser) res.status(201).send(savedUser);
      else res.status(500).send("Internal Server Error");
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});


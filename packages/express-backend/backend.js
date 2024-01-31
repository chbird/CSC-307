// npm run dev to start localhost
import cors from "cors";
import express from "express";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`
    );
});

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Waiter"
      }
    ]
  };

  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  // http://localhost:8000/users?name=Mac will return
  // {"users_list":[{"id":"abc123","name":"Mac","job":"Bouncer"},{"id":"ppp222","name":"Mac","job":"Professor"}]}

  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

  const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});
// http://localhost:8000/users/zap555 will return
//{"id":"zap555","name":"Dennis","job":"Waiter"}

const addUser = (user) => {
  const randomId = generateRandomId();
  user.id = randomId;
  users["users_list"].push(user);
  return user;
};

const generateRandomId = () => {
  // Generate a random 6-character ID
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';
  for (let i = 0; i < 6; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomId;
};

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user.id === id);
  if (index !== -1) {
    const deletedUser = users["users_list"].splice(index, 1)[0];
    return deletedUser;
  } else {
    return null; 
  }
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deletedUser = deleteUserById(id);

  if (deletedUser) {
    res.status(204).send(); 
  } else {
    res.status(404).send("Resource not found.");
  }
});
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    res.status(201).json(addUser(userToAdd));
  });
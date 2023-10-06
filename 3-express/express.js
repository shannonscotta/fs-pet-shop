// set up dependencies
import express from "express";
import fs from "fs";

const app = express();

//middleware is used between the req and res
app.use(express.json());
const port = 8000;

//handle requests with routes
app.get("/", (req, res) => {
  res.send("pets go here");
});

app.get("/pets", (req, res) => {
  fs.readFile("../pets.json", "utf-8", (err, text) => {
    if (err) {
      console.err(err.stack);
      res.sendStatus(500);
      return;
    }
    // res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.status(200);

    const pets = JSON.parse(text);

    res.json(pets);
  });
});

app.get("/pets/:id", (req, res) => {
  //cast id to number, i.e, index num
  const petId = Number(req.params.id);

  if (isNaN(petId)) {
    res.status(400);
    res.send("Pet Id is not a number");
    return;
  }

  fs.readFile("../pets.json", "utf-8", (err, text) => {
    if (err) {
      console.err(err.stack);
      res.sendStatus(500);
      return;
    }

    const pets = JSON.parse(text);

    // is valid index?
    if (!pets[petId]) {
      res.status(404);
      res.send("invalid pet Id");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.json(pets[petId]);
    //or res.json(text)??
  });
});

app.post("/pets", (req, res) => {
  const age = Number(req.body.age);
  const kind = req.body.kind;
  const name = req.body.name;

  if (!kind || !name || isNaN(age)) {
    return res.sendStatus(404);
  }

  const newPet = {
    age: age,
    name: name,
    kind: kind,
  };

  fs.readFile("../pets.json", "utf-8", (err, text) => {
    if (err) {
      console.error(err.stack);
      res.sendStatus(500);
      return;
    }

    const pets = JSON.parse(text);

    pets.push(newPet);

    fs.writeFile("../pets.json", JSON.stringify(pets), (err) => {
      if (err) {
        console.error(err.stack);
        res.sendStatus(500);
        return;
      }
      res.statusCode = 201;
      res.send(newPet);
    });
  });
});

//listen to a port
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

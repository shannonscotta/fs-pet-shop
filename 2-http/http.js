import http from "http";
import fs from "fs";

let server = http.createServer((req, res) => {
  const petRegExp = /^\/pets\/(.*)$/; // regular expressions to check for /pets/0, pets/1, etc

  if (req.method === "GET" && req.url === "/pets") {
    fs.readFile("../pets.json", "utf-8", function (error, text) {
      // Read pets from pets.json
      // if readFile produces an error, generate status code 500 (internal server error)
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }

      // parse json to an object (array)
      const pets = JSON.parse(text);

      // Return pets as response
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(pets));
    });
  } else if (req.method === "GET" && petRegExp.test(req.url)) {
    // use petIndex to get specific pet from pets.json
    const petIndex = Number(req.url.match(petRegExp)[1]); // match the request URL with the pets/... pattern

    console.log("req.url.match", req.url.match);
    console.log("req.url.match(petRegExp)", req.url.match(petRegExp));

    fs.readFile("../pets.json", "utf-8", function (error, text) {
      // Read pets from pets.json
      // if readFile produces an error, generate status code 500 (internal server error)
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }

      // parse json to an object (array)
      const pets = JSON.parse(text);

      // Return pets as response
      if (pets[petIndex]) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(pets[petIndex]));
      } else {
        res.statusCode = 404;
        res.end("Index invalid.");
      }
    });

    // console.log("pet index: ", petIndex);
    // ensure we have a number, and its in range - if not generate status code 404
    // read pets from pets.json
    // send back pet at that index
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(8000);

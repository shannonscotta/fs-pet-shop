import fs from "fs";

const command = process.argv[2];

switch (command) {
  case "read":
    readPets(process.argv[3]);
    break;
  case "create":
    if (process.argv.length !== 6) {
      console.error("Usage: node fs.js create AGE KIND NAME");
      process.exit(1);
    }
    createPet(process.argv[3], process.argv[4], process.argv[5]);
    break;
  case "update":
    if (process.argv.length !== 7) {
      console.error("Usage: node fs.js update INDEX AGE KIND NAME");
      process.exit(1);
    }
    updatePet(
      process.argv[3],
      process.argv[4],
      process.argv[5],
      process.argv[6]
    );
    break;
  default:
    console.error(`INVALID COMMAND ${command}`);
    process.exit(1);
}

function updatePet(index, updatedAge, updatedKind, updatedName) {
  fs.readFile("../pets.json", "utf8", (err, data) => {
    if (err) throw err;

    const pets = JSON.parse(data);

    // if (!pets[index]){
    //   console.error("The index to update is invalid");
    //   process.exit(1);
    // }

    let petUpdate = pets[index];

    petUpdate.age = Number(updatedAge);
    petUpdate.kind = updatedKind;
    petUpdate.name = updatedName;

    console.log(`Updated ${JSON.stringify(pets[index])}`);

    fs.writeFile("../pets.json", JSON.stringify(pets), (err) => {
      if (err) throw err;
    });
  });
}

function readPets(index) {
  // if (!process.argv[index]){
  //   console.error(`\n\nError:\nYou entered "${index}".\n"${index}" is an invalid index, please try again.\n `)
  //   process.exit(1);
  // }
  fs.readFile("../pets.json", "utf-8", (error, text) => {
    if (error) throw error;
    const pets = JSON.parse(text);
    console.log(index ? pets[Number(index)] : pets);
  });
}

function createPet(age, kind, name) {
  if (!age || isNaN(Number(age)) || Number(age) <= 0) {
    console.error(
      `\n\nError:\nYou entered "${age}".\n"${age}" is an invalid number, please try again.\n `
    );
    process.exit(1);
  }

  fs.readFile("../pets.json", "utf8", (err, data) => {
    if (err) throw err;
    const pets = JSON.parse(data);
    pets.push({ age: Number(age), kind, name });
    fs.writeFile("../pets.json", JSON.stringify(pets), (err) => {
      if (err) throw err;
    });
  });
}

// TODO:// better error messages

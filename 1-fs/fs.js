import fs from 'fs';

function readPets(index) {
    fs.readFile("../pets.json", "utf-8", (error, text) => {
        if (error) throw error;
        const pets = JSON.parse(text);
        console.log(index ? pets[Number(index)] : pets);
    });
}

function createPet(age, kind, name) {
  if (!age || isNaN(Number(age)) || Number(age) <= 0){
    console.error(`\nError:\nYou entered "${age}".\n"${age}" is an invalid number, please try again.\n `)
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

const command = process.argv[2];

switch (command) {
    case 'read':
        readPets(process.argv[3]);
        break;
    case 'create':
        if (process.argv.length !== 6) {
            console.error("Usage: node fs.js create AGE KIND NAME");
            process.exit(1);
        } 
        createPet(process.argv[3], process.argv[4], process.argv[5]);
        break;
    default:
        console.error("Usage: node fs.js [read | create]");
        process.exit(1);
}
TODO:// better error messages
const fs = require('fs');
const fileName = "day-4-input.txt";

const file = fs.readFileSync(fileName, 'utf8');
const games = file.split(/\r?\n/);
let points = 0;
let cards = [];

for (let i = 0; i < games.length; i++) {
    let gameData = games[i].substring(games[i].indexOf(":") + 1);
    let parts = gameData.split("|");
    let winningNumbers = parts[0].trim().split(" ");
    let winningLookup = {};
    let count = 0;
    for (let j = 0; j < winningNumbers.length; j++) {
        // Unlike the training data, input data has extra spaces between numbers
        if (winningNumbers[j] == "") {
            continue;
        }
        let number = Number(winningNumbers[j]);
        winningLookup[number] = true;
    }
    let myNumbers = parts[1].trim().split(" ");
    for (let j = 0; j < myNumbers.length; j++) {
        let number = Number(myNumbers[j]);
        if (winningLookup[number]) {
            count++
        }
    }

    cards.push({name: i, matches: count, processed: false});
    if(count > 0) {
        points = points + 2 ** (count - 1);
    }
}

console.log(`Part 1: ${points} points`);

let index = 0;
while(index < cards.length) {
    let name = cards[index].name;
    for(let i = 0; i < cards[index].matches; i++) {
        cards.push({name: cards[name + i + 1].name, matches: cards[name + i + 1].matches, processed: false});
    }
    cards[index].processed = true;
    index++;
}

console.log(`Part 2: ${cards.length} cards`);



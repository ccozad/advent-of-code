const fs = require('fs');
const fileName = "day-4-input.txt";

const file = fs.readFileSync(fileName, 'utf8');
const games = file.split(/\r?\n/);
let points = 0;
let cards = [];
for (let i = 0; i < games.length; i++) {
    //console.log(`Processing ${games[i]}`)
    let gameData = games[i].substring(games[i].indexOf(":") + 1);
    let parts = gameData.split("|");
    //console.log(parts);
    let winningNumbers = parts[0].trim().split(" ");
    let winningLookup = {};
    let count = 0;
    for (let j = 0; j < winningNumbers.length; j++) {
        if (winningNumbers[j] == "") {
            continue;
        }
        let number = Number(winningNumbers[j]);
        winningLookup[number] = true;
    }
    //console.log(winningLookup);
    let myNumbers = parts[1].trim().split(" ");
    for (let j = 0; j < myNumbers.length; j++) {
        let number = Number(myNumbers[j]);
        if (winningLookup[number]) {
            //console.log(`${number} is a match`);
            count++
        } else {
            //console.log(`${number} is not a match`);
        }
    }

    cards.push({name: i, matches: count, processed: false});
    if(count == 1) {
        //console.log(`1 point`);
        points = points + 1;
    } else if ( count > 1) {
        //console.log(`${2 ** (count - 1)} points`);
        points = points + 2 ** (count - 1);
    } else {
        //console.log(`0 points`);
    }
}

console.log(`Part 1: ${points} points`);

//console.log("Cards: ")
//console.log(cards);
let index = 0;
while(index < cards.length) {
    let name = cards[index].name;
    //console.log(`\nProcessing a ${name} card with ${cards[index].matches} matches\n`);
    for(let i = 0; i < cards[index].matches; i++) {
        
        //console.log(`Adding copy of card ${name + i + 1}`);
        cards.push({name: cards[name + i + 1].name, matches: cards[name + i + 1].matches, processed: false});
    }
    cards[index].processed = true;
    index++;
}

console.log(`Part 2: ${cards.length} cards`);



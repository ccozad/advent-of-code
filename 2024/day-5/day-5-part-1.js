// Create a ranking of the pages using the pairs
// Map each number to it's ranking
// Use the ranking to determine if each sequence has a valid order

const fs = require('fs');
const path = require('path');

function isCorrectOrder(ranking, a, b) {

    let key = `${a},${b}`;

    var hasRule = ranking.hasOwnProperty(key);
    if(hasRule) {
        return ranking[key];
    } else {
        return true;
    }
}

//const filePath = path.join("../data/day-5-sample.txt");
const filePath = path.join("../data/day-5-input.txt");
const data = fs.readFileSync(filePath, 'utf-8');
const lines = data.split('\n');

const updates = [];
const ordering = {};

for(let i = 0; i < lines.length; i++) {
    if(lines[i].includes('|')) {
        [a,b] = lines[i].split('|').map(x => parseInt(x));
        let key = `${a},${b}`;
        let inverseKey = `${b},${a}`;
        ordering[key] = true;
        ordering[inverseKey] = false;
    } else if(lines[i].includes(',')) {
        updates.push(lines[i].split(',').map(x => parseInt(x)));
    }
}

var sum = 0;

for(let i = 0; i < updates.length; i++) {
    var allCorrect = true;
    for(let a = 0; a < updates[i].length; a++) {
        for(let b = a + 1; b < updates[i].length; b++) {
            if(!isCorrectOrder(ordering, updates[i][a], updates[i][b])) {
                allCorrect = false;
            }
        }
    }

    if(allCorrect) {
        var middleIndex = Math.floor(updates[i].length / 2);
        var middleValue = updates[i][middleIndex];
        sum += middleValue;
    }
}

console.log(`Sum: ${sum}`);
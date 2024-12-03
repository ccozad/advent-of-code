const fs = require('fs');
const path = require('path');

//const filePath = path.join("../data/day-3-sample2.txt");
const filePath = path.join("../data/day-3-input.txt");
const data = fs.readFileSync(filePath, 'utf-8');

var filteredData = [];
var endReached = false;
var currentPos = 0;
var indexOfNextDont = 0;
var indexOfNextDo = 0;
var loopCount = 0;
var loopLimit = 64;
while (!endReached && loopCount < loopLimit) {
    indexOfNextDont = data.indexOf("don\'t()", currentPos);
    if (indexOfNextDont > 0) {
        filteredData.push(data.slice(currentPos, indexOfNextDont))
        currentPos = indexOfNextDont;
    } else {
        filteredData.push(data.slice(currentPos))
        endReached = true
    }

    indexOfNextDo = data.indexOf("do()", currentPos);

    if (indexOfNextDo > 0) {
        currentPos = indexOfNextDo
    } else {
        endReached = true
    }
    loopCount++;
}

const re = /mul\((\d*),(\d*)\)/g;
const matches = [...filteredData.join('\n').matchAll(re)];

var sum = BigInt(0);
for (let i = 0; i < matches.length; i++) {
    const a = parseInt(matches[i][1]);
    const b = parseInt(matches[i][2]);
    const product = BigInt(a*b)
    sum = sum + product;
}

console.log(`Sum: ${sum}`);
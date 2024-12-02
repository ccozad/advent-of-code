const fs = require('fs');
const path = require('path');

//const filePath = path.join("../data/day-2-sample.txt");
const filePath = path.join("../data/day-2-input.txt");
const data = fs.readFileSync(filePath, 'utf-8');
const lines = data.split('\n');
var safeCount = 0;
lines.forEach(line => {
    const numbers = line.split(' ').map(x => parseInt(x));
    var initialSign = numbers[0] - numbers[1] >= 0 ? 1 : 0;
    var differences = [];
    for (let i = 0; i < numbers.length - 1; i++) {
        var difference = numbers[i] - numbers[i+1];
        var sign = difference >= 0 ? 1 : 0;
        if (initialSign !== sign) {
            console.log(`Sign change at ${i}`);
            break
        }

        var absDifference = Math.abs(difference);

        if (absDifference < 1 || absDifference > 3) {
            console.log(`Difference ${absDifference} at ${i}`);
            break;
        }

        differences.push(difference);
    }

    if(differences.length === numbers.length - 1) {
        safeCount++;
    }
});

console.log(safeCount);
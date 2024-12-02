// Read text file in and for each line, split line into two numbers

const fs = require('fs');
const path = require('path');

//const filePath = path.join("../data/day-1-sample.txt");
const filePath = path.join("../data/day-1-input.txt");
const data = fs.readFileSync(filePath, 'utf-8');
const lines = data.split('\n');
var a = {};
var b = {};
var c = [];
lines.forEach(line => {
    const [x, y] = line.split('   ');

    if (a[x] === undefined) {
        a[x] = 1;
    } else {
        a[x] += 1;
    }

    if (b[y] === undefined) {
        b[y] = 1;
    } else {
        b[y] += 1;
    }
});

var keys = Object.keys(a);

for (let i = 0; i < keys.length; i++) {
    if (b[keys[i]] != undefined) {
        var number = parseInt(keys[i]);
        console.log(`${a[keys[i]]} * ${number} * ${b[keys[i]]} = ${a[keys[i]] * number * b[keys[i]]}`);
        c.push(a[keys[i]] * number * b[keys[i]]);
    }
}

// Sum all elements in array c
const sum = c.reduce((acc, curr) => acc + curr, 0);

console.log(sum);

// Read text file in and for each line, split line into two numbers

const fs = require('fs');
const path = require('path');

//const filePath = path.join("../data/day-1-sample.txt");
const filePath = path.join("../data/day-1-input.txt");
const data = fs.readFileSync(filePath, 'utf-8');
const lines = data.split('\n');
var a = [];
var b = [];
var c = [];
lines.forEach(line => {
    const [x, y] = line.split('   ');
    a.push(parseInt(x));
    b.push(parseInt(y));
});

var sorted_a = a.sort((x, y) => x - y);
var sorted_b = b.sort((x, y) => x - y);

for (let i = 0; i < sorted_a.length; i++) {
    const difference = Math.abs(sorted_b[i] - sorted_a[i]);
    console.log(`|${sorted_a[i]} - ${sorted_b[i]}| = ${difference}`);
    c.push(difference);
}

// Sum all elements in array c
const sum = c.reduce((acc, curr) => acc + curr, 0);

console.log(sum);

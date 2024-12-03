const fs = require('fs');
const path = require('path');

//const filePath = path.join("../data/day-3-sample2.txt");
const filePath = path.join("../data/day-3-input2.txt");
const data = fs.readFileSync(filePath, 'utf-8');

//const ignoreRegex = /(don't\(\).*?do\(\))/g;
//const replacedData = data.replace(ignoreRegex, '');
const re = /mul\((\d*),(\d*)\)/g;
const matches = [...data.matchAll(re)];

var sum = BigInt(0);
for (let i = 0; i < matches.length; i++) {
    console.log(matches[i]);
    const a = parseInt(matches[i][1]);
    const b = parseInt(matches[i][2]);
    const product = BigInt(a*b)
    sum = sum + product;
    //console.log(`${a} * ${b} = ${a * b}`);

}

console.log(`Sum: ${sum}`);
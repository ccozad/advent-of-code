const fs = require('fs');
const fileName = "day-3-test.txt";

function isValidIndex(i, j, area) {
    return i >= 0 && i < area.length && j >= 0 && j < area[0].length;
}

function markSingleCellPartNumber(i, j, area) {
    if ( isValidIndex(i, j, area)) {
        if(area[i][j].value) {
            area[i][j].isPartNumber = true;
        }
    }
}

function markSingleCellGear(i, j, gear, area) {
    if ( isValidIndex(i, j, area)) {
        if(area[i][j].value) {
            area[i][j].isGear = true;
            area[i][j].gear = gear;
        }
    }
}

// | a | b | c |
// | d |   | e |
// | f | g | h |
// a = (i - 1, j - 1)
// b = (i, j - 1)
// c = (i + 1, j - 1)
// d = (i - 1, j)
// e = (i + 1, j)
// f = (i - 1, j + 1)
// g = (i, j + 1)
// h = (i + 1, j + 1)
function markAllAdjacentCellsPartNumber(i, j, area) {
    markSingleCellPartNumber(i - 1, j - 1, area); // a
    markSingleCellPartNumber(i, j - 1, area); // b
    markSingleCellPartNumber(i + 1, j - 1, area); // c
    markSingleCellPartNumber(i - 1, j, area); // d
    markSingleCellPartNumber(i + 1, j, area); // e
    markSingleCellPartNumber(i - 1, j + 1, area); // f
    markSingleCellPartNumber(i, j + 1, area); // g
    markSingleCellPartNumber(i + 1, j + 1, area); // h
}

function markAllAdjacentGear(i, j, gear, area) {
    markSingleCellGear(i - 1, j - 1, gear, area); // a
    markSingleCellGear(i, j - 1, gear, area); // b
    markSingleCellGear(i + 1, j - 1, gear, area); // c
    markSingleCellGear(i - 1, j, gear, area); // d
    markSingleCellGear(i + 1, j, gear, area); // e
    markSingleCellGear(i - 1, j + 1, gear, area); // f
    markSingleCellGear(i, j + 1, gear, area); // g
    markSingleCellGear(i + 1, j + 1, gear, area); // h
}

const file = fs.readFileSync(fileName, 'utf8');
const line = file.split(/\r?\n/);
const area = [];
const symbols = [];
for (let i = 0; i < line.length; i++) {
    area.push([]);
    for (let j = 0; j < line[i].length; j++) {
        if (line[i][j].match(/[0-9]/i)) {
            area[i].push({ value: line[i][j]});
        } else if (line[i][j].match(/[\*]/i)) {
            area[i].push({ symbol: line[i][j], isGear: true});
            symbols.push({symbol: line[i][j], x: i, y: j, isGear: true});
        } else if (line[i][j].match(/[^\.]/i)) {
            area[i].push({ symbol: line[i][j]});
            symbols.push({symbol: line[i][j], x: i, y: j});
        } else {
            area[i].push({ });
        }
    }
}

for (let i = 0; i < symbols.length; i++) {
    if (symbols[i].isGear) {
        markAllAdjacentGear(symbols[i].x, symbols[i].y, i, area);
    }

    markAllAdjacentCellsPartNumber(symbols[i].x, symbols[i].y, area);
}

let numbers = [];
let isPartNumber = false;
let isGear = false;
let gear = 0;
let partNumbers = [];
let gearNumbers = {};
for(let i = 0; i < area.length; i++) {
    for(let j = 0; j < area[i].length; j++) {
        if (area[i][j].value) {
            numbers.push(area[i][j].value);
            if (area[i][j].isPartNumber) {
                isPartNumber = true;
            }

            if (area[i][j].gear !== undefined) {
                isGear = true;
                gear = area[i][j].gear;
            }
        } else {
            if (isPartNumber) {
                partNumbers.push(Number(numbers.join("")));
            }

            if (isGear) {
                if(gearNumbers[gear]) {
                    gearNumbers[gear].push(Number(numbers.join("")));
                } else {
                    gearNumbers[gear] = [];
                    gearNumbers[gear].push(Number(numbers.join("")));
                }
            }
            numbers = [];
            isPartNumber = false;
            isGear = false;
        }
    }
}

const partNumberSum = partNumbers.reduce((a, b) => a + b, 0);
console.log(`Part 1 Sum: ${partNumberSum}`);

let gearNumberSum = 0;
const keys = Object.keys(gearNumbers);
for(let i = 0; i < keys.length; i++) {
    if (gearNumbers[keys[i]].length == 2) {
        gearNumberSum += gearNumbers[keys[i]][0] * gearNumbers[keys[i]][1];
    } 
}

console.log(`Part 2 Sum: ${gearNumberSum}`);
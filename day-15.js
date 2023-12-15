const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-15-input.txt";

const file = fs.readFileSync(fileName, 'utf8');
const input = file.split(",");

function calculateHash(input) {
    let currentValue = 0;
    for(let i = 0; i < input.length; i++) {
        let asciiValue = input.charCodeAt(i);
        currentValue += asciiValue;
        currentValue *= 17;
        currentValue = currentValue % 256;
    }

    return currentValue;
}

function printBoxes(boxes) {
    for(let i = 0; i < boxes.length; i++) {
        if(boxes[i].length == 0) {
            continue;
        }
    }
}

function calculateFocusingPower(boxes) {
    let sum = 0;

    for(let i = 0; i < boxes.length; i++) {
        if(boxes[i].length == 0) {
            continue;
        }
        for(let j = 0; j < boxes[i].length; j++) {
            let value = Number(boxes[i][j].split(" ")[1]);
            let focusValue = (i + 1) *(j + 1) * value;
            console.log(`Box[${i}]: ${boxes[i][j]} Focus Value: ${focusValue}`);
            sum += focusValue;
        }
    }

    return sum;
}

let sum = 0;
for (let i = 0; i < input.length; i++) {
    let hashValue = calculateHash(input[i]);
    sum += hashValue;
    //console.log(`Hash value for ${input[i]} is ${hashValue}`);
}

console.log(`Part 1: ${sum}`);

// Part 2
let boxes = [];
for(let i = 0; i < 256; i++) {
    boxes.push([]);
}

for(let i = 0; i < input.length; i++) {
    //console.log(`Processing ${input[i]}`);
    let operationIndex = input[i].includes("-") ? input[i].indexOf("-") : input[i].indexOf("=");
    let key = input[i].substring(0, operationIndex);
    let lensValue = input[i].substring(operationIndex + 1);
    let value = `${key} ${lensValue}`;
    
    let box = calculateHash(key);
    let operation = input[i][operationIndex];

    console.log(`Box: ${box}, Operation: ${operation}, Key: ${key}, Value: ${value}`);

    if(operation == "-") {
        for(let i = 0; i < boxes[box].length; i++) {
            if(boxes[box][i].startsWith(key)) {
                boxes[box].splice(i, 1);
                break;
            }
        }
    } else if(operation == "=") {
        let found = false;
        for(let i = 0; i < boxes[box].length; i++) {
            if(boxes[box][i].startsWith(key)) {
                found = true;
                boxes[box][i] = value;
                break;
            }
        }

        if(!found) {
            boxes[box].push(value);
        }
    }
}

let totalFocusingPower = calculateFocusingPower(boxes);
console.log(`Part 2: ${totalFocusingPower}`);
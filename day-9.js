const fs = require('fs');
const fileName = "data/day-9-input.txt";

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);

function isRootSequence(sequence) {
    let isRoot = true;
    for(let i = 0; i < sequence.length; i++) {
        if (sequence[i] != 0) {
            isRoot = false;
            break;
        }
    }
    return isRoot;
}

function findDifferenceSequence(sequence) {
    let differences = [];
    for(let i = 0; i < sequence.length - 1; i++) {
        differences.push(sequence[i + 1] - sequence[i]);
    }
    return differences;
}

function findNextSequenceElement(sequence) {
    let derrivatives = [];
    derrivatives.push(sequence);
    let rootFound = false;
    while(!rootFound) {
        if (isRootSequence(derrivatives[derrivatives.length - 1])) {
            rootFound = true;
            break;
        }
        let differences = findDifferenceSequence(derrivatives[derrivatives.length - 1]);
        derrivatives.push(differences);
    }

    // Solve for the next number
    for(let i = derrivatives.length - 1; i > 0; i--) {
        let nextNumber = derrivatives[i][derrivatives[i].length - 1] + derrivatives[i - 1][derrivatives[i - 1].length - 1];
        derrivatives[i - 1].push(nextNumber);
    }

    return derrivatives[0][derrivatives[0].length - 1];
}

let nextItems = [];
for(let i = 0; i < lines.length; i++) {
    let sequence = lines[i].split(" ").map(x => Number(x));
    let nextItem = findNextSequenceElement(sequence);
    nextItems.push(nextItem);
}

let finalAnswer = nextItems.reduce((acc, cur) => {
    return acc + cur;
}, 0);
console.log(`Part 1: ${finalAnswer}`);

let previousItems = [];
for(let i = 0; i < lines.length; i++) {
    let sequence = lines[i].split(" ").map(x => Number(x)).reverse();
    let previousItem = findNextSequenceElement(sequence);
    previousItems.push(previousItem);
}

let finalAnswer2 = previousItems.reduce((acc, cur) => {
    return acc + cur;
}, 0);
console.log(`Part 2: ${finalAnswer2}`);
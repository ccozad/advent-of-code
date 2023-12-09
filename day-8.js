const fs = require('fs');
const fileName = "day-8-input.txt";

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);
const nodeMap = {};
const moves = [];
const start = "AAA";
const goal = "ZZZ";
const sequence = lines[0];
const part2StartingNodes = []
for(let i = 2; i < lines.length; i++) {
    let nodeName = lines[i].substring(0,3);
    let leftNodeName = lines[i].substring(7,10);
    let rightNodeName = lines[i].substring(12,15);
    nodeMap[nodeName] = {
        name: nodeName,
        left: leftNodeName,
        right: rightNodeName,
    };
    if (nodeName.endsWith("A")) {
        part2StartingNodes.push(nodeName);
    }
}

let sequenceIndex = 0;
let goalFound = false;
moves.push(start);
let nodeName;
let leftName;
let rightName;

while(!goalFound) {
    nodeName = moves[moves.length - 1];
    leftName = nodeMap[nodeName].left;
    rightName = nodeMap[nodeName].right;

    if (nodeName == goal) {
        goalFound = true;
        break;
    }
    
    if (sequence[sequenceIndex] == "L") {
        moves.push(leftName);
    } else if (sequence[sequenceIndex] == "R") {
        moves.push(rightName);
    }

    if (sequenceIndex < sequence.length - 1) {
        sequenceIndex++;
    } else {
        sequenceIndex = 0;
    }
}

console.log(`Part 1 answer: ${moves.length - 1} moves`);

// Part 2
let allPaths = [];
for(let i = 0; i < part2StartingNodes.length; i++) {
    allPaths.push(part2StartingNodes[i]);
}

function calculatePathToGoal(start, sequence) {
    let sequenceIndex = 0;
    let goalFound = false;
    let moves = [];
    moves.push(start);
    let nodeName;
    let leftName;
    let rightName;

    while(!goalFound) {
        nodeName = moves[moves.length - 1];
        leftName = nodeMap[nodeName].left;
        rightName = nodeMap[nodeName].right;

        if (nodeName.endsWith("Z")) {
            goalFound = true;
            break;
        }
        
        if (sequence[sequenceIndex] == "L") {
            moves.push(leftName);
        } else if (sequence[sequenceIndex] == "R") {
            moves.push(rightName);
        }

        if (sequenceIndex < sequence.length - 1) {
            sequenceIndex++;
        } else {
            sequenceIndex = 0;
        }
    }

    return moves;
}

let pathCycleLengths = [];
for(let i = 0; i < allPaths.length; i++) {
    let path = calculatePathToGoal(allPaths[i], sequence);
    pathCycleLengths.push(path.length - 1);
}

// Orignally this ran for many minutes without completing. Thinking the anser
// was going to be a very large number, I decided to try to calculate the LCM
// of all the path lengths. This is a much faster calculation.
function lcm(numbers) {
    function gcd(a, b) {
      if (b === 0) {
        return a;
      }
      return gcd(b, a % b);
    }

    return numbers.reduce((a, b) => a * b / gcd(a, b));
}

let moveCount = lcm(pathCycleLengths);
console.log(`Part 2 answer: ${moveCount} moves`);


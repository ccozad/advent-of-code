const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-14-input.txt";

function printBoard(board) {
    for(let i = 0; i < board.length; i++) {
        console.log(board[i].join(""));
    }
}

function extractColumns(board) { 
    let columns = [];
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(i === 0) {
                columns.push([]);
            }
            columns[j].push(board[i][j]);
        }
    }

    return columns;
}

function sortRocks(rockCollection, isFordward = true) {
    let roundRocks = [];
    let emptySpaces = [];
    let finalCollection = [];

    if(isFordward) {
        for(let i = 0; i < rockCollection.length; i++) {
            if(rockCollection[i] === 'O') {
                roundRocks.push('O');
            } else if (rockCollection[i] === '.') {
                emptySpaces.push('.');
            } else if (rockCollection[i] === '#') {
                finalCollection.push(...roundRocks);
                finalCollection.push(...emptySpaces);
                finalCollection.push('#');
                roundRocks = [];
                emptySpaces = [];
            }
        }
    
        if(roundRocks.length > 0 || emptySpaces.length > 0) {
            finalCollection.push(...roundRocks);
            finalCollection.push(...emptySpaces);
        }
    } else {
        for(let i = rockCollection.length - 1; i >= 0; i--) {
            if(rockCollection[i] === 'O') {
                roundRocks.push('O');
            } else if (rockCollection[i] === '.') {
                emptySpaces.push('.');
            } else if (rockCollection[i] === '#') {
                finalCollection.unshift(...roundRocks);
                finalCollection.unshift(...emptySpaces);
                finalCollection.unshift('#');
                roundRocks = [];
                emptySpaces = [];
            }
        }
    
        if(roundRocks.length > 0 || emptySpaces.length > 0) {
            finalCollection.unshift(...roundRocks);
            finalCollection.unshift(...emptySpaces);
        }
    }

    return finalCollection;
}

function calculateWeight(board) {
    let weight = 0;
    let multiplier = board.length;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j] === 'O') {
                weight+= multiplier;
            }
        }
        multiplier--;
    }

    return weight;
}

function tiltBoardNorth(board) {
    let columns = extractColumns(board);
    
    let newColumns = [];
    for(let i = 0; i < columns.length; i++) {
        newColumns.push(sortRocks(columns[i]));
    }

    // Create new board from columns
    let newBoard = [];
    for(let i =0; i < board.length; i++) {
        newBoard.push([]);
        for(let j = 0; j < newColumns.length; j++) {
            newBoard[i].push(newColumns[j][i]);
        }
    }

    return newBoard;
}

function tiltBoardSouth(board) {
    let columns = extractColumns(board);
    
    let newColumns = [];
    for(let i = 0; i < columns.length; i++) {
        newColumns.push(sortRocks(columns[i], false));
    }

    // Create new board from columns
    let newBoard = [];
    for(let i =0; i < board.length; i++) {
        newBoard.push([]);
        for(let j = 0; j < newColumns.length; j++) {
            newBoard[i].push(newColumns[j][i]);
        }
    }

    return newBoard;
}

function tiltBoardEast(board) {
    let newBoard = [];
    for(let i = 0; i < board.length; i++) {
        newBoard.push(sortRocks(board[i], false));
    }

    return newBoard;
}

function tiltBoardWest(board) {
    let newBoard = [];
    for(let i = 0; i < board.length; i++) {
        newBoard.push(sortRocks(board[i]));
    }

    return newBoard;
}

let board = [];

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);
for(let i = 0; i < lines.length; i++) {
    let row  = lines[i].split("");
    board.push(row);
}

let cycles = 1000;
let weights = [];
let lastWeight = 0;

for(let i = 0; i < cycles; i++) {
    //console.log(`\nCycle ${i + 1}:`);
    board = tiltBoardNorth(board);
    board = tiltBoardWest(board);
    board = tiltBoardSouth(board);
    board = tiltBoardEast(board);
    //printBoard(board);
    weights.push(calculateWeight(board));

    //console.log(`Cycle ${i + 1}:`);
    //printBoard(board);
    //console.log(`Total weight: ${calculateWeight(board)}`);
}

//lastWeight = calculateWeight(board);
//console.log(`Last weight: ${lastWeight}`);
fs.writeFileSync("data/day-14-real-output.txt", weights.join("\n"));

/*console.log("\nInitial board:");
printBoard(board);
board = tiltBoardNorth(board);
console.log("\nNorth Tilted board:");
printBoard(board);
//board = tiltBoardSouth(board);
//console.log("\nSouth Tilted board:");
//printBoard(board);
let totalWeight = calculateWeight(board);
console.log(`\nTotal weight: ${totalWeight}`);*/
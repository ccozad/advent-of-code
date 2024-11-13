const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-13-test.txt";

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);

function testPivot(pivot, board, lookup) {

    return false;

}

function processBoard(board) {
    let results = {
        left: 0,
        above: 0
    }

    let columnLookup = {};
    let rowLookup = {};
    let cols = [];
    let rowPivot = 0;
    let colPivot = 0;

    for(let i = 0; i < board.length; i++) {
        let row = board[i].join("");
        cols.push([]);
        if(rowLookup.hasOwnProperty(row)) {
            if(rowPivot == 0) {
                console.log(`Found a potential row pivot at ${i}: ${row}`);
                rowPivot = i;
            }
            rowLookup[row]++;
        } else {
            rowLookup[row] = 1;
        }

        for(let j = 0; j < board[i].length; j++) {
            cols[i].push(board[i][j]);
        }
    }

    for(let i = 0; i < cols.length; i++) {
        let col = cols[i].join("");
        if(columnLookup.hasOwnProperty(col)) {
            if(colPivot == 0) {
                console.log(`Found a potential column pivot at ${i}: ${col}`);
                colPivot = i - 1;
            }
            columnLookup[col]++;
        } else {
            columnLookup[col] = 1;
        }
    }
    
    return results;
}

let board = [];
let sum = 0;
let boardCount = 0;
for(let i = 0; i < lines.length; i++) {
    if (lines[i].length == 0 || i == lines.length - 1) {
        console.log(`Processing board ${boardCount}`)
        let results = processBoard(board);
        console.log(results);
        sum+= (100 * results.above) + results.left;
        board = [];
        boardCount++;
    }

    board.push(lines[i].split(""));

}

console.log(`Part 1: ${sum}`);

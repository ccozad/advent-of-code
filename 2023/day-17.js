const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-17-test.txt";


function min(x, y, z) {
    return Math.min(Math.min(x, y), z);
}

function minCost(board, m, n, direction, memo) {
    if( n < 0 || m < 0) {
        return Number.MAX_VALUE;
    } else if (m == 0 && n == 0) {
        return board[m][n];
    }

    if (memo[m][n] != -1) {
        return memo[m][n];
    }

    
    if (direction == 'E') { // Facing east
        memo[m][n] = board[m][n] + min(
            minCost(board, m - 1, n, "N", memo), // Left, north
            minCost(board, m + 1, n, "S", memo), // Right, south
            minCost(board, m, n + 1, "E", memo) // Forward, east
        ); 
    } else if (direction == 'W') { 
        memo[m][n] = board[m][n] + min(
            minCost(board, m + 1, n, "S", memo), // Left, south
            minCost(board, m - 1, n, "N", memo), // Right, north
            minCost(board, m, n - 1, "W", memo) // Forward, west
        ); 
    } else if (direction == 'N') {
        memo[m][n] = board[m][n] + min(
            minCost(board, m, n - 1, "W", memo), // Left, west
            minCost(board, m, n + 1, "E", memo), // Right, east
            minCost(board, m - 1, n, "N", memo) // Forward, north
        ); 
    } else if (direction == 'S') {
        memo[m][n] = board[m][n] + min(
            minCost(board, m, n + 1, "E", memo), // Left, east
            minCost(board, m, n - 1, "W", memo), // Right, west
            minCost(board, m + 1, n, "S", memo) // Forward, south
        ); 
    }

    return memo[m][n];
}

function processBoard(board) {
    const meemo = [];
    for(let i = 0; i < board.length; i++) {
        meemo.push([]);
        for(let j = 0; j < board[i].length; j++) {
            meemo[i].push(-1);
        }
    }
    
    return minCost(board, board.length - 1, board[0].length - 1, "E", meemo);
}

function part1() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);

    let board = [];

    for(let i = 0; i < lines.length; i++) {
        board.push(lines[i].split("").map(x => Number(x)));
    }
    
    let results = processBoard(board);
    console.log(`Part 1: ${results}`);
}
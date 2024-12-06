const fs = require('fs');
const path = require('path');

const board = [];
var done = false;
const startPos = { x: 0, y: 0, direction: null };
const currentPos = { x: 0, y: 0, direction: null };
const filePath = path.join("../data/day-6-input.txt");
//const filePath = path.join("../data/day-6-sample.txt");
const data = fs.readFileSync(filePath, 'utf-8');
const lines = data.split('\n');

for (let i = 0; i < lines.length; i++) {
    board.push([])
    for(let j = 0; j < lines[i].length; j++) {
        var char = lines[i][j];
        var isObstacle = char === '#';
        var isPlayer = char === '^' || char === 'v' || char === '<' || char === '>';
        if(isPlayer) {
            startPos.x = j;
            startPos.y = i;
            startPos.direction = char;
            currentPos.x = j;
            currentPos.y = i;
            startPos.direction = char;
        }
        var cell = {
            isObstacle: isObstacle,
            visited: isPlayer,
            isPlayer: isPlayer,
            direction: isPlayer ? char : null
        }
        board[i].push(cell)
    }
}

function printBoard() {
    console.log("\n");
    for(let i = 0; i < board.length; i++) {
        var row = "";
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j].isObstacle) {
                row += "#";
            } else if(board[i][j].isPlayer) {
                row += board[i][j].direction;
            } else if(board[i][j].visited) {
                row += "X";
            } else {
                row += ".";
            }
        }
        console.log(row);
    }
    var visited = countVisited();
    console.log(`Visited: ${visited}`);
    console.log(`Current Position: ${currentPos.x},${currentPos.y}`);
    console.log(`Current Direction: ${currentPos.direction}`);
}

function countVisited() {
    var count = 0;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j].visited) {
                count++;
            }
        }
    }
    return count;
}

function move() {
    board[currentPos.y][currentPos.x].isPlayer = false;
    currentPos.direction = board[currentPos.y][currentPos.x].direction;

    if(currentPos.direction === '^') {
        if(currentPos.y - 1 < 0) {
            done = true;
        } else if(board[currentPos.y - 1][currentPos.x].isObstacle) {
            currentPos.direction = '>';
        } else {
            currentPos.y--;
        }
    } else if(currentPos.direction === 'v') {
        if(currentPos.y + 1 >= board.length) {
            done = true;
        } else if(board[currentPos.y + 1][currentPos.x].isObstacle) {
            currentPos.direction = '<';
        } else {
            currentPos.y++;
        }
    } else if(currentPos.direction === '<') {
        if(currentPos.x - 1 < 0) {
            done = true;
        }else if(board[currentPos.y][currentPos.x - 1].isObstacle) {
            currentPos.direction = '^';
        } else {
            currentPos.x--;
        }
    } else if(currentPos.direction === '>') {
        if(currentPos.x + 1 >= board[0].length) {
            done = true;
        } else if(board[currentPos.y][currentPos.x + 1].isObstacle) {
            currentPos.direction = 'v';
        } else {
            currentPos.x++;
        }
    }

    if(!done) {
        board[currentPos.y][currentPos.x].visited = true;
        board[currentPos.y][currentPos.x].isPlayer = true;
        board[currentPos.y][currentPos.x].direction = currentPos.direction;
    }
}

function runSimulation() {
    var maxMoves = 100000;
    var moves = 0;
    while (!done && moves < maxMoves) {
        //printBoard();
        move();
        moves++;
    }

    var visited = countVisited();
    console.log(`Visited: ${visited}`);
}

runSimulation();


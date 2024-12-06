const fs = require('fs');
const path = require('path');

const originalBoard = [];
var done = false;
var loop = false;
const startPos = { x: 0, y: 0, direction: null };
const currentPos = { x: 0, y: 0, direction: null };
//const filePath = path.join("../data/day-6-input.txt");
const filePath = path.join("../data/day-6-sample.txt");
const data = fs.readFileSync(filePath, 'utf-8');
const lines = data.split('\n');

for (let i = 0; i < lines.length; i++) {
    originalBoard.push([])
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
            currentPos.direction = char;
        }
        var cell = {
            isObstacle: isObstacle,
            visited: isPlayer,
            isPlayer: isPlayer,
            direction: isPlayer ? char : null,
            isStart: isPlayer,
            visitedDirection: isPlayer ? char : null
        }
        originalBoard[i].push(cell)
    }
}

function printBoard(board) {
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
    //var visited = countVisited(board);
    //console.log(`Visited: ${visited}`);
    console.log(`Current Position: ${currentPos.x},${currentPos.y}`);
    console.log(`Current Direction: ${currentPos.direction}`);
}

function countVisited(board) {
    var count = 0;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j].visited) {
                count++;
            }
        }
    }
    return {
        count: count
    }

}

function move(board) {
    board[currentPos.y][currentPos.x].isPlayer = false;
    currentPos.direction = board[currentPos.y][currentPos.x].direction;

    if(currentPos.direction === '^') {
        if(currentPos.y - 1 < 0) {
            done = true;
        } else if(board[currentPos.y - 1][currentPos.x].isObstacle) {
            currentPos.direction = '>';
            currentPos.x++;
        } else {
            currentPos.y--;
        }
    } else if(currentPos.direction === 'v') {
        if(currentPos.y + 1 >= board.length) {
            done = true;
        } else if(board[currentPos.y + 1][currentPos.x].isObstacle) {
            currentPos.direction = '<';
            currentPos.x--;
        } else {
            currentPos.y++;
        }
    } else if(currentPos.direction === '<') {
        if(currentPos.x - 1 < 0 ) {
            done = true;
        }else if(board[currentPos.y][currentPos.x - 1].isObstacle) {
            currentPos.direction = '^';
            currentPos.y--;
        } else {
            currentPos.x--;
        }
    } else if(currentPos.direction === '>') {
        if(currentPos.x + 1 >= board[0].length) {
            done = true;
        } else if(board[currentPos.y][currentPos.x + 1].isObstacle) {
            currentPos.direction = 'v';
            currentPos.y++;
        } else {
            currentPos.x++;
        }
    }

    if(!done) {
        if(!board[currentPos.y][currentPos.x].isStart 
            && board[currentPos.y][currentPos.x].visited
            && board[currentPos.y][currentPos.x].visitedDirection === currentPos.direction) {
            loop = true;
        }
        board[currentPos.y][currentPos.x].visited = true;
        board[currentPos.y][currentPos.x].isPlayer = true;
        board[currentPos.y][currentPos.x].direction = currentPos.direction;
        board[currentPos.y][currentPos.x].visitedDirection = currentPos.direction;
        
    }
}

function runSimulation() {
    var maxMoves = 10000;
    var moves = 0;

    var part1Board = JSON.parse(JSON.stringify(originalBoard));
    while (!done && moves < maxMoves) {
        //printBoard();
        move(part1Board);
        moves++;
    }

    var results = countVisited(part1Board);
    console.log(`Part 1 Visited: ${results.count}`);
    var loopCount = 0;

    for(let y = 0; y < originalBoard.length; y++) {
        for(let x = 0; x < originalBoard[y].length; x++) {
            var boardCopy = JSON.parse(JSON.stringify(originalBoard));
        
            //console.log("Original board");
            //printBoard(boardCopy);
            if(boardCopy[y][x].isStart) {
                //console.log("Skipping start position");
                continue;
            } else {
                //console.log(`Putting obstacle at ${x},${y}`);
                boardCopy[y][x].isObstacle = true;
                
                done = false;
                loop = false;
                moves = 0;
                maxMoves = 1000;

                currentPos.x = startPos.x;
                currentPos.y = startPos.y;
                currentPos.direction = startPos.direction;

                while (!done && !loop && moves < maxMoves) {
                    move(boardCopy);
                    //printBoard(boardCopy);
                    moves++;
                }

                if(done) {
                    //console.log("Out of bounds");
                }

                if(loop) {
                    console.log(`Loop found at ${x},${y}`);
                    loopCount++;
                }

                if(moves >= results.count) {
                    //console.log("Out of moves");
                }
            }
        }
    }

    console.log(`Part 2 Loops: ${loopCount}`);
}

runSimulation();


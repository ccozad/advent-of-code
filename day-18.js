const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-18-input.txt";

function printBoard(board) {
    for(let i = 0; i < board.length; i++) {
        console.log(board[i].map(x => x.symbol).join(""));
    }
}

function solveBoard(board, moves) {
    let row = board.length / 2;
    let col = board[0].length / 2;
    for(let i = 0; i < moves.length; i++) {
        let move = moves[i];
        console.log(`Move ${i}: ${move.direction} ${move.distance} ${move.color}`);
        
        if(move.direction == "R") {
            for(let j = col; j < col + move.distance; j++) {
                board[row][j].symbol = "#";
                board[row][j].color = move.color;
            }
            col += move.distance;
        }

        if(move.direction == "L") {
            for(let j = col; j >= col - move.distance; j--) {
                board[row][j].symbol = "#";
                board[row][j].color = move.color;
            }
            col -= move.distance;
        }

        if(move.direction == "U") {
            for(let j = row; j >= row - move.distance; j--) {
                board[j][col].symbol = "#";
                board[j][col].color = move.color;
            }
            row -= move.distance;
        }

        if(move.direction == "D") {
            for(let j = row; j < row + move.distance; j++) {
                board[j][col].symbol = "#";
                board[j][col].color = move.color;
            }
            row += move.distance;
        }

        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
            console.log(`Out of bounds at ${row}, ${col}`);
            break;
        }

        console.log(`Row: ${row}, Col: ${col}`);
        console.log(`Board after move ${i}:`);
        //printBoard(board);
    }
}

function calculateTotalArea(board) {
    let totalArea = 0;
    // Flood fill from (0,0), replace all "." with " ", still filling in a direction when # is found

    let queue = [];
    queue.push({row: 0, col: 0});
    while(queue.length > 0) {
        let current = queue.shift();
        let row = current.row;
        let col = current.col;
        if (board[row][col].symbol == ".") {
            board[row][col].symbol = " ";
            if (row - 1 >= 0 && board[row - 1][col].symbol == ".") {
                queue.push({row: row - 1, col: col});
            }
            if (row + 1 < board.length && board[row + 1][col].symbol == ".") {
                queue.push({row: row + 1, col: col});
            }
            if (col - 1 >= 0 && board[row][col - 1].symbol == ".") {
                queue.push({row: row, col: col - 1});
            }
            if (col + 1 < board[0].length && board[row][col + 1].symbol == ".") {
                queue.push({row: row, col: col + 1});
            }
        }
    }
    /*for(let i = 0; i < board.length; i++) {
        let wallCount = 0;
        for(let j = 0; j < board[i].length; j++) {
            if (board[i][j].symbol == "#") {
                wallCount++;
            }
        }
        let row = board[i].map(x => x.symbol).join("");
        let first = row.indexOf("#");
        let last = row.lastIndexOf("#");
        if (first == -1 || last == -1) {
            continue;
        }
        totalArea += last - first + 1;
        
        //console.log(`Row ${i}: ${last - first + 1}`);
        //console.log(`Total area: ${totalArea}`);
        //console.log(row);    
    }*/

    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j].symbol == "#" || board[i][j].symbol == ".") {
                totalArea++;
            }
        }
    }

    return totalArea;
}

function part1() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);

    let moves = [];

    for(let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(" ");
        let direction = parts[0];
        let distance = parseInt(parts[1]);
        let color = parts[2].substring( 1, parts[2].length - 1);
        moves.push({direction: direction, distance: distance, color: color});
    }
    //console.log("\nMoves:");
    //console.log(moves);

    let board = [];
    for(let i = 0; i < 500; i++) {
        board.push([]);
        for(let j = 0; j < 500; j++) {
            board[i].push({symbol: ".", depth: 0});
        }
    }

    console.log("\nInitial board:");
    printBoard(board);
    solveBoard(board, moves);
    console.log("\nBoard after solving:");
    printBoard(board);
    let totalArea = calculateTotalArea(board);
    console.log(`Board after area calculation:`);
    printBoard(board);
    console.log(`Part 1: ${totalArea}`);
}

part1();
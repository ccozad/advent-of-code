const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-18-test.txt";

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

    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j].symbol == "#" || board[i][j].symbol == ".") {
                totalArea++;
            }
        }
    }

    return totalArea;
}

function solveBoard2(moves) {
    let points = [];
    //points.push({row: 0, col: 0, color: "000000"});
    //points.push({row: 4, col: 0, color: "000000"});
    //points.push({row: 4, col: 4, color: "000000"});
    //points.push({row: 0, col: 4, color: "000000"});
    //points.push({row: 1, col: 0, color: "000000"});
    //points.push({row: 3, col: 2, color: "000000"});
    //points.push({row: 7, col: 4, color: "000000"});
    //console.log("Adding point (0, 0)");
    //points.push({row: 0, col: 0 });

    points.push({row: 0, col: 1});
    //let previousMove = moves[moves.length - 1];
    for(let i = 0; i < moves.length; i++) {
        /*let currentMove = moves[i];
        console.log("-------------------")
        console.log(`Previous move: ${previousMove.direction} ${previousMove.distance}`);
        console.log(`Current move: ${currentMove.direction} ${currentMove.distance}`);
        console.log(`Before (${col}, ${row})`);
        

        if(previousMove.direction == "R") {
            if(currentMove.direction == "U") {
                console.log("R -> U CCW transition");
                col += previousMove.distance - 1;
                points.push({row: row, col: col});
            } else if(currentMove.direction == "D") {
                console.log("R -> D CW transition");
                // Down
                row += currentMove.distance + 1;
                points.push({row: row, col: col});
                // Over
                //col -= 1;
                //points.push({row: row, col: col});
            } else {
                console.log("Unexpected move");
            }
        }

        if(previousMove.direction == "L") {
            if(currentMove.direction == "U") {
                console.log("L -> U CW transition");
                // Up
                row -= currentMove.distance;
                points.push({row: row, col: col});
                // Over
                col += 1;
                points.push({row: row, col: col});
            } else if(currentMove.direction == "D") {
                console.log("L -> D CCW transition");
                console.log(`row: ${row}, col: ${col}`);
                col -= previousMove.distance;
                console.log(`row: ${row}, col: ${col}`);
                points.push({row: row, col: col});
            } else {
                console.log("Unexpected move");
            }

        }

        if(previousMove.direction == "U") {
            if(currentMove.direction == "R") {
                console.log("U -> R CW transition");
                // Over
                col += currentMove.distance;
                points.push({row: row, col: col});
                // Down
                //row += 1;
                //points.push({row: row, col: col});
            } else if(currentMove.direction == "L") {
                console.log("U -> L CCW transition");
                row -= previousMove.distance - 1;
                points.push({row: row, col: col});
            } else {
                console.log("Unexpected move");
            }
        }

        if(previousMove.direction == "D") {
            if(currentMove.direction == "R") {
                console.log("D -> R CCW transition");
                row += previousMove.distance - 1;
                points.push({row: row, col: col});
            } else if(currentMove.direction == "L") {
                console.log("D -> L CW transition");
                // over
                col -= currentMove.distance + 1;
                points.push({row: row, col: col});
                // up
                //row -= 1;
                //points.push({row: row, col: col});
            } else {
                console.log("Unexpected move");
            }
        }

        console.log(`After (${col}, ${row})`);

        //console.log(`Adding point (${col}, ${row})`);
        //points.push({row: row, col: col, color: move.color});

        previousMove = currentMove;*/
    }

    for(let i = 0; i < points.length; i++) {
        console.log(`(${points[i].col}, ${points[i].row})`);
    }

    // Shoe lace algorithm
    let area = 0;
    let j = points.length - 1;
    for(let i = 0; i < points.length; i++) {
        area += points[j].col * points[i].row - points[i].col * points[j].row;
        j = i;
    }

    return Math.abs(area / 2);
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

    console.log(moves);

    totalArea = solveBoard2(moves);
    //let totalArea = calculateTotalArea(board);
    console.log(`Part 1: ${totalArea}`);
}

function part2() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);

    let moves = [];

    for(let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(" ");
        let color = parts[2].substring( 1, parts[2].length - 1);
        let direction;
        if(color[6] == "0") {
            direction = "R";
        } else if(color[6] == "1") {
            direction = "D";
        } else if(color[6] == "2") {
            direction = "L";
        } else if(color[6] == "3") {
            direction = "U";
        }

        //let direction = parts[0];
        let distance = parseInt(color.substring(1, 6), 16);
        
        moves.push({direction: direction, distance: distance, color: color});
    }

    console.log(moves);

    let area = solveBoard2(moves);
    console.log(`Part 2: ${area}`);

    
}

part1();
//part2();
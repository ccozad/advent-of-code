const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-16-input.txt";

function solveBoard(board, beams) {
    let time = 0;
    let beamsActive = true;
    let distanceLimit = 1000;
    let distanceLimitReached = false;
    while(beamsActive && !distanceLimitReached) {
        time++;
        // Step each beam
        // We may add beams as we go so we need to know how many beams we start with
        let iterations = beams.length;

        for(let i = 0; i < iterations; i++) {
            if(!beams[i].isActive) {
                continue;
            }

            if (beams[i].row < 0 || beams[i].row >= board.length || beams[i].col < 0 || beams[i].col >= board[beams[i].row].length) {
                beams[i].isActive = false;
                continue;
            }

            beams[i].distance++;
            
            let cell = board[beams[i].row][beams[i].col];
            cell.visits++;

            if (beams[i].distance > distanceLimit) {
                console.log(`Distance limit reached: ${beams[i].distance}`);
                distanceLimitReached = true;
                break;
            }

            if (cell.piece == "|") {
                if ( beams[i].direction == "E" || beams[i].direction == "W") {
                    // Stop forking the beam to allow more iterations
                    beams[i].isActive = false;
                    cell.splitCount++;
                    if (cell.splitCount < 10) {
                        beams.push({row: beams[i].row - 1, col: beams[i].col, direction: "N", isActive: true});
                        beams.push({row: beams[i].row + 1, col: beams[i].col, direction: "S", isActive: true});
                    }
                }
            } else if (cell.piece == "-") {
                if ( beams[i].direction == "N" || beams[i].direction == "S") {
                    // Stop forking the beam to allow more iterations
                    beams[i].isActive = false;

                    cell.splitCount++;
                    if (cell.splitCount < 10) {
                        beams.push({row: beams[i].row, col: beams[i].col + 1, direction: "E", isActive: true});
                        beams.push({row: beams[i].row, col: beams[i].col - 1, direction: "W", isActive: true});
                    }
                }
            } else if (cell.piece == "/") {
                if ( beams[i].direction == "N") {
                    beams[i].direction = "E";
                } else if ( beams[i].direction == "S") {
                    beams[i].direction = "W";
                } else if ( beams[i].direction == "E") {
                    beams[i].direction = "N";
                } else if ( beams[i].direction == "W") {
                    beams[i].direction = "S";
                }
            } else if (cell.piece == "\\") {
                if ( beams[i].direction == "N") {
                    beams[i].direction = "W";
                } else if ( beams[i].direction == "S") {
                    beams[i].direction = "E";
                } else if ( beams[i].direction == "E") {
                    beams[i].direction = "S";
                } else if ( beams[i].direction == "W") {
                    beams[i].direction = "N";
                }
            } 
            
            if(beams[i].direction == "E") {
                beams[i].col++;
            } else if(beams[i].direction == "W") {
                beams[i].col--;
            } else if(beams[i].direction == "N") {
                beams[i].row--;
            } else if(beams[i].direction == "S") {
                beams[i].row++;
            }
        }

        beams = beams.filter(beam => beam.isActive);

        beamsActive = beams.length > 0;
    }
}

function calculateTotalEnergized(board) {
    let totalEnergized = 0;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if (board[i][j].visits > 0) {
                totalEnergized++;
            }
        }
    }
    return totalEnergized;
}

function part1() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);

    let board = [];

    for(let i = 0; i < lines.length; i++) {
        board.push([]);
        for(let j = 0; j < lines[i].length; j++) {
            let value = {
                piece: lines[i][j],
                visits: 0,
                splitCount: 0
            }
            board[i].push(value);
        }
    }
    let beams = [{row: 0, col: 0, direction: "E", isActive: true, distance: 0}];
    solveBoard(board, beams);
    let totalEnergized = calculateTotalEnergized(board);
    console.log(`Part 1: ${totalEnergized}`);
}

function part2() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);

    let board = [];

    for(let i = 0; i < lines.length; i++) {
        board.push([]);
        for(let j = 0; j < lines[i].length; j++) {
            let value = {
                piece: lines[i][j],
                visits: 0,
                splitCount: 0
            }
            board[i].push(value);
        }
    }

    let energizedTestResults = [];
    // West edges
    for(let i = 0; i < board.length; i++) {
        let newBoard = JSON.parse(JSON.stringify(board));
        let beams = [{row: i, col: 0, direction: "E", isActive: true, distance: 0}];
        solveBoard(newBoard, beams);
        energizedTestResults.push(calculateTotalEnergized(newBoard));
    }

    // East edges
    for(let i = 0; i < board.length; i++) {
        let newBoard = JSON.parse(JSON.stringify(board));
        let beams = [{row: i, col: board[0].length - 1, direction: "W", isActive: true, distance: 0}];
        solveBoard(newBoard, beams);
        energizedTestResults.push(calculateTotalEnergized(newBoard));
    }

    // North edges
    for(let i = 0; i < board[0].length; i++) {
        let newBoard = JSON.parse(JSON.stringify(board));
        let beams = [{row: 0, col: i, direction: "S", isActive: true, distance: 0}];
        solveBoard(newBoard, beams);
        energizedTestResults.push(calculateTotalEnergized(newBoard));
    }

    // South edges
    for(let i = 0; i < board[0].length; i++) {
        let newBoard = JSON.parse(JSON.stringify(board));
        let beams = [{row: board.length - 1, col: i, direction: "N", isActive: true, distance: 0}];
        solveBoard(newBoard, beams);
        energizedTestResults.push(calculateTotalEnergized(newBoard));
    }

    let maxEnergized = Math.max(...energizedTestResults);
    console.log(`Max energized: ${maxEnergized}`);
    
}

part1();
part2();



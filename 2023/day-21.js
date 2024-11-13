const fs = require('fs');
const fileName = "data/day-21-test2.txt";

function isvalid(grid, col, row) {
    return col >= 0 && col < grid.length && row >= 0 && row < grid.length;
}

function getcell(grid, col, row, direction) {
    let newRow = row;
    let newCol = col;

    if (direction == 'E') {
        newCol++;
    } else if (direction == 'W') {
        newCol--;
    } else if (direction == 'N') {
        newRow--;
    } else {
        newRow++;
    }

    if (isvalid(grid, newCol, newRow)) {
        if (grid[newRow][newCol] == '#') {
            return null;
        } else {
            return {row: newRow, col: newCol, value: grid[newRow][newCol]};
        }
    } else {
        return null;
    }
}

function seedStepsLeft(grid) {
    let stepsLeft = [];
    for(let i = 0; i < grid.length; i++) {
        stepsLeft.push([]);
        for(let j = 0; j < grid.length; j++) {
            stepsLeft[i].push(Number.MAX_SAFE_INTEGER);
        }
    }

    return stepsLeft;

}

function part1() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);

    let grid = [];
    let stepsLeft = [];
    let start = {col: 0, row: 0};
    let neighborLookup = {};

    for(let i = 0; i < lines.length; i++) {
        grid.push([]);
        let line = lines[i].split("");
        for(let j = 0; j < line.length; j++) {
            if (line[j] == "S") {
                start = {col: j, row: i};
            }
            grid[i].push(line[j]);
        }
    }

    let westNeighbor, eastNeighbor, northNeighbor, southNeighbor;
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            let neighbors = [];
            westNeighbor = getcell(grid, j, i, 'W');
            eastNeighbor = getcell(grid, j, i, 'E');
            northNeighbor = getcell(grid, j, i, 'N');
            southNeighbor = getcell(grid, j, i, 'S');

            if (westNeighbor != null) {
                neighbors.push({col: westNeighbor.col, row: westNeighbor.row});
            }

            if (eastNeighbor != null) {
                neighbors.push({col: eastNeighbor.col, row: eastNeighbor.row});
            }

            if (northNeighbor != null) {
                neighbors.push({col: northNeighbor.col, row: northNeighbor.row});
            }

            if (southNeighbor != null) {
                neighbors.push({col: southNeighbor.col, row: southNeighbor.row});
            }

            neighborLookup[`${i}-${j}`] = neighbors;
        }
    }

    let history = {};

    for(let targetSteps=1; targetSteps< 11; targetSteps++) {
        let processqueue = [];
        let reachableCells = {};
        let calculations = 0;
        history = {};
        stepsLeft = seedStepsLeft(grid);
        processqueue.push({col: start.col, row: start.row, stepsLeft: targetSteps});
        while(processqueue.length > 0) {
            let current = processqueue.shift();
            if (current.stepsLeft == 0) {
                reachableCells[`${current.row}-${current.col}`] = current;
                //process.stdout.write("*");
            } else {
                if (!history.hasOwnProperty(`${current.row}-${current.col}-${current.stepsLeft}`)) {
                    history[`${current.row}-${current.col}-${current.stepsLeft}`] = true;
                    //console.log(`Adding neighbors of ${current.row}-${current.col}-${current.stepsLeft}`);
                    
                    for(let i = 0; i < neighborLookup[`${current.row}-${current.col}`].length; i++) {
                        let neighbor = neighborLookup[`${current.row}-${current.col}`][i];
                        if(current.stepsLeft - 1 == 0) {
                            reachableCells[`${neighbor.row}-${neighbor.col}`] = {col: neighbor.col, row: neighbor.row, stepsLeft: 0};
                        } else {
                            processqueue.push({col: neighbor.col, row: neighbor.row, stepsLeft: current.stepsLeft - 1});
                        }
                    }
                } else {
                    //console.log(`Skipping neighbors of ${current.row}-${current.col}-${current.stepsLeft}`);
                }
            }
            calculations++;
        }
    
        console.log(`\n${targetSteps},${Object.keys(reachableCells).length}`);
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[0].length; j++) {
                if (reachableCells.hasOwnProperty(`${i}-${j}`)) {
                    process.stdout.write("O");
                } else {
                    process.stdout.write(grid[i][j]);
                }
            }
            console.log();
        }
    }
}

part1();
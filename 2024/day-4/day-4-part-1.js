const { count } = require('console');
const fs = require('fs');
const path = require('path');
const wordLength = 4;

//const filePath = path.join("../data/day-4-sample2.txt");
const filePath = path.join("../data/day-4-input.txt");
const data = fs.readFileSync(filePath, 'utf-8');
const lines = data.split('\n');
const grid = [];
for (let i = 0; i < lines.length; i++) {
    grid.push(lines[i].split(''));
}

function checkUp(grid, x, y) {
    if (y < wordLength - 1) {
        return false;
    } else {
        return grid[y][x] === "X" &&
            grid[y - 1][x] === "M" &&
            grid[y - 2][x] === "A" &&
            grid[y - 3][x] === "S";
    }
}

function checkDown(grid, x, y) {
    if (y > grid.length - wordLength) {
        return false;
    } else {
        return grid[y][x] === "X" &&
            grid[y + 1][x] === "M" &&
            grid[y + 2][x] === "A" &&
            grid[y + 3][x] === "S";
    }
}

function checkLeft(grid, x, y) {
    if (x < wordLength - 1) {
        return false;
    } else {
        return grid[y][x] === "X" &&
            grid[y][x - 1] === "M" &&
            grid[y][x - 2] === "A" &&
            grid[y][x - 3] === "S";
    }
}

function checkRight(grid, x, y) {
    if (x > grid[0].length - wordLength) {
        return false;
    } else {
        return grid[y][x] === "X" &&
            grid[y][x + 1] === "M" &&
            grid[y][x + 2] === "A" &&
            grid[y][x + 3] === "S";
    }
}

function checkDiagonalUpLeft(grid, x, y) {
    if (x < wordLength - 1 || y < wordLength - 1) {
        return false;
    } else {
        return grid[y][x] === "X" &&
            grid[y - 1][x - 1] === "M" &&
            grid[y - 2][x - 2] === "A" &&
            grid[y - 3][x - 3] === "S";
    }
}

function checkDiagonalUpRight(grid, x, y) {
    if (x > grid[0].length - wordLength || y < wordLength - 1) {
        return false;
    } else {
        return grid[y][x] === "X" &&
            grid[y - 1][x + 1] === "M" &&
            grid[y - 2][x + 2] === "A" &&
            grid[y - 3][x + 3] === "S";
    }
}

function checkDiagonalDownLeft(grid, x, y) {
    if (x < wordLength - 1 || y > grid.length - wordLength) {
        return false;
    } else {
        return grid[y][x] === "X" &&
            grid[y + 1][x - 1] === "M" &&
            grid[y + 2][x - 2] === "A" &&
            grid[y + 3][x - 3] === "S";
    }
}

function checkDiagonalDownRight(grid, x, y) {
    if (x > grid[0].length - wordLength || y > grid.length - wordLength) {
        return false;
    } else {
        return grid[y][x] === "X" &&
            grid[y + 1][x + 1] === "M" &&
            grid[y + 2][x + 2] === "A" &&
            grid[y + 3][x + 3] === "S";
    }
}

function allDirectionCount(grid, x, y) {
    //console.log(`\nChecking cell at (${x}, ${y})`);
    if (grid[y][x] != "X") {
        //console.log("Cell is not an X, skipping");
        return 0;
    } else {
        //console.log("Cell is an X, checking all directions");
        var count = 0;
        if (checkUp(grid, x, y)) {
            count++;
        }

        if (checkDown(grid, x, y)) {
            count++;
        }

        if (checkLeft(grid, x, y)) {
            count++;
        }

        if (checkRight(grid, x, y)) {
            count++;
        }

        if (checkDiagonalUpLeft(grid, x, y)) {
            count++;
        }

        if (checkDiagonalUpRight(grid, x, y)) {
            count++;
        }

        if (checkDiagonalDownLeft(grid, x, y)) {
            count++;
        }

        if (checkDiagonalDownRight(grid, x, y)) {
            count++;
        }

        return count;
    }
}

var totalCount = 0;
for(let x = 0; x < grid[0].length; x++) {
    for(let y = 0; y < grid.length; y++) {
        totalCount += allDirectionCount(grid, x, y);
    }
}

console.log(`Total count: ${totalCount}`);
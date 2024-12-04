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

// M.S
// .A.
// M.S
function checkCombo1(grid, x, y) {
    if (x > grid[0].length - 3|| y > grid.length - 3) {
        return false;
    } else {
        return grid[y][x] === "M" &&
            grid[y + 1][x + 1] === "A" &&
            grid[y + 2][x + 2] === "S" &&
            grid[y][x + 2] === "S" &&
            grid[y + 2][x] === "M";
    }
}

// S.S
// .A.
// M.M
function checkCombo2(grid, x, y) {
    if (x > grid[0].length - 3|| y > grid.length - 3) {
        return false;
    } else {
        return grid[y][x] === "S" &&
            grid[y + 1][x + 1] === "A" &&
            grid[y + 2][x + 2] === "M" &&
            grid[y][x + 2] === "S" &&
            grid[y + 2][x] === "M";
    }
}

// M.M
// .A.
// S.S
function checkCombo3(grid, x, y) {
    if (x > grid[0].length - 3|| y > grid.length - 3) {
        return false;
    } else {
        return grid[y][x] === "M" &&
            grid[y + 1][x + 1] === "A" &&
            grid[y + 2][x + 2] === "S" &&
            grid[y][x + 2] === "M" &&
            grid[y + 2][x] === "S";
    }
}

// S.M
// .A.
// S.M
function checkCombo4(grid, x, y) {
    if (x > grid[0].length - 3|| y > grid.length - 3) {
        return false;
    } else {
        return grid[y][x] === "S" &&
            grid[y + 1][x + 1] === "A" &&
            grid[y + 2][x + 2] === "M" &&
            grid[y][x + 2] === "M" &&
            grid[y + 2][x] === "S";
    }
}


function allDirectionCount(grid, x, y) {
    var count = 0;
    if (checkCombo1(grid, x, y)) {
        count++;
    }

    if (checkCombo2(grid, x, y)) {
        count++;
    }

    if (checkCombo3(grid, x, y)) {
        count++;
    }

    if (checkCombo4(grid, x, y)) {
        count++;
    }

    return count;
}

var totalCount = 0;
for(let x = 0; x < grid[0].length; x++) {
    for(let y = 0; y < grid.length; y++) {
        totalCount += allDirectionCount(grid, x, y);
    }
}

console.log(`Total count: ${totalCount}`);
const fs = require('fs');
const fileName = "data/day-10-input.txt";

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);
let start = {col: 0, row: 0};

let symbolMap = {
    "F": "\u250F",
    "J": "\u251B",
    "L": "\u2517",
    "7": "\u2513",
    "|": "\u2503",
    "-": "\u2501",
}

const board = [];
for(let i = 0; i < lines.length; i++) {
    let cells = lines[i].split("");
    board.push([]);
    for(let j = 0; j < cells.length; j++) {
        board[i].push({
            col: j, 
            row: i, 
            symbol: cells[j], 
            connections: {}
        });
        if (cells[j] == "|"){
            board[i][j].connections = [ { row: i - 1, col: j }, { row: i + 1, col: j } ];
        } else if (cells[j] == "-") {
            board[i][j].connections = [ { row: i, col: j - 1 }, { row: i, col: j + 1 } ];
        }else if (cells[j] == "7") {
            board[i][j].connections = [ { row: i, col: j - 1 }, { row: i + 1, col: j } ];
        } else if (cells[j] == "J") {
            board[i][j].connections = [ { row: i, col: j - 1 }, { row: i - 1, col: j } ];
        } else if (cells[j] == "L") {
            board[i][j].connections = [ { row: i, col: j + 1 }, { row: i - 1, col: j } ];
        } else if (cells[j] == "F") {
            board[i][j].connections = [ { row: i, col: j + 1 }, { row: i + 1, col: j } ];
        } else if (cells[j] == "S") {
            start = {col: j, row: i};
            board[i][j].isStart = true;
        }
    }
}

board[start.row][start.col].visited = true;
board[start.row][start.col].distance = 0;
let top = board[start.row - 1][start.col];
let bottom = board[start.row + 1][start.col];
let left = board[start.row][start.col - 1];
let right = board[start.row][start.col + 1];
let searchPath1;
let searchPath2;
// Determine start symbol
function initializeStart() {
    searchPath1 = [];
    searchPath2 = [];
    let topConnection = top.symbol == "|" || top.symbol == "7" || top.symbol == "F";
    let bottomConnection = bottom.symbol == "|" || bottom.symbol == "J" || bottom.symbol == "L";
    let leftConnection = left.symbol == "-" || left.symbol == "F" || left.symbol == "L";
    let rightConnection = right.symbol == "-" || right.symbol == "7" || right.symbol == "J";

    console.log(`Top connection: ${topConnection}`);
    console.log(`Bottom connection: ${bottomConnection}`);
    console.log(`Left connection: ${leftConnection}`);
    console.log(`Right connection: ${rightConnection}`);

    if (topConnection && bottomConnection) {
        board[start.row][start.col].symbol = "|";
        board[start.row][start.col].connections = [ { row: start.row - 1, col: start.col }, { row: start.row + 1, col: start.col }];
        searchPath1.push(top);
        searchPath2.push(bottom);
    } else if (leftConnection && rightConnection) {
        board[start.row][start.col].symbol = "-";
        board[start.row][start.col].connections = [ { row: start.row, col: start.col - 1 }, { row: start.row, col: start.col + 1 }];
        searchPath1.push(left);
        searchPath2.push(right);
    } else if (leftConnection && bottom.connections.up) {
        board[start.row][start.col].symbol = "7";
        board[start.row][start.col].connections = [ { row: start.row, col: start.col - 1 }, { row: start.row + 1, col: start.col } ];
        searchPath1.push(left);
        searchPath2.push(bottom);
    } else if (leftConnection && bottomConnection) {
        board[start.row][start.col].symbol = "J";
        board[start.row][start.col].connections = [ { row: start.row, col: start.col - 1 }, { row: start.row - 1, col: start.col } ];
        searchPath1.push(left);
        searchPath2.push(top);
    } else if (rightConnection && topConnection) {
        board[start.row][start.col].symbol = "L";
        board[start.row][start.col].connections = [ { row: start.row, col: start.col + 1 }, { row: start.row - 1, col: start.col }];
        searchPath1.push(right);
        searchPath2.push(top);
    } else if (rightConnection && bottomConnection) {
        board[start.row][start.col].symbol = "F";
        board[start.row][start.col].connections = [ { row: start.row, col: start.col + 1 }, { row: start.row + 1, col: start.col }];
        searchPath1.push(right);
        searchPath2.push(bottom);
    }

    console.log(board[start.row][start.col]);
}

function getNextNode(node) {
    let nextNode = undefined;
    for(let i = 0; i < node.connections.length; i++) {
        let connection = node.connections[i];
        if (board[connection.row][connection.col].visited) {
            continue;
        }

        nextNode = board[connection.row][connection.col];
        break;
    }

    return nextNode;
}

initializeStart();

let moreNodesToVisit = true;
let distance = 0;
let node1 = undefined;
let node2 = undefined;

while(moreNodesToVisit) {
    distance++;
    node1 = searchPath1[searchPath1.length - 1];
    node2 = searchPath2[searchPath2.length - 1]; 
    
    if (node1 == undefined || node2 == undefined) { 
        moreNodesToVisit = false;
        break;
    }
    
    node1.visited = true;
    node1.distance = distance;

    node2.visited = true;
    node2.distance = distance;

    if (node1.row == node2.row && node1.col == node2.col) {
        moreNodesToVisit = false;
        break;
    } else {
        searchPath1.push(getNextNode(node1));
        searchPath2.push(getNextNode(node2));
    }
}

console.log(`Part 1: ${distance}`);

// Left to right
for(let i = 0; i < board.length; i++) {
    let pipeCount = 0;
    for(let j = 0; j < board[i].length; j++) {
        if (board[i][j].distance != undefined && board[i][j].symbol == "|" && board[i][j].symbol != "J" && board[i][j].symbol != "L") {
            pipeCount++; 
        } else if (board[i][j].distance != undefined && board[i][j].symbol != "-" && board[i][j].symbol != "7" && board[i][j].symbol != "F") {
            pipeCount--;
        } 
        else {
            if(pipeCount % 2 == 0) {
                board[i][j].outside = true;
            }
        }
    }
}

// Right to left
for(let i = 0; i < board.length; i++) {
    let pipeCount = 0;
    for(let j = board[i].length - 1; j >= 0; j--) {
        if (board[i][j].distance != undefined && board[i][j].symbol == "|" && board[i][j].symbol != "J" && board[i][j].symbol != "L"){
            pipeCount++;
        } else if (board[i][j].distance != undefined && board[i][j].symbol != "-" && board[i][j].symbol != "7" && board[i][j].symbol != "F") {
            pipeCount--;
        } else {
            if(pipeCount % 2 == 0) {
                board[i][j].outside = true;
            } 
        }
    }
}

let insideCount = 0;
// Part 2
for(let i = 0; i < board.length; i++) {
    console.log();
    for(let j = 0; j < board[i].length; j++) {
        if (board[i][j].distance != undefined) {
            process.stdout.write(`${symbolMap[board[i][j].symbol]}`);
        } else {
            if (!board[i][j].outside) {
                process.stdout.write("*");
                insideCount++;
            } else {
                process.stdout.write(" ");
            }
        }
    }
}

console.log(`\nInside count: ${insideCount}`);
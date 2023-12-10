const fs = require('fs');
const fileName = "data/day-10-test2.txt";

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

// Determine start symbol
board[start.row][start.col].visited = true;
board[start.row][start.col].distance = 0;
let top = board[start.row - 1][start.col];
let bottom = board[start.row + 1][start.col];
let left = board[start.row][start.col - 1];
let right = board[start.row][start.col + 1];
let searchPath1 = [];
let searchPath2 = []

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
/*let processQueue = [];
board[0][0].outside = true;
board[board.length - 1][board[0].length - 1].outside = true;
processQueue.push(board[0][0]);
processQueue.push(board[board.length - 1][board[board.length - 1].length - 1]);

let count = 0;
while(processQueue.length > 0) {
    //console.log(processQueue);
    let node = processQueue.shift();
    
    if(node.row < board.length - 1) {
        bottom = board[node.row + 1][node.col];
        if(bottom.outside == undefined) {
            if (bottom.distance == undefined) {
                bottom.outside = true;
                processQueue.push(bottom);
            }
        }
        
    }

    if(node.row > 0) {
        top = board[node.row - 1][node.col];
        if(top.outside == undefined) {
            if (top.distance == undefined) {
                top.outside = true;
                processQueue.push(top);
            }
        }
        
    }

    if(node.col < board[0].length - 1) {
        right = board[node.row][node.col + 1];
        if(right.outside == undefined) {
            if (right.distance == undefined) {
                right.outside = true;
                processQueue.push(right);
            }
        }
        
    }

    if(node.col > 0) {
        left = board[node.row][node.col - 1];
        if(left.outside == undefined) {
            if (left.distance == undefined) {
                left.outside = true;
                processQueue.push(left);
            }
        }
        
    }

    count++;
}*/

for(let i = 0; i < board.length; i++) {
    let pipeCount = 0;
    for(let j = 0; j < board[i].length; j++) {
        if (board[i][j].distance != undefined) {
            pipeCount++;
        } else {
            if(pipeCount % 2 == 0) {
                board[i][j].outside = true;
            } else {
                board[i][j].outside = false;
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
            
        /*if (board[i][j].distance > 0 || board[i][j].symbol == "S") {
            outside = !outside;
            break;
        } else {
            board[i][j].outside = outside;
            insideCount++;
        }*/
    }
}

console.log(`\nInside count: ${insideCount}`);
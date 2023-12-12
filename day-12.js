const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-12-input.txt";

function isValidCondition(condition, expectedGroups) {
    let isValid = true;
    let group = []
    let groupsFound = []
    for(let i = 0; i < condition.length; i++) {
        if (condition[i] == "#") {
            group.push(i);
        } else if(condition[i] == ".") {
            if (group.length > 0) {
                groupsFound.push(group.length);
                group = [];
            }
        }
    }

    if (group.length > 0) {
        groupsFound.push(group.length);
    }

    // Compare detected groups and expected groups
    if (groupsFound.length != expectedGroups.length) {
        isValid = false;
    } else {
        for(let i = 0; i < groupsFound.length; i++) {
            if (groupsFound[i] != expectedGroups[i]) {
                isValid = false;
                break;
            }
        }
    }


    return isValid;
}

function generateArrangement(index, length) {
    let arrangement = [];
    let binary = index.toString(2).padStart(length, "0");
    for(let i = 0; i < binary.length; i++) {
        if (binary[i] == "0") {
            arrangement.push(".");
        } else {
            arrangement.push("#");
        }
    }

    return arrangement.join("");
}

function generateCondition(condition, arrangement, unknowns) {
    let newCondition = condition.split("");
    for(let i = 0; i < unknowns.length; i++) {
        newCondition[unknowns[i]] = arrangement[i];
    }

    return newCondition.join("");
}

function findArrangements(condition, expectedGroups) {
    //console.log(`Finding arrangements for condition: ${condition}, groups: ${expectedGroups}`)
    let arrangements = [];
    let unknowns = [];
    for(let i = 0; i < condition.length; i++) {
        if (condition[i] == "?") {
            unknowns.push(i);
        }
    }

    let arrangement = "";
    let newCondition = "";
    let permutations = Math.pow(2, unknowns.length);
    for(let i = 0; i < permutations; i++) {
        arrangement = generateArrangement(i, unknowns.length);
        newCondition = generateCondition(condition, arrangement, unknowns);
        if (isValidCondition(newCondition, expectedGroups)) {
            arrangements.push(newCondition);
            //console.log(`Found arrangement: ${newCondition}`);
        }
    }

    return arrangements;
}

function processRecord(record) {
    let arrangements = findArrangements(record.conditions, record.groups);
    return arrangements;
}


const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);

const records = [];
for(let i = 0; i < lines.length; i++) {
    let rawData = lines[i].split(" ");
    records.push({ 
        conditions: rawData[0], 
        groups: rawData[1].split(",").map(x => Number(x)),
        arrangements: []
    })
}

let sum = 0;
for(let i = 0; i < records.length; i++) {
    let record = records[i];
    record.arrangements = processRecord(record);
    sum += record.arrangements.length;
}

console.log(`Part 1: ${sum} possible arrangements`);
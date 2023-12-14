const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-12-input.txt";

const pow2Lookup = {
    0: 1,
    1: 2,
    2: 4,
    3: 8,
    4: 16,
    5: 32,
    6: 64,
    7: 128,
    8: 256,
    9: 512,
    10: 1024,
    11: 2048,
    12: 4096,
    13: 8192,
    14: 16384,
    15: 32768,
    16: 65536,
    17: 131072,
    18: 262144
}

function isValidCondition(condition, expectedGroups) {
    let isValid = true;
    let groupSize = 0;
    let groupsFound = [];


    for(let i = 0; i < condition.length; i++) {
        if (condition[i] == "#") {
            groupSize++;
        } else if(condition[i] == ".") {
            if (groupSize > 0) {
                groupsFound.push(groupSize);
                groupSize = 0;
            }
        }
    }

    if (groupSize > 0) {
        groupsFound.push(groupSize);
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

function generateArrangement(index, memo = {}) {
    if (memo.hasOwnProperty(index)) {
        return memo[index];
    }
    let arrangement = [];
    let binary = index.toString(2);
    for(let i = 0; i < binary.length; i++) {
        if (binary[i] == "0") {
            arrangement.push(".");
        } else {
            arrangement.push("#");
        }
    }

    memo[index] = arrangement.join("");

    return memo[index];
}

function findArrangements(condition, expectedGroups, memo = {}) {
    //console.log(`Finding arrangements for condition: ${condition}, groups: ${expectedGroups}`)
    let arrangements = 0;
    let unknowns = [];
    for(let i = 0; i < condition.length; i++) {
        if (condition[i] == "?") {
            unknowns.push(i);
        }
    }

    let arrangement = "";
    let permutations = pow2Lookup[unknowns.length];;
    /*if (pow2Lookup.hasOwnProperty(unknowns.length)) {
        permutations = pow2Lookup[unknowns.length];
    } else {
        permutations = Math.pow(2, unknowns.length);
        pow2Lookup[unknowns.length] = permutations;
    }*/
    
    let conditionArray = condition.split("");
    for(let i = 0; i < permutations; i++) {
        arrangement = generateArrangement(i, memo);
        arrangement = arrangement.padStart(unknowns.length, ".");
        for(let i = 0; i < unknowns.length; i++) {
            conditionArray[unknowns[i]] = arrangement[i];
        }

        if (isValidCondition(conditionArray, expectedGroups)) {
            arrangements++;
            //console.log(`Found arrangement: ${newCondition}`);
        }
    }

    return arrangements;
}

function findArrangements2(condition, expectedGroups, basePatterns) {
    //console.log(`Finding arrangements for condition: ${condition}, groups: ${expectedGroups}`)
    let arrangements = [];
    let unknowns = [];
    let basepatterns = []
    for(let i = 0; i < condition.length; i++) {
        if (condition[i] == "?") {
            unknowns.push(i);
        } else if (condition[i] == "B") {
            basepatterns.push(i);
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

function processRecord(record, memo = {}) {
    let arrangements = findArrangements(record.conditions, record.groups, memo);
    return arrangements;
}

function processRecord2(record) {
    let baseGroups = record
    let baseArrangements = findArrangements(record.baseCondition, baseGroups);
    let expandedCondition = "B?B?B?B?B";
    let expandedGroups = [...baseGroups, ...baseGroups, ...baseGroups, ...baseGroups, ...baseGroups];
}


const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);

const records = [];
for(let i = 0; i < lines.length; i++) {
    let rawData = lines[i].split(" ");
    records.push({ 
        conditions: rawData[0], 
        groups: rawData[1].split(",").map(x => Number(x)),
        arrangements: 0
    })
}

let sum = 0;
let memo = {};
for(let i = 0; i < records.length; i++) {
    if ( i % 50 == 0) {
        console.log(`Processing record ${i}...`);
    }
    let record = records[i];
    record.arrangements = processRecord(record, memo);
    sum += record.arrangements;
}

console.log(`Part 1: ${sum} possible arrangements`);
//console.log(pow2Lookup);

/*const records2 = [];
for(let i = 0; i < lines.length; i++) {
    let rawData = lines[i].split(" ");
    let groups = rawData[1].split(",").map(x => Number(x));
    records2.push({
        baseCondition: rawData[0],
        baseGroups: groups,
        arrangements: []
    })
}

console.log(records2);
let part2Lookups = {};

let sum2 = 0;
for(let i = 0; i < records2.length; i++) {
    //if ( i % 50 == 0) {
        console.log(`Processing record ${i}...`);
    //}
    let record = records2[i];
    record.arrangements = processRecord(record);
    sum2 += record.arrangements.length;
}

console.log(`Part 2: ${sum2} possible arrangements`);*/
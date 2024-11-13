const { group } = require('console');
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
    let groupSize = 0;
    let groupsFound = 0;
    let groupIndex = 0;

    for(let i = 0; i < condition.length; i++) {
        if (condition[i] == "#") {
            groupSize++;
        } else if(condition[i] == ".") {
            if (groupSize > 0) {
                groupsFound++;
                if(groupsFound >= expectedGroups.length) {
                    return false;
                } else if (groupSize != expectedGroups[groupIndex]) {
                    return false;
                } else {
                    groupSize = 0;
                    groupIndex++;
                }
            }
        }
    }

    if (groupSize > 0) {
        groupsFound++;
        if(groupsFound >= expectedGroups.length) {
            return false;
        } else if (groupSize != expectedGroups[expectedGroups.length - 1]) {
            return false;
        }
    }

    return true;
}

function isValidGroup(pattern, expectedGroupSize, memo = {}) {
    let key = `${pattern},${expectedGroupSize}`;
    
    if (memo.hasOwnProperty(key)) {
        return memo[key];
    }

    let groupSize = 0;

    for(let i = 0; i < pattern.length; i++) {
        if (patther[i] == "#") {
            groupSize++;
        } else {
            return false;
        }
    }

    return groupSize == expectedGroupSize;
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

// ???.### [1, 0, 1, 0, 3]
//segments: ["???", ".", "###"]
function processSegment(segment, groupSize, memo = {}) {
    if (memo.hasOwnProperty(groupSize) && memo[groupSize].hasOwnProperty(segment)) {
        return memo[groupSize][segment];
    }

    // There are zero moves because there are not enough items
    if (segment.length < groupSize) {
        memo[groupSize][segment] = [];
        return []
    }

    let arrangements = [];
    let testPattern = "";
    for(let i = 0; i < segment.length - groupSize + 1; i++) {
        testPattern = segment.substring(i, i + groupSize);
        testPattern.replace("?", "#");
        if (isValidCondition(testPattern, [groupSize])) {
            arrangements.push(testPattern);
        }
    }

function findArrangements(condition, expectedGroups, memo = {}) {
    //console.log(`Finding arrangements for condition: ${condition}, groups: ${expectedGroups}`)
    let arrangements = 0;
    let unknowns = [];
    unknownGroups = [];
    for(let i = 0; i < condition.length; i++) {
        if (condition[i] == "?") {
            unknowns.push(i);
        }
    }

    let arrangement = "";
    let permutations = pow2Lookup[unknowns.length];

    
    // Can we take a different approach here?
    // Every pattern is always tried, even if it is a dead end.
    let conditionArray = condition.split("");
    for(let i = 0; i < permutations; i++) {
        arrangement = generateArrangement(i, memo);
        arrangement = arrangement.padStart(unknowns.length, ".");
        for(let i = 0; i < unknowns.length; i++) {
            conditionArray[unknowns[i]] = arrangement[i];
        }

        if (isValidCondition(conditionArray, expectedGroups)) {
            arrangements++;
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
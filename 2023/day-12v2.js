const { group } = require('console');
const exp = require('constants');
const fs = require('fs');
const fileName = "data/day-12-test2.txt";

// pattrn = "???.###""
// segmentGroups = ["???", ".", "###"]
function segmentGroups(pattern) {
    let segments = [];
    let groupType1 = []; // "?" or "#"
    let groupType2 = []; // "."
    for(let i = 0; i < pattern.length; i++) {
        if(pattern[i] == "#" || pattern[i] == "?") {
            if(groupType2.length > 0) {
                segments.push(groupType2.join(""));
                groupType2 = [];
            }
            
            groupType1.push(pattern[i]);
        } else if(pattern[i] == ".") {
            if(groupType1.length > 0) {
                segments.push(groupType1.join(""));
                groupType1 = [];
            }

            groupType2.push(pattern[i]);
        }
    }

    if(groupType1.length > 0) {
        segments.push(groupType1.join(""));
    }

    if(groupType2.length > 0) {
        segments.push(groupType2.join(""));
    }

    return segments;
}

function processSegment(segment, groupSize, memo) {
    if(memo.hasOwnProperty(groupSize) && memo[groupSize].hasOwnProperty(segment)) {
        return memo[groupSize][segment];
    }

    if (segment.length == 0 || segment.length < groupSize) {
        return []; // There are no possible groups
    }

    if(!memo.hasOwnProperty(groupSize)) {
        memo[groupSize] = {};
    }

    console.log(`Processing ${segment} with group size ${groupSize}`);

    let hasWorking = segment.includes(".");
    let hasBroken = segment.includes("#");
    let hasUnknown = segment.includes("?");

    if (segment.length == groupSize && !hasWorking && !hasUnknown && hasBroken) {
        let group = [segment];
        memo[groupSize][segment] = [group];
    } else if (hasWorking && !hasBroken && !hasUnknown) {
        memo[groupSize][segment] = [];
    } else if (segment.length == groupSize && hasUnknown) {
        let segmentCopy = [...segment].join("");
        let pattern1 = segmentCopy.replace(/\?/g, "#");
        memo[groupSize][segment] = [pattern1];
    } else {
        // We have processing to do...
        // Take the first groupSize characters, replace all "?" with "#"
        // Split into segments and call processSegment on each segment
        // Accumulate all of the groups and return them
        let segments = segmentGroups(segment);
        let groups = [];
        for(let i = 0; i < segments.length; i++) {
            for(let j = 0; j < segments[i].length - groupSize; j++) {
                let segmentGroups = processSegment(segments[i].substring(i, i + groupSize), groupSize, memo);
                groups.push(...segmentGroups);
            }
        }

        memo[groupSize][segment] = groups;
    }

    return memo[groupSize][segment];
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

let memo = {};
for(let i = 0; i < 1; i++) {
    let record = records[i];
    let segments = segmentGroups(record.conditions);
    console.log(`Segments for ${record.conditions}:`);
    console.log(segments);

    for(let j = 0; j < segments.length; j++) {
        for(let k=0; k < record.groups.length; k++) {
            let segment = segments[j];
            let groups = processSegment(segment, record.groups[k], memo);
            console.log(`Groups for ${segment}:`);
            console.log(groups);
        }
        
    }
}


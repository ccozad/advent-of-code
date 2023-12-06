const fs = require('fs');
const fileName = "day-6-p2-input.txt";

function calculateRaceOutcomes(raceDuration, recordDistance) {
    let outcomes = {
        wins: [],
        losses: []
    }

    let result = 0;
    for(let chargeTime = 0; chargeTime < raceDuration; chargeTime++) {
        result = (raceDuration - chargeTime) * chargeTime;;
        if (result > recordDistance) {
            outcomes.wins.push(chargeTime);
        } else {
            outcomes.losses.push(chargeTime);
        }
    }

    return outcomes;
}

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);
const times = [];
const distances = [];
const outcomes = [];

const rawTimes = lines[0].substring(5).split(" ");
const rawDistances = lines[1].substring(9).split(" ");

for (let i = 0; i < rawTimes.length; i++) {
    if (rawTimes[i] == "") {
        continue;
    }

    times.push(Number(rawTimes[i]));
}

for (let i = 0; i < rawDistances.length; i++) {
    if (rawDistances[i] == "") {
        continue;
    }

    distances.push(Number(rawDistances[i]));
}

for (let i = 0; i < times.length; i++) {
    outcomes.push(calculateRaceOutcomes(times[i], distances[i]));
}

let finalAnswer = outcomes.reduce((acc, cur) => {
    return acc * cur.wins.length;
}, 1);

console.log(`Part 1: ${finalAnswer}`);

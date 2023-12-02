const fs = require('fs');
const fileName = "day-2-input.txt";

const target = {
    "red": 12,
    "green": 13,
    "blue": 14
}

function parseGame(game) {
    let gameInfo = {
        max: {},
        power: 0,
        rounds: []
    };
    let colonIndex = game.indexOf(":");
    rawRounds = game.substring(colonIndex + 1);
    let rounds = rawRounds.split(";");
    for(let i =0; i < rounds.length; i++) {
        console.log(rounds[i]);
        let results = rounds[i].split(",");
        let outcomes = {
            "red": 0,
            "green": 0,
            "blue": 0
        }
        for(let j = 0; j < results.length; j++) {
            let result = results[j].trim().split(" ");
            let count = Number(result[0]);
            outcomes[result[1]] = count;
            if (gameInfo.max[result[1]]) {
                if (count > gameInfo.max[result[1]]) {
                    gameInfo.max[result[1]] = count;
                }
            } else {
                gameInfo.max[result[1]] = count;
            }
        }
        gameInfo.rounds.push(outcomes);
    }

    gameInfo.power = gameInfo.max.red * gameInfo.max.green * gameInfo.max.blue;

    return gameInfo;
}

function isGamePossible(game, target) {
    let possible = true;
    for (let key in target) {
        if (game.max[key] > target[key]) {
            possible = false;
            break;
        }
    }

    return possible;
}

//Read each line in the file named fileName
let file = fs.readFileSync(fileName, 'utf8');
const games = file.split(/\r?\n/);

let possibleGames = [];
let totalPower = [];
let impossibleGames = [];

for (let i = 0; i < games.length; i++) {
    let game = parseGame(games[i]);
    console.log("\n--------------\n");
    console.log(`Game ${i + 1}: ${JSON.stringify(game, null, 4)}`);
    totalPower.push(game.power);
    let gamePossible = isGamePossible(game, target);
    if (gamePossible) {
        console.log(`Game ${i + 1} is possible`);
        possibleGames.push(i + 1);
    } else {
        console.log(`Game ${i + 1} is impossible`);
        impossibleGames.push(i + 1);
    }
}

let sumPossibleGames = possibleGames.reduce((a, b) => a + b, 0);
let sumTotalPower = totalPower.reduce((a, b) => a + b, 0);
let sumImpossibleGames = impossibleGames.reduce((a, b) => a + b, 0);

console.log(`Possible games sum: ${sumPossibleGames}`);
console.log(`Total power sum: ${sumTotalPower}`);
console.log(`Impossible games sum: ${sumImpossibleGames}`);




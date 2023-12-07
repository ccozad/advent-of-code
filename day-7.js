const fs = require('fs');
const fileName = "day-7-input.txt";

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);

const part1CardValues = {
    "A": 14, "K": 13, "Q": 12, "J": 11, "T": 10,"9": 9, 
    "8": 8, "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2
};

const part2CardValues = { ...part1CardValues, "J": 1 };
    

const jokerHandStrength = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 2, 4, 5, 6, 5, 7, 7],
    [0, 4, 6, 3, 7, 5, 6, 7],
    [0, 6, 7, 3, 4, 5, 6, 7],
    [0, 7, 2, 3, 4, 5, 6, 7],
    [0, 7, 2, 3, 4, 5, 6, 7],
];

function compareHands(a, b, cardValues) {
    if (a.strength > b.strength) {
        return 1;
    } else if (a.strength < b.strength) {
        return -1;
    } else {
        for(let i = 0; i < a.hand.length; i++) {
            if (cardValues[a.hand[i]] > cardValues[b.hand[i]]) {
                return 1;
            } else if (cardValues[a.hand[i]] < cardValues[b.hand[i]]) {
                return -1;
            }
        }

        return 0;
    }
}  

calculateOrdinaryHandStrength = (hand, isPart2 = false) => {
    let cardCounts = {};
    let handStrength = 1;
    let matchProperties = {
        onePair: false, twoPair: false, threeOfAKind: false, fullHouse: false,
        fourOfAKind: false, fiveOfAKind: false, jokerCount: 0
    }

    for(let i = 0; i < hand.length; i++) {
        let card = hand[i];
        if (cardCounts[card]) {
            cardCounts[card]++;
        } else {
            cardCounts[card] = 1;
        }
    }

    let keys = Object.keys(cardCounts);
    for(let i = 0; i < keys.length; i++) {
        if (isPart2 && keys[i] == "J") {
            matchProperties.jokerCount = cardCounts[keys[i]];
            continue;
        }

        let count = cardCounts[keys[i]];
        if (count == 2) {
            if (matchProperties.onePair) {
                handStrength = 3;
                matchProperties.twoPair = true;
            } else if( matchProperties.threeOfAKind) {
                handStrength = 5;
                matchProperties.onePair = true;
                matchProperties.fullHouse = true;
            } else {
                handStrength = 2;
                matchProperties.onePair = true;
            }
        } else if (count == 3) {
            if (matchProperties.onePair) {
                handStrength = 5;
                matchProperties.fullHouse = true;
                matchProperties.threeOfAKind = true;
            } else {
                handStrength = 4;
                matchProperties.threeOfAKind = true;
            }
        } else if (count == 4) {
            handStrength = 6;
            matchProperties.fourOfAKind = true;
        } else if (count == 5) {
            handStrength = 7;
            matchProperties.fiveOfAKind = true;
        }
    }

    return { handStrength, matchProperties };
}

function determinePart1HandStrength(hand) {
    return calculateOrdinaryHandStrength(hand).handStrength;
}

function determinePart2HandStrength(hand) {
    let { handStrength, matchProperties } = calculateOrdinaryHandStrength(hand, true);
    return jokerHandStrength[matchProperties.jokerCount][handStrength];
}

// Part 1
let players = lines.map((line) => {
    let rawData = line.split(" ");
    return {
        hand: rawData[0],
        bid: Number(rawData[1]),
        strength: determinePart1HandStrength(rawData[0])
    }
});

players.sort((a, b) => { return compareHands(a, b, part1CardValues) });

let part1Answer = players.reduce((acc, cur, i) => { return acc + (cur.bid * (i + 1)) }, 0);

console.log(`Part 1: ${part1Answer}`);

// Part 2
let players2 = lines.map((line) => {
    let rawData = line.split(" ");
    return {
        hand: rawData[0],
        bid: Number(rawData[1]),
        strength: determinePart2HandStrength(rawData[0])
    }
});

players2.sort((a, b) => { return compareHands(a, b, part2CardValues) });

let part2Answer = players2.reduce((acc, cur, i) => {
    return acc + (cur.bid * (i + 1));
}, 0);

console.log(`Part 2: ${part2Answer}`);
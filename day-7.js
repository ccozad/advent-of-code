const fs = require('fs');
const fileName = "day-7-input.txt";

const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);

const part1CardValues = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2
};

const part2CardValues = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    "J": 1
};

function compareSameStrengthHands(hand1, hand2, cardValues) {
    for(let i = 0; i < hand1.length; i++) {
        if (cardValues[hand1[i]] > cardValues[hand2[i]]) {
            return 1;
        } else if (cardValues[hand1[i]] < cardValues[hand2[i]]) {
            return -1;
        }
    }

    return 0;
}

function determinePart1HandStrength(hand) {
    let cardCounts = {};
    let handStrength = 1;
    let matchProperties = {
        onePair: false,
        twoPair: false,
        threeOfAKind: false,
        fullHouse: false,
        fourOfAKind: false,
        fiveOfAKind: false,
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

    return handStrength;
}

function determinePart2HandStrength(hand) {
    let cardCounts = {};
    let handStrength = 1;
    let matchProperties = {
        onePair: false,
        twoPair: false,
        threeOfAKind: false,
        fullHouse: false,
        fourOfAKind: false,
        fiveOfAKind: false,
        jokerCount: 0
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
        if (keys[i] == "J") {
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

    // 1. High card
    // 2. One pair
    // 3. Two pair
    // 4. Three of a kind
    // 5. Full house
    // 6. Four of a kind
    // 7. Five of a kind

    // Now we need to see how to apply any jokers...
    if (matchProperties.jokerCount == 1) {
        // High card becomes a pair
        if(handStrength == 1) {
            handStrength = 2;
            matchProperties.onePair = true;
        } else if (handStrength == 2) {
            // One pair becomes three of a kind
            handStrength = 4;
            matchProperties.threeOfAKind = true;
        } else if (handStrength == 3) {
            // Two pair becomes full house
            handStrength = 5;
            matchProperties.fullHouse = true;
        } else if (handStrength == 4) {
            // Three of a kind becomes four of a kind
            handStrength = 6;
            matchProperties.fourOfAKind = true;
        } else if (handStrength == 6) {
            // Four of a kind becomes five of a kind
            handStrength = 7;
            matchProperties.fiveOfAKind = true;
        }
    } else if (matchProperties.jokerCount == 2) {
        // High card becomes three of a kind
        if(handStrength == 1) {
            handStrength = 4;
            matchProperties.threeOfAKind = true;
        } else if (handStrength == 2) {
            // One pair becomes four of a kind
            handStrength = 6;
            matchProperties.fourOfAKind = true;
        } else if (handStrength == 4) {
            // Three of a kind becomes five of a kind
            handStrength = 7;
            matchProperties.fiveOfAKind = true;
        }
    } else if (matchProperties.jokerCount == 3) {
        // High card becomes four of a kind
        if(handStrength == 1) {
            handStrength = 6;
            matchProperties.fourOfAKind = true;
        } else if (handStrength == 2) {
            // One pair becomes five of a kind
            handStrength = 7;
            matchProperties.fiveOfAKind = true;
        }
    } else if (matchProperties.jokerCount == 4) {
        // High card becomes five of a kind
        if(handStrength == 1) {
            handStrength = 7;
            matchProperties.fiveOfAKind = true;
        }
    } else if (matchProperties.jokerCount == 5) {
        // High card becomes five of a kind
        handStrength = 7;
        matchProperties.fiveOfAKind = true;
    }

    return handStrength;
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

players.sort((a, b) => {
    if (a.strength > b.strength) {
        return 1;
    } else if (a.strength < b.strength) {
        return -1;
    } else {
        return compareSameStrengthHands(a.hand, b.hand, part1CardValues);
    }
});

let part1Answer = players.reduce((acc, cur, i) => {
    return acc + (cur.bid * (i + 1));
}, 0);

console.log(`Part 1: ${JSON.stringify(part1Answer, null, 4)}`);

// Part 2
let players2 = lines.map((line) => {
    let rawData = line.split(" ");
    return {
        hand: rawData[0],
        bid: Number(rawData[1]),
        strength: determinePart2HandStrength(rawData[0])
    }
});

players2.sort((a, b) => {
    if (a.strength > b.strength) {
        return 1;
    } else if (a.strength < b.strength) {
        return -1;
    } else {
        return compareSameStrengthHands(a.hand, b.hand, part2CardValues);
    }
});

let part2Answer = players2.reduce((acc, cur, i) => {
    return acc + (cur.bid * (i + 1));
}, 0);

console.log(`Part 2: ${JSON.stringify(part2Answer, null, 4)}`);
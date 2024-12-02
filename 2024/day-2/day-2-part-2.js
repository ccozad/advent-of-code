const fs = require('fs');
const path = require('path');

function isValid(numbers) {
    var initialSign = numbers[0] - numbers[1] >= 0 ? 1 : 0;
    var differences = [];
    let i = 0;
    for (; i < numbers.length - 1; i++) {
        var difference = numbers[i] - numbers[i+1];
        var sign = difference >= 0 ? 1 : 0;
        if (initialSign !== sign) {
            break
        }

        var absDifference = Math.abs(difference);

        if (absDifference < 1 || absDifference > 3) {
            break;
        }

        differences.push(difference);
    }

    return {
        valid: differences.length === numbers.length - 1,
        stop_i: i
    }
}


//const filePath = path.join("../data/day-2-sample.txt");
const filePath = path.join("../data/day-2-input.txt");
const data = fs.readFileSync(filePath, 'utf-8');
const lines = data.split('\n');
var safeCount = 0;
lines.forEach(line => {
    const numbers = line.split(' ').map(x => parseInt(x));
    var result = isValid(numbers);

    if(result.valid) {
        safeCount++;
    } else {
        // We check before, at and after the stop index to see if removal helps
        // This logic can likely be improved by recognizing if the stop reason was a sign change

        var numbers_copy1 = [...numbers];
        var numbers_copy2 = [...numbers];
        var numbers_copy3 = [...numbers];

        numbers_copy3.splice(result.stop_i - 1, 1);
        numbers_copy1.splice(result.stop_i, 1);
        numbers_copy2.splice(result.stop_i + 1, 1);
        
        var attempt_1 = isValid(numbers_copy1);
        var attempt_2 = isValid(numbers_copy2);
        var attempt_3 = isValid(numbers_copy3);

        if (attempt_1.valid | attempt_2.valid | attempt_3.valid) {
            safeCount++;
        }
    }
});

console.log(safeCount);
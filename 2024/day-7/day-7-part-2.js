const fs = require('fs');
const path = require('path');

const filePath = path.join("../data/day-7-input.txt");
//const filePath = path.join("../data/day-7-sample.txt");
const data = fs.readFileSync(filePath, 'utf-8');
const lines = data.split('\n');

function isSolvableSimple(numbers, target) {
    var permutations = 2 ** numbers.length;
    console.log(`Permutations: ${permutations}`);
    for (let i = 0; i < permutations; i++) {
        var binary = i.toString(2).padStart(numbers.length - 1 , '0');
        //var expression = '';
        var total = BigInt(numbers[0])
        for (let j = 1; j < numbers.length; j++) {
            if (binary[j] === '0') {
                total = total + BigInt(numbers[j]);
            } else {
                total = total * BigInt(numbers[j]);
            }
        }
        if ( total == target) {
            return true;
        }
    }

    return false;
}

function isSolvableComplex(numbers, target) {
    var permutations = 3 ** numbers.length;
    console.log(`Permutations: ${permutations}`);
    for (let i = 0; i < permutations; i++) {
        var radix_3 = i.toString(3).padStart(numbers.length - 1 , '0');
        //var expression = '';
        var total = BigInt(numbers[0])
        for (let j = 1; j < numbers.length; j++) {
            if (radix_3[j] === '0') {
                total = total + BigInt(numbers[j]);
            } else if (radix_3[j] === '1') {
                total = total * BigInt(numbers[j]);
            } else {
                total = BigInt(total.toString().concat(numbers[j].toString()));
            }
        }
        if ( total == target) {
            return true;
        }
    }

    return false;
}

function solve() {
    var sum = BigInt(0);
    for (let i = 0; i < lines.length; i++) {
        var results = lines[i].split(': ');
        var target = BigInt(results[0]);
        var numbers = results[1].split(' ').map(x => parseInt(x));

        console.log(`\nProcessing line ${i}`);
        console.log(`Target: ${target}`);
        console.log(`Numbers: ${numbers}`);

        if (isSolvableSimple(numbers, target)) {
            console.log("Solvable simple!");
            sum = sum + target;
        } else {
            if (isSolvableComplex(numbers, target)) {
                console.log("Solvable complex!");
                sum = sum + target;
            }
        }
    }
    return sum;
}

var solution = solve();
console.log(`Solution: ${solution}`);
const fs = require('fs');
const fileName = "day-1-input.txt";

function expandText (text) {
    let expandedText = text;
    expandedText = expandedText.replaceAll("one", "o1ne");
    expandedText = expandedText.replaceAll("two", "t2wo");
    expandedText = expandedText.replaceAll("three", "t3hree");
    expandedText = expandedText.replaceAll("four", "f4our");
    expandedText = expandedText.replaceAll("five", "f5ive");
    expandedText = expandedText.replaceAll("six", "s6ix");
    expandedText = expandedText.replaceAll("seven", "s7even");
    expandedText = expandedText.replaceAll("eight", "e8ight");
    expandedText = expandedText.replaceAll("nine", "n9ine");

    return expandedText;
}

//Read each line in the file named fileName
let file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);
// For each line extract the first and last digit using a regex
// Concatente the first and last digit
// Convert the first and last digit to a number
// Add the number to the sum
// Print the sum
let sum = 0;

for (let i = 0; i < lines.length; i++) {
    console.log("\n--------------\n");
    let replacedText = expandText(lines[i]);
    console.log(`Line ${i}: ${lines[i]}`);
    console.log(`Replaced text: ${replacedText}`);
    const firstDigit = replacedText.match(/(\d{1}?)/)[1];
    //console.log(firstDigit);
    const lastDigit = replacedText.match(/(\d{1}?)(?:\D*)$/)[1];
    //console.log(lastDigit);
    const number = Number(`${firstDigit}${lastDigit}`);
    console.log(number);
    sum += number;
}

console.log(sum);
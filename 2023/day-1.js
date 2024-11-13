const fs = require('fs');
const fileName = "day-1-test.txt";

// Have to preserve first and last character to solve undocumented
// overlap condition such as sevenine
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
const file = fs.readFileSync(fileName, 'utf8');
const lines = file.split(/\r?\n/);
let sum = 0;

for (let i = 0; i < lines.length; i++) {
    // Set replacedText with lines[i] to solve for part 1
    const replacedText = expandText(lines[i]);
    const firstDigit = replacedText.match(/(\d{1}?)/)[1];
    const lastDigit = replacedText.match(/(\d{1}?)(?:\D*)$/)[1];
    const number = Number(`${firstDigit}${lastDigit}`);
    sum += number;
}

console.log(sum);
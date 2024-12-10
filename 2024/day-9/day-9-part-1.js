const fs = require('fs');
const path = require('path');
const AdventDisk = require('./AdventDisk');

const filePath = path.join("../data/day-9-input.txt");
//const filePath = path.join("../data/day-9-sample.txt");
//const filePath = path.join("../data/day-9-sample2.txt");
const data = fs.readFileSync(filePath, 'utf-8');

var disk = new AdventDisk(data);
console.log("Initial state:");
disk.print();

console.log("Beginning to compact...");
disk.compact();
console.log("Finished compacting");
var checksum = disk.checksum();
console.log(`Checksum: ${checksum}`);
var fs = require("fs");

const data = fs.readFileSync("day10.list.txt", "utf8");
const rows = data.split('\n').map((row) => parseInt(row, 10)).sort((a, b) => a - b );

let ones = 1;
let threes = 1;

for (let i = 0; i < rows.length-1; i++) {
    if (rows[i + 1] - rows[i] === 1) {
        ones++;
    }
    if (rows[i + 1] - rows[i] === 3) {
        threes++;
    }
}

console.log(ones, threes);
console.log(ones * threes);
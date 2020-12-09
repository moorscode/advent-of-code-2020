var fs = require("fs");

const data = fs.readFileSync("day9.list.txt", "utf8");

const numbers = data.split('\n').map((row) => parseInt(row, 10));

function oneOf(check, list) {
    const possible = [];
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = i + 1; j < list.length; j++) {
            possible.push(list[i] + list[j]);
        }
    }

    return possible.includes(check);
}

let previous = numbers.splice(0, 25);
while (numbers.length > 0) {
    if (!oneOf(numbers[0], previous)) {
        console.log(numbers[0]);
        break;
    }

    let first = numbers.shift();
    previous.push(first);
    previous.shift();
}

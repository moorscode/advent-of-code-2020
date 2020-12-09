var fs = require("fs");

const data = fs.readFileSync("day09.list.txt", "utf8");

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

let invalid;
let original = [...numbers];

let previous = numbers.splice(0, 25);
while (numbers.length > 0) {
    if (!oneOf(numbers[0], previous)) {
        invalid = numbers[0];
        break;
    }

    let first = numbers.shift();
    previous.push(first);
    previous.shift();
}

console.log(invalid);

main: for (let i = 0; i < original.length; i++) {
    let sum = 0;
    const list = [];
    for (let j = i; j < i + original.length; j++) {
        sum += original[j];
        if (sum > invalid) {
            continue main;
        }

        list.push(original[j]);

        if (sum === invalid) {
            let lowest = Math.min.apply(Math, list);
            let highest = Math.max.apply(Math, list);
            console.log(lowest + highest);
            break main;
        }
    }
}

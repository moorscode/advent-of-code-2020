var fs = require("fs");

const data = fs.readFileSync("day8.list.txt", "utf8");

const commands = data.split('\n').map((row) => {
    const items = row.split(' ');
    const value = parseInt(items[1].substr(1), 10);
    return [items[0], items[1].substr(0, 1) === '-' ? 0 - value : value];
});

let stepper = 0;
let accumulator = 0;
let indexHistory = [];

untilforever: while (true) {
    if (indexHistory.includes(stepper)) {
        break;
    }
    indexHistory.push(stepper);

    switch (commands[stepper][0]) {
        case 'jmp':
            stepper += commands[stepper][1];
            continue untilforever;
        case 'acc':
            accumulator += commands[stepper][1];
    }

    stepper += 1;
}

console.log(indexHistory[indexHistory.length - 1]);
console.log(accumulator);
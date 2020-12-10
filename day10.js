var fs = require("fs");

const data = fs.readFileSync("day10.list.txt", "utf8");
const rows = data.split('\n').map((row) => parseInt(row, 10)).sort((a, b) => a - b );

rows.unshift(0);
rows.push(rows[rows.length - 1] + 3);

// Collect all possible options for each row/adapter.
const options = [];
for (let i = rows.length-2; i >= 0; i--) {
    options[i] = [];

    if (rows.includes(rows[i] + 1) && (rows.includes(rows[i] + 2) || rows.includes(rows[i] + 3) || rows.includes(rows[i] + 4))) {
        options[i].push(rows[i] + 1);
    }
    if (rows.includes(rows[i] + 2) && (rows.includes(rows[i] + 3) || rows.includes(rows[i] + 4) || rows.includes(rows[i] + 5))){
        options[i].push(rows[i] + 2);
    }
    if (rows.includes(rows[i] + 3) && (rows.includes(rows[i] + 4) || rows.includes(rows[i] + 5) || rows.includes(rows[i] + 6))) {
        options[i].push(rows[i] + 3);
    }

    if (i === rows.length - 2) {
        options[i].push(rows[rows.length - 1]);
    }
}

const paths = [];
function traverse(index) {
    let count = 0;

    // Last entry is just path.
    if (index === rows.length - 1) {
        return 1;
    }

    // Return cached value.
    if (paths[index]) {
        return paths[index];
    }

    // Figure paths for all possible options.
    for (let value of options[index]) {
        count += traverse(rows.indexOf(value))
    }

    // Cache path result.
    paths[index] = count;

    return count;
}

// console.log(options);
console.log(traverse(0));
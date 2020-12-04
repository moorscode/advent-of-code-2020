var fs = require('fs');

const data = fs.readFileSync('map.layout.txt', 'utf8');

// the data repeats horizontally. -- use overflow

// Create 2-dimensional array:
const map = data.split('\n').map((line) => line && line.split(''));

const steps = {
    x: 3,
    y: 1,
};

const position = {
    x: 0,
    y: 0,
}

let trees = 0;

// until we are at the bottom; continue;
for (let y = 0; y < map.length-1; y++) {
    position.x += steps.x;
    position.y += steps.y;

    // overflow
    position.x %= map[y].length;

    console.log(position);

    if ( map[position.y][position.x] === '#' ) {
        trees ++;
    }
}

console.log(trees);

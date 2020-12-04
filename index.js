var fs = require('fs');

const data = fs.readFileSync('input.list', 'utf8');
const list = data.split('\n').map((item) => parseInt(item, 10));

let result;

for (let i = 0; i < list.length - 1; i++) {
    for (let j = 1; j < list.length - 1; j++) {
        if (list[i] + list[j] === 2020) {
            result = list[i] * list[j];
            break;
        }
    }
}

console.log(result);

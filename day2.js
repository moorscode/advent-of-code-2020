var fs = require('fs');

const data = fs.readFileSync('passwords.list', 'utf8');
const list = data.split('\n')
    .filter((x) => x)
    .map((item) => {
            const parts = item.split(' ');
            return {
                character: parts[1].substr(0, 1),
                minimum: parseInt(parts[0].split('-')[0], 10),
                maximum: parseInt(parts[0].split('-')[1], 10),
                password: parts[2],
            };
        }
    )
    .map((item) => {
        item.password = item.password.split('').sort().join('')
        return item;
    })

const valid = list.filter((entry) => {
    const reg = new RegExp('(^|[^' + entry.character + '])' + entry.character + '{' + entry.minimum + ',' + entry.maximum + '}([^' + entry.character + ']|$)', '');
    console.log(reg);
    return entry.password.match(reg);
});

console.log(valid.length);

var fs = require('fs');

const data = fs.readFileSync('passports.list.txt', 'utf8');

const required_fields = [
    'byr'
    , 'iyr'
    , 'eyr'
    , 'hgt'
    , 'hcl'
    , 'ecl'
    , 'pid'
];

const optional = ['cid'];

const passports = data.split('\n\n').map((passport) => {
    return passport.split(/\s+/)
        .filter((x) => x)
        .map((item) => item.split(':'))
}).map((item) => {
    return Object.fromEntries(item)
});

const haveRequired = passports.filter((passport) => {
        const passport_fields = Object.keys(passport);
        const diff = required_fields
            .filter(x => !passport_fields.includes(x));

        return diff.length === 0;
    });

// console.log(passports);
console.log(haveRequired.length);

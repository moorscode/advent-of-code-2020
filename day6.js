var fs = require('fs');

const data = fs.readFileSync('day6.list.txt', 'utf8');

const groups = data.split('\n\n').map( (group) => {
    const persons = group.split('\n');
    const choices = persons.map( (person) => person.split('') );

    return [].concat.apply( [], choices ).filter((v, i, a) => a.indexOf(v) === i);
});

const sum = groups.map( ( group ) => group.length ).reduce((a,b) => a + b, 0);

// console.log(groups);
console.log(sum)
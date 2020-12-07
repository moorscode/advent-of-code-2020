var fs = require('fs');

const data = fs.readFileSync('day7.list.txt', 'utf8');

// Set up data.
const rules = data.split('\n')
    .filter((x) => x)
    .reduce((prev, row) => {
        const bagMatch = row.match(/(.*) bags contain/);
        const insideMatch = row.match(/\s(?:(\d) ([^\.,]+))[,\.]/g);

        let inside = [];

        if (insideMatch) {
            inside = insideMatch.map((matched) => {
                // Strip starting space and ending comma or dot.
                // Extract number and name.
                return matched.substr(3, matched.length - 4).replace(/\sbags?/, '');
                return {
                    count: parseInt(matched.substr(1, 1), 10),
                    bag: matched.substr(3, matched.length - 4)
                };
            });
        }

        prev[bagMatch[1]] = inside;

        return prev;
    }, {});

// how many can handle a shiny gold bag.
// which can handle one directly.
// which can handle these ^ directly (recusive)
// assuming no infinite loops..

// follow inside until inside is empty or bag is found.
function canContainBag(list, bag, count, fullList) {
    for (const [key, value] of Object.entries(list) ) {
        if (value.length === 0) {
            continue;
        }

        // Looking for this!
        if (value.includes( bag ) ) {
            count += 1;
        }

        // Recursion..
        for (const bagName of value) {
            count = canContainBag(
                { [bagName]: fullList[bagName] },
                bag,
                count,
                fullList
            );
        }
    }

    return count;
};

const bags = Object.keys(rules).filter((rule) => {
    return canContainBag({ [rule]: rules[rule] },
        'shiny gold',
        0,
        rules) > 0;
});

// console.log(Object.keys(rules).length);
// console.log(canContainBag(rules, 'shiny gold', 0, rules))
console.log(bags, bags.length);

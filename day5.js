var fs = require('fs');

const data = fs.readFileSync('day5.list.txt', 'utf8');
const rows = data.split('\n')
    .filter((x) => x)
    .map((line) => line.split(''))
    .map((parts) => {
        const rows = parts.slice(0, 7);
        const seats = parts.slice(7);

        const rowRange = {start: 0, finish: 127};

        for ( const row in rows ) {
            if ( rows[row] === 'F' ) {
                rowRange.finish -= Math.round((rowRange.finish-rowRange.start)/2);
            }
            if ( rows[row] === 'B' ) {
                rowRange.start += Math.round((rowRange.finish-rowRange.start)/2);
            }
        }

        const seatRange = {start:0, finish: 7};

        for ( const seat in seats ) {
            if ( seats[seat] === 'R' ) {
                seatRange.finish -= Math.round((seatRange.finish-seatRange.start)/2);
            }
            if ( seats[seat] === 'L' ) {
                seatRange.start += Math.round((seatRange.finish-seatRange.start)/2);
            }
        }

        return {
            row: rowRange.start,
            seat: seatRange.start,
        }
    });

const seatIds = rows.map( (row ) => {
    return row.row * 8 + row.seat;
});

console.log(rows);
console.log(seatIds);

console.log(seatIds.sort(function(a, b) {
    return a - b;
}).reverse()[0]);

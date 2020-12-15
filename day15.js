const time = process.hrtime();

const indexes = {
	0: {},
	1: {},
	2: {},
	3: {},
	4: {},
	5: {},
	6: {},
	7: {},
	8: {},
	9: {},
};

const start = [ 2, 0, 1, 9, 5, 19 ];
const startCount = start.length;

let last = start.pop();

start.forEach( ( item, index ) => {
	indexes[ item ][ item ] = index;
} );

for ( let i = startCount; i < 30000000; i++ ) {
	const a = last;

	const lastKey = last < 10 ? last : last.toString().substr( 0, 1 );
	if ( last in indexes[ lastKey ] ) {
		last = i - 1 - indexes[ lastKey ][ last ];
	} else {
		last = 0;
	}

	indexes[ lastKey ][ a ] = i - 1;
}

console.log( last );
console.log( process.hrtime( time ) );

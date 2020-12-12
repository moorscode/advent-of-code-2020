var fs = require( "fs" );

// Prep data.
const data = fs.readFileSync( "day12.list.txt", "utf8" );
const commands = data.split( "\n" ).map( ( row ) => {
	return {
		command: row.substr( 0, 1 ),
		length: parseInt( row.substr( 1, row.length - 1 ), 10 ),
	};
} );

// Ship coords.
let x = 0;
let y = 0;

// Waypoint offset from the ship.
let x1 = 10;
let y1 = -1;

function turn( clockwise, times ) {
	const multiplyX = clockwise ? -1 : 1;
	const multiplyY = clockwise ? 1 : -1;

	const x1Before = x1;

	x1 = y1 * multiplyX;
	y1 = x1Before * multiplyY;

	if ( times > 1 ) {
		times--;
		turn( clockwise, times );
	}
}
function turnLeft( times ) {
	turn( false, times );
}
function turnRight( times ) {
	turn( true, times );
}

// eslint-disable-next-line guard-for-in
for ( const index in commands ) {
	const entry = commands[ index ];

	switch ( entry.command ) {
		case "F":
			x += x1 * entry.length;
			y += y1 * entry.length;
			break;
		case "N":
			y1 -= entry.length;
			break;
		case "S":
			y1 += entry.length;
			break;
		case "E":
			x1 += entry.length;
			break;
		case "W":
			x1 -= entry.length;
			break;
		case "L":
			turnLeft( entry.length / 90 );
			break;
		case "R":
			turnRight( entry.length / 90 );
			break;
	}
}

console.log( x, y, Math.abs( x ) + Math.abs( y ) );

/* eslint-disable complexity */
var fs = require( "fs" );

// Prep data.
const data = fs.readFileSync( "day12.list.txt", "utf8" );
const commands = data.split( "\n" ).map( ( row ) => {
	return {
		command: row.substr( 0, 1 ),
		length: parseInt( row.substr( 1, row.length - 1 ), 10 ),
	};
} );

// Facing X and Y + position of the boat.
let directionX = 1;
let directionY = 0;
let x = 0;
let y = 0;

function turn( clockwise, times ) {
	const options = [
		[ -1, 0 ], // North
		[ 0, 1 ], // East
		[ 1, 0 ], // South
		[ 0, -1 ], // West
	];

	const currentIndex = options.findIndex( ( item ) => item[ 0 ] === directionY && item[ 1 ] === directionX );

	let nextIndex = ( currentIndex + clockwise );
	if ( nextIndex >= options.length ) {
		nextIndex -= options.length;
	}
	if ( nextIndex < 0 ) {
		nextIndex += options.length;
	}

	directionY = options[ nextIndex ][ 0 ];
	directionX = options[ nextIndex ][ 1 ];

	if ( times > 1 ) {
		times--;
		turn( clockwise, times );
	}
}
function turnLeft( times ) {
	turn( -1, times );
}
function turnRight( times ) {
	turn( 1, times );
}

// eslint-disable-next-line guard-for-in
for ( const index in commands ) {
	const entry = commands[ index ];

	switch ( entry.command ) {
		case "F":
			x += directionX * entry.length;
			y += directionY * entry.length;
			break;
		case "N":
			y -= entry.length;
			break;
		case "S":
			y += entry.length;
			break;
		case "E":
			x += entry.length;
			break;
		case "W":
			x -= entry.length;
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

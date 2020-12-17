const fs = require( "fs" );

// Prep data.
const data = fs.readFileSync( "day17.list.txt", "utf8" );

// Set initial data on W = 0; Z = 0;
// Input[w][z][y][x];
let input = [ [ data.split( "\n" ).map( ( row ) => {
	return row.split( "" );
} ) ] ];

const ACTIVE = "#";
const INACTIVE = ".";

function store( data, value, x, y, z, w ) {
	data[ w ] = data[ w ] || [];
	data[ w ][ z ] = data[ w ][ z ] || [];
	data[ w ][ z ][ y ] = data[ w ][ z ][ y ] || [];

	data[ w ][ z ][ y ][ x ] = value;
}

function retrieve( x, y, z, w ) {
	if ( ! input[ w ] || ! input[ w ][ z ] || ! input[ w ][ z ][ y ] || ! input[ w ][ z ][ y ][ x ] ) {
		return INACTIVE;
	}
	return input[ w ][ z ][ y ][ x ];
}

function calculateSurrounding( x, y, z, w ) {
	let count = 0;

	for ( let w1 = -1; w1 <= 1; w1++ ) {
		for ( let z1 = -1; z1 <= 1; z1++ ) {
			for ( let y1 = -1; y1 <= 1; y1++ ) {
				for ( let x1 = -1; x1 <= 1; x1++ ) {
					if ( x1 === 0 && y1 === 0 && z1 === 0 && w1 === 0 ) {
						continue;
					}
					count += retrieve( x + x1, y + y1, z + z1, w + w1 ) === ACTIVE;
				}
			}
		}
	}
	return count;
}

const wSize = input.length;
const zSize = input[ 0 ].length;
const ySize = input[ 0 ][ 0 ].length;
const xSize = input[ 0 ][ 0 ][ 0 ].length;

let wOffset = 2;
let zOffset = 2;
let xOffset = 2;
let yOffset = 2;

for ( let a = 0; a < 6; a++ ) {
	const nextState = [];

	for ( let w = 0 - wOffset / 2; w < wSize + wOffset / 2; w++ ) {
		for ( let z = 0 - zOffset / 2; z < zSize + zOffset / 2; z++ ) {
			for ( let y = 0 - yOffset / 2; y < ySize + yOffset / 2; y++ ) {
				for ( let x = 0 - xOffset / 2; x < xSize + xOffset / 2; x++ ) {
					const surrounding = calculateSurrounding( x, y, z, w );
					let set = retrieve( x, y, z, w );
					switch ( set ) {
						case ACTIVE:
							if ( surrounding !== 2 && surrounding !== 3 ) {
								set = INACTIVE;
							}
							break;
						case INACTIVE:
							if ( surrounding === 3 ) {
								set = ACTIVE;
							}
							break;
					}
					store( nextState, set, x, y, z, w );
				}
			}
		}
	}

	wOffset += 2;
	zOffset += 2;
	xOffset += 2;
	yOffset += 2;

	// Swap states, continue on.
	input = nextState;
}

function recursiveCount( array ) {
	let counter = 0;

	for ( const index in array ) {
		if ( typeof array[ index ] === "string" ) {
			counter += array[ index ] === "#" ? 1 : 0;
		} else {
			counter += recursiveCount( array[ index ] );
		}
	}
	return counter;
}

// Console.log( ( JSON.stringify( input ).match( /#/g ) || [] ).length );
console.log( recursiveCount( input ) );

var fs = require( "fs" );

const data = fs.readFileSync( "day11.list.txt", "utf8" );
let map = data.split( "\n" ).map( ( row ) => row.split( "" ) );

const FLOOR = ".";
const EMPTY = "L";
const OCCUPIED = "#";

function occupiedAdjecent( searchMap, x, y, max ) {
	let taken = 0;

	for ( let y1 = -1; y1 <= 1; y1++ ) {
		for ( let x1 = -1; x1 <= 1; x1++ ) {
			// Ignore current seat.
			if ( y1 === 0 && x1 === 0 ) {
				continue;
			}

			let x2 = x1;
			let y2 = y1;

			while ( true ) {
				if ( ! searchMap[ y + y2 ] || ! searchMap[ y + y2 ][ x + x2 ] ) {
					break;
				}
				// If we encounter an empty seat, continue until we find an occupied or floor-tile.
				if ( searchMap[ y + y2 ][ x + x2 ] !== FLOOR ) {
					break;
				}

				y2 += y1;
				x2 += x1;
			}

			// Deal with the borders of the map.
			if ( ! searchMap[ y + y2 ] || ! searchMap[ y + y2 ][ x + x2 ] ) {
				continue;
			}

			if ( searchMap[ y + y2 ][ x + x2 ] === OCCUPIED ) {
				taken++;
				if ( taken > max ) {
					return false;
				}
			}
		}
	}

	return ( taken <= max );
}

function hashMap( sourceMap ) {
	return sourceMap.map( ( row ) => row.join( "" ) ).join( "" );
}

function fill( sourceMap ) {
	// Copy the map to do simultanious calculations.
	// We'll not change the original map.
	const result = JSON.parse( JSON.stringify( sourceMap ) );

	for ( var y = 0; y < sourceMap.length; y++ ) {
		for ( let x = 0; x < sourceMap[ y ].length; x++ ) {
			switch ( sourceMap[ y ][ x ] ) {
				case FLOOR:
					break;
				case EMPTY:
					if ( occupiedAdjecent( sourceMap, x, y, 0 ) ) {
						result[ y ][ x ] = OCCUPIED;
					}
					break;
				case OCCUPIED:
					if ( ! occupiedAdjecent( sourceMap, x, y, 4 ) ) {
						result[ y ][ x ] = EMPTY;
					}
					break;
			}
		}
	}

	return result;
}

let mapHash = hashMap( map );

while ( true ) {
	const newMap = fill( map );
	const newMapHash = hashMap( newMap );

	if ( newMapHash === mapHash ) {
		break;
	}

	map = newMap;
	mapHash = newMapHash;
}

console.log( mapHash.split( "" ).filter( ( item ) => item === OCCUPIED ).length );

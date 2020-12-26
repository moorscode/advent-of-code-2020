var fs = require( "fs" );

// Prep data.
const data = fs.readFileSync( "day24.list.txt", "utf8" ).split( "\n" );

const directions = {
	e: [ 0, -2 ],
	se: [ 1, -1 ],
	sw: [ 1, 1 ],
	w: [ 0, 2 ],
	nw: [ -1, 1 ],
	ne: [ -1, -1 ],
};

const map = new Map();
const directionKeys = Object.keys( directions );
const BLACK = "black";

function flipMap( x, y ) {
	const key = "y:" + y + ",x:" + x;
	const current = map.get( key );
	if ( current === BLACK ) {
		map.delete( key );
		return;
	}
	map.set( key, BLACK );
}

function move( offset, x, y ) {
	y += offset[ 0 ];
	x += offset[ 1 ];
	return [ x, y ];
}

const instructions = data.map( ( row ) => {
	const result = [];
	while ( row.length > 0 ) {
		for ( const key of directionKeys ) {
			if ( row.substr( 0, key.length ) === key ) {
				result.push( key );
				row = row.substr( key.length );
			}
		}
	}
	return result;
} );

for ( const i in instructions ) {
	let x = 0, y = 0;
	for ( const j in instructions[ i ] ) {
		[ x, y ] = move( directions[ instructions[ i ][ j ] ], x, y );
	}
	flipMap( x, y );
}

console.log( map.size );

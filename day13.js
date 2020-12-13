var fs = require( "fs" );

// Prep data.
const data = fs.readFileSync( "day13.list.txt", "utf8" ).split( "\n" );
const time = parseInt( data[ 0 ], 10 );
const busses = data[ 1 ].split( "," ).filter( ( x )=> x !== "x" ).map( ( bus ) => parseInt( bus, 10 ) );

const times = busses.map( ( bus ) => {
	return { bus, wait: bus - time % bus };
} ).sort( ( a, b ) => a.wait - b.wait );

const first = Object.entries( times )[ 0 ][ 1 ];

console.log( first.bus * first.wait );

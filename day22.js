var fs = require( "fs" );

// Prep data.
let [ me, crab ] = fs.readFileSync( "day22.list.txt", "utf8" ).split( "\n\n" );

me = me.split( "\n" ).slice( 1 ).map( ( x ) => +x );
crab = crab.split( "\n" ).slice( 1 ).map( ( x ) => +x );

while ( me.length > 0 && crab.length > 0 ) {
	const meCard = me.shift();
	const crabCard = crab.shift();

	if ( meCard > crabCard ) {
		me.push( meCard );
		me.push( crabCard );
	} else {
		crab.push( crabCard );
		crab.push( meCard );
	}
}

const winner = me.length === 0 ? crab : me;

console.log( winner.reverse().reduce( ( accumulator, current, index ) => accumulator + ( current * ( index + 1 ) ), 0 ) );

var fs = require( "fs" );

const data = fs.readFileSync( "day7.list.txt", "utf8" );

// Set up data.
const rules = data.split( "\n" )
	.filter( ( x ) => x )
	.reduce( ( prev, row ) => {
		const bagMatch = row.match( /(.*) bags contain/ );
		const insideMatch = row.match( /\s(?:(\d) ([^.,]+))[,.]/g );

		let inside = [];

		if ( insideMatch ) {
			inside = insideMatch.map( ( matched ) => {
				// Strip starting space and ending comma or dot.
				// Extract number and name.
				// Return matched.substr(3, matched.length - 4).replace(/\sbags?/, '');
				return {
					count: parseInt( matched.substr( 1, 1 ), 10 ),
					bag: matched.substr( 3, matched.length - 4 ).replace( /\sbags?/, "" ),
				};
			} );
		}

		prev[ bagMatch[ 1 ] ] = inside;

		return prev;
	}, {} );

function countBags( bag ) {
	let count = 0;
	for ( const index in rules[ bag ] ) {
		if ( ! rules[ bag ][ index ] ) {
			continue;
		}
		const subCount = rules[ bag ][ index ].count;
		count += subCount + subCount * countBags( rules[ bag ][ index ].bag );
	}

	return count;
}

console.log( countBags( "shiny gold" ) );

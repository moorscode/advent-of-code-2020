var fs = require( "fs" );

// Prep data.
const data = fs.readFileSync( "day16.list.txt", "utf8" );

const parts = data.split( "\n\n" );

const allRules = [];

const rules = parts[ 0 ].split( "\n" ).filter( ( x )=>x ).map( ( row ) => {
	const labelSplit = row.split( ": " );
	const ranges = labelSplit[ 1 ].split( " or " );
	const range1 = ranges[ 0 ].split( "-" ).map( ( x ) => +x );
	const range2 = ranges[ 1 ].split( "-" ).map( ( x ) => +x );

	// Add to general rules for easy access.
	allRules.push( [ range1, range2 ] );

	return { label: labelSplit[ 0 ], ranges: [ range1, range2 ] };
} );

const myTicket = parts[ 1 ].split( "\n" )[ 1 ].split( "," ).map( ( x )=>+x );
const preTickets = parts[ 2 ].split( "\n" );
preTickets.shift();
const tickets = preTickets.filter( ( x )=>x ).map( ( row ) => {
	return row.split( "," ).map( ( x ) => +x );
} );

// Add my ticket to all tickets.
tickets.unshift( myTicket );

const validTickets = tickets.filter( ( ticket ) => {
	nextField: for ( let x = 0; x < ticket.length; x++ ) {
		for ( let i = 0; i < allRules.length; i++ ) {
			const rule = allRules[ i ];
			if (
				 ( ticket[ x ] >= rule[ 0 ][ 0 ] && ticket[ x ] <= rule[ 0 ][ 1 ] ) ||
				 ( ticket[ x ] >= rule[ 1 ][ 0 ] && ticket[ x ] <= rule[ 1 ][ 1 ] ) ) {
					 continue nextField;
			}
		}
		return false;
	}
	return true;
} );

const labels = rules.reduce( ( acc, rule ) => {
	acc[ rule.label ] = new Array( rules.length ).fill().map( ( _, idx ) => idx );
	return acc;
}, {} );

validTickets.map( ( ticket ) => {
	for ( let x = 0; x < ticket.length; x++ ) {
		for ( let i = 0; i < rules.length; i++ ) {
			const rule = rules[ i ];
			if ( labels[ rule.label ].length === 1 ) {
				continue;
			}
			if (
				( ticket[ x ] >= rule.ranges[ 0 ][ 0 ] && ticket[ x ] <= rule.ranges[ 0 ][ 1 ] ) ||
			( ticket[ x ] >= rule.ranges[ 1 ][ 0 ] && ticket[ x ] <= rule.ranges[ 1 ][ 1 ] )
			) {
			// Ok;
			} else {
				labels[ rule.label ] = labels[ rule.label ].filter( ( y ) => y !== x );
			}
		}
	}
} );

let changed = true;
while ( changed ) {
	changed = false;
	for ( const label in labels ) {
		if ( labels[ label ].length === 1 ) {
			continue;
		} else {
			changed = true;

			labels[ label ] = labels[ label ].filter(
				( item ) => {
					for ( const label in labels ) {
						if ( labels[ label ].length === 1 ) {
							if ( labels[ label ][ 0 ] === item ) {
								return false;
							}
						}
					}
					return true;
				} );
		}
	}
}

let result = 1;
for ( const label in labels ) {
	if ( label.substr( 0, 9 ) === "departure" ) {
		result *= myTicket[ labels[ label ] ];
	}
}

console.log( result );

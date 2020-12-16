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


let invalidTotal = 0;
const invalidFields = [];

for ( let t = 0; t < tickets.length; t++ ) {
	const ticket = tickets[ t ];
	nextField: for ( let x = 0; x < ticket.length; x++ ) {
		for ( let i = 0; i < allRules.length; i++ ) {
			const rule = allRules[ i ];
			if (
				 ( ticket[ x ] >= rule[ 0 ][ 0 ] && ticket[ x ] <= rule[ 0 ][ 1 ] ) ||
				 ( ticket[ x ] >= rule[ 1 ][ 0 ] && ticket[ x ] <= rule[ 1 ][ 1 ] ) ) {
					 continue nextField;
			}
		}
		invalidTotal += ticket[ x ];
		invalidFields.push( ticket[ x ] );
	}
}

console.log( invalidFields );
console.log( invalidTotal );

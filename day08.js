var fs = require( "fs" );

const data = fs.readFileSync( "day08.list.txt", "utf8" );

const commands = data.split( "\n" ).map( ( row ) => {
	const items = row.split( " " );
	const value = parseInt( items[ 1 ].substr( 1 ), 10 );
	return [ items[ 0 ], items[ 1 ].substr( 0, 1 ) === "-" ? 0 - value : value ];
} );


function run( list ) {
	let stepper = 0;
	let accumulator = 0;
	const indexHistory = [];

	untilforever: while ( true ) {
		if ( stepper === list.length ) {
			console.log( "done!" );
			break;
		}

		if ( indexHistory.includes( stepper ) ) {
			return indexHistory;
		}

		indexHistory.push( stepper );

		switch ( list[ stepper ][ 0 ] ) {
			case "jmp":
				stepper += list[ stepper ][ 1 ];
				continue untilforever;
			case "acc":
				accumulator += list[ stepper ][ 1 ];
		}

		stepper += 1;
	}

	return accumulator;
}

let accumulator = -1;

let modifiedCommands = [ ...commands ];
let stack;

restest: while ( true ) {
	const result = run( modifiedCommands );
	if ( typeof( result ) !== "object" ) {
		accumulator = result;
		break;
	}

	if ( ! stack ) {
		stack = result;
	}

	// Make a copy of the commands to start fresh.
	modifiedCommands = [ ...commands ];

	while ( stack.length > 0 ) {
		const index = stack.pop();
		switch ( commands[ index ][ 0 ] ) {
			case "acc":
				continue;
			case "jmp":
				modifiedCommands[ index ][ 0 ] = "nop";
				continue restest;
			case "nop":
				modifiedCommands[ index ][ 0 ] = "jmp";
				continue restest;
		}
	}

	console.log( "We shouldnt get here..." );
	break;
}

console.log( accumulator );

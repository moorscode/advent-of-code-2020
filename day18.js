const fs = require( "fs" );

// Prep data.
const data = fs.readFileSync( "day18.list.txt", "utf8" );
const lines = data.split( "\n" );

function calculate( formula ) {
	while ( true ) {
		const additions = formula.match( /\d+(\s?\+\s?\d+)+/g );
		if ( ! additions ) {
			break;
		}
		for ( let a = 0; a < additions.length; a++ ) {
			const value = eval( additions[ a ] );
			formula = formula.replace( additions[ a ], " " + value + " " );
		}
	}

	while ( formula.indexOf( "  " ) !== -1 ) {
		formula = formula.replace( "  ", " " );
	}
	console.log( formula );

	const items = formula.replace( "(", "" ).replace( ")", "" ).trim().split( " " );
	console.log( items );

	let value = parseInt( items.shift(), 10 );

	for ( let i = 0; i < items.length; i += 2 ) {
		if ( items[ i ] === " " ) {
			continue;
		}
		switch ( items[ i ] ) {
			case "+":
				value += parseInt( items[ i + 1 ], 10 );
				break;
			case "*":
				value *= parseInt( items[ i + 1 ], 10 );
				break;
		}
	}

	return value;
}

function solve( line ) {
	// Flatten the groups; then do the final result.
	while ( true ) {
		const simpleGroups = line.match( /\(\d+(\s[+*]\s\d+)+\)/g );
		if ( ! simpleGroups ) {
			break;
		}

		for ( let i = 0; i < simpleGroups.length; i++ ) {
			const result = calculate( simpleGroups[ i ] );
			line = line.replace( simpleGroups[ i ], result );
		}
	}

	return calculate( line );
}

let total = 0;

for ( let i = 0; i < lines.length; i++ ) {
	total += solve( lines[ i ] );
}

console.log( total );

var fs = require( "fs" );

const data = fs.readFileSync( "day6.list.txt", "utf8" );

const groups = data.split( "\n\n" ).map( ( group ) => {
	const persons = group.split( "\n" );
	const choices = persons.map( ( person ) => person.split( "" ) );

	const all = choices.reduce( ( previous, current ) => {
		if ( previous === false ) {
			return current;
		}
		return previous.filter( ( x )=>current.includes( x ) );
	}, false );

	return all;
} ).filter( ( x )=>x );

const sum = groups.map( ( group ) => group.length ).reduce( ( a, b ) => a + b, 0 );

console.log( sum );

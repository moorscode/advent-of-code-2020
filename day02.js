var fs = require( "fs" );

const data = fs.readFileSync( "day02.list.txt", "utf8" );
const list = data.split( "\n" )
	.filter( ( x ) => x )
	.map( ( item ) => {
		const parts = item.split( " " );
		return {
			character: parts[ 1 ].substr( 0, 1 ),
			position1: parseInt( parts[ 0 ].split( "-" )[ 0 ], 10 ) - 1,
			position2: parseInt( parts[ 0 ].split( "-" )[ 1 ], 10 ) - 1,
			password: parts[ 2 ],
		};
	},
	);

const valid = list.filter( ( entry ) => {
	return (
		(
			entry.password.substr( entry.position1, 1 ) === entry.character &&
			entry.password.substr( entry.position2, 1 ) !== entry.character
		) ||
		(
			entry.password.substr( entry.position1, 1 ) !== entry.character &&
			entry.password.substr( entry.position2, 1 ) === entry.character
		)
	);
} );

console.log( valid.length );

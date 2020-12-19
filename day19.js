const fs = require( "fs" );
// Prep data.
const data = fs.readFileSync( "day19.list.txt", "utf8" );

let [ rules, subjects ] = data.split( "\n\n" );

rules = rules.split( "\n" ).reduce( ( result, rule ) => {
	const [ key, value ] = rule.split( ": " );
	result[ parseInt( key, 10 ) ] = value;
	return result;
}, [] );

let foundIndexes = true;

while ( foundIndexes ) {
	foundIndexes = false;
	for ( let r = 0; r < rules.length; r++ ) {
		if ( r === 8 || r === 11 || r === 0 ) {
			continue;
		}

		const rule = rules[ r ];
		const indexes = rule.match( /(?:[^\d]|^)(\d+)(?:[^\d]|$)/g );
		if ( ! indexes ) {
			continue;
		}

		foundIndexes = true;

		for ( const index in indexes ) {
			if ( ! /"\d+"/.test( rules[ indexes[ index ].trim() ] ) ) {
				// Console.log( rules[ r ] );
				// Console.log( indexes[ index ].trim() );

				let replacement = rules[ indexes[ index ].trim() ];
		        replacement = replacement.replace( /"/g, "" );
				if ( replacement.indexOf( "|" ) !== -1 ) {
					replacement = "( " + replacement + " )";
				}

				rules[ r ] = rules[ r ].replace( indexes[ index ], " " + replacement + " " );
			}
		}
	}
}

// 0: 8 11
// 8: 42 | 42 {8}
// 11: 42 31 | 42 {11} 31
rules[ 8 ] = "(" + rules[ 42 ] + ")+";

const rule11 = [];
for ( let i = 1; i < 10; i++ ) {
	rule11.push( "(" + rules[ 42 ] + "){" + i + "}(" + rules[ 31 ] + "){" + i + "}" );
}
rules[ 11 ] = "(" + rule11.join( "|" ) + ")";

rules[ 0 ] = rules[ 8 ] + " " + rules[ 11 ];

const theRule = new RegExp( "^" + rules[ 0 ].replace( /\s/g, "" ) + "$", "gm" );
console.log( subjects.match( theRule ).length );

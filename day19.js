const fs = require( "fs" );
// Prep data.
const data = fs.readFileSync( "day19.list.txt", "utf8" );

let [ rules, subjects ] = data.split( "\n\n" );

rules = rules.split( "\n" ).reduce( ( result, rule ) => {
	const [ key, value ] = rule.split( ": " );
	result[ key ] = value;
	return result;
}, [] );

let foundIndexes = true;

while ( foundIndexes ) {
	foundIndexes = false;
	for ( let r = 0; r < rules.length; r++ ) {
		for ( let i = 0; i < rules[ r ].length; i++ ) {
			const rule = rules[ r ];
			const indexes = rule.match( /(?:[^\d]|^)(\d+)(?:[^\d]|$)/g );
			console.log( indexes );
			if ( ! indexes ) {
				continue;
			}

			foundIndexes = true;

			for ( const index in indexes ) {
				if ( ! /"\d+"/.test( rules[ indexes[ index ].trim() ] ) ) {
					// Console.log( rules[ r ] );
					// Console.log( indexes[ index ].trim() );

					let replacement = rules[ indexes[ index ].trim() ];
					replacement = " " + replacement.replace( /"/g, "" ) + " ";
					if ( replacement.indexOf( "|" ) !== -1 ) {
						replacement = " (" + replacement + ") ";
					}

					// Console.log( replacement );
					rules[ r ] = rules[ r ].replace( indexes[ index ], replacement );
				}
			}
		}
		break;
	}
}

const theRule = new RegExp( "^" + rules[ 0 ].replace( /\s/g, "" ) + "$", "gm" );

console.log( subjects.match( theRule ).length );

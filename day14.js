var fs = require( "fs" );

// Prep data.
const data = fs.readFileSync( "day14.list.txt", "utf8" );
const masks = data.split( "mask = " ).map( ( item ) => {
	const items = item.split( "\n" );
	const mask = items.shift();

	return {
		mask,
		items: items.filter( ( x ) => x ).map( ( row ) => {
			const result = row.match( /mem\[(\d+)\]\s=\s(\d+)/ );
			return { memory: parseInt( result[ 1 ], 10 ), value: parseInt( result[ 2 ], 10 ).toString( 2 ) };
		} ),
	};
} );

function calculate( mask, value ) {
	const padded = new Array( mask.length - value.length + 1 ).join( "0" ) + value;

	const maskArray = mask.split( "" );
	const valueArray = padded.split( "" );

	const result = maskArray.map( ( item, index ) => {
		return ( item === "X" ) ? valueArray[ index ] : item;
	} );

	return parseInt( result.join( "" ), 2 );
}

const memory = [];

for ( const maskEntry in masks ) {
	if ( ! masks[ maskEntry ] ) {
		continue;
	}
	const mask = masks[ maskEntry ].mask;
	for ( const item in masks[ maskEntry ].items ) {
		if ( ! masks[ maskEntry ].items.hasOwnProperty( item ) ) {
			continue;
		}
		memory[ masks[ maskEntry ].items[ item ].memory ] = calculate( mask, masks[ maskEntry ].items[ item ].value );
	}
}

console.log( memory.reduce( ( accumulator, value ) => {
	return accumulator + value;
}, 0 ) );


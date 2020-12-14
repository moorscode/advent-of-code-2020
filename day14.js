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
			return { memory: parseInt( result[ 1 ], 10 ), value: parseInt( result[ 2 ], 10 ) };
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

function go( memoryMask, value ) {
	if ( ! memoryMask.includes( "X" ) ) {
		memory[ parseInt( memoryMask.join( "" ), 2 ) ] = value;
		return;
	}

	const Xs = memoryMask.map( ( item, index ) => {
		return item === "X" ? { item, index } : null;
	} ).filter( ( x ) => x );

	const last = Xs.pop();

	const a = [ ...memoryMask ];
	a[ last.index ] = 1;
	const b = [ ...memoryMask ];
	b[ last.index ] = 0;

	go( a, value );
	go( b, value );
}


/**
 * Writes the value to a memory addres and masked addresses.
 *
 * @param {string} mask The mask.
 * @param {number} memoryAddress The memory address to apply the mask to.
 * @param {number} value The value to write.
 */
function write( mask, memoryAddress, value ) {
	const bitAddress = memoryAddress.toString( 2 );
	const padded = new Array( mask.length - bitAddress.length + 1 ).join( "0" ) + bitAddress;

	const maskArray = mask.split( "" );
	const memoryArray = padded.split( "" );

	const memoryMask = maskArray.map( ( item, index ) => {
		return ( item === "0" ) ? memoryArray[ index ] : item;
	} );

	go( memoryMask, value );
}

for ( const maskEntry in masks ) {
	if ( ! masks[ maskEntry ] ) {
		continue;
	}
	const mask = masks[ maskEntry ].mask;
	for ( const item in masks[ maskEntry ].items ) {
		if ( ! masks[ maskEntry ].items.hasOwnProperty( item ) ) {
			continue;
		}
		write( mask, masks[ maskEntry ].items[ item ].memory, masks[ maskEntry ].items[ item ].value );
	}
}

console.log( "hier" );
console.log( memory );

let total = 0;
for ( const m in memory ) {
	total += memory[ m ];
}
console.log( total );

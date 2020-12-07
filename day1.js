var fs = require( "fs" );

const data = fs.readFileSync( "day1.list.txt", "utf8" );
const list = data.split( "\n" ).map( ( item ) => parseInt( item, 10 ) );

let result2;

for ( let i = 0; i < list.length - 1; i++ ) {
	for ( let j = 1; j < list.length - 1; j++ ) {
		if ( list[ i ] + list[ j ] === 2020 ) {
			result2 = list[ i ] * list[ j ];
			break;
		}
	}
}

console.log( result2 );

let result3;

for ( let i = 0; i < list.length - 3; i++ ) {
	for ( let j = 1; j < list.length - 2; j++ ) {
		for ( let z = 2; z < list.length - 1; z++ ) {
			if ( list[ i ] + list[ j ] + list[ z ] === 2020 ) {
				result3 = list[ i ] * list[ j ] * list[ z ];
				break;
			}
		}
	}
}

console.log( result3 );

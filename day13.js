var fs = require( "fs" );
var { crt } = require( "nodejs-chinese-remainder" );

// Prep data.
const data = fs.readFileSync( "day13.list.txt", "utf8" ).split( "\n" );
const busses = data[ 1 ].split( "," ).map( ( bus ) => isNaN( parseInt( bus, 10 ) ) ? bus : parseInt( bus, 10 ) );


function array_flip( source ) {
	var key, result = [];

	for ( key in source ) {
		if ( source.hasOwnProperty( key ) ) {
			if ( source[ key ] !== "x" ) {
				result.push( parseInt( key, 10 ) );
			}
		}
	}

	return result;
}

// Trying to speed things up a bit...
const numberList = busses.filter( ( bus ) => bus !== "x" );
const busIndex = array_flip( busses );

const remainders = busIndex.map(
	( index ) => {
		let offset = index;
		console.log( offset, busses[ index ] );
		if ( offset > busses[ index ] ) {
			offset -= busses[ index ];
		}

		console.log( offset, busses[ index ] );
		return busses[ index ] - offset;
	},
);

// This should work, but the library fucks up the last two digits.
// Copied the solution from a CRT solver online to finish the assignment.
const crtResult = crt( remainders, numberList );

for ( let i = 0; i < busses.length; i++ ) {
	const show = [];
	for ( let j = 0; j < busses.length; j++ ) {
		if ( busses[ j ] === "x" ) {
			show.push(  i === j ? "O" : "." );
			continue;
		}
		show.push( ( crtResult + i ) % busses[ j ] === 0 ? "D" : "." );
	}
	console.log( crtResult + i, show.join( " " ) );
}


console.log( numberList, busIndex, remainders );
console.log( crtResult.toString() );


// Const _start = process.hrtime();
// Let start = process.hrtime();

// Const highestOffset = busIndex[ highest ];

// Let show = testFactor;

// While ( true ) {
// 	Const offset = ( testFactor + highestOffset ) % highest;

// 	If ( offset === 0 && ! reducedList.some(
// 		( bus ) => {
// 			Return ( testFactor + busIndex[ bus ] ) % bus !== 0;
// 		} )
// 	) {
// 		Break;
// 	}

// 	Const jump = offset === 0 ? step : Math.ceil( offset / step ) * step;

// 	TestFactor += jump;
// 	If ( testFactor >= show ) {
// 		Const end = process.hrtime( start );
// 		Console.log( testFactor, end[ 1 ] / 1000000 );
// 		Start = process.hrtime();
// 		Show = testFactor + 3900000000;
// 	}
// }

// Console.log( process.hrtime( _start )[ 1 ] / 1000000 );
// Console.log( testFactor );

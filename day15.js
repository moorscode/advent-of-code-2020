// Const data = [ 2, 0, 1, 9, 5, 19 ];

const recent = [ 2, 0, 1, 9, 5, 19 ];

while ( recent.length < 2020 ) {
	const last = recent[ recent.length - 1 ];
	const check = [ ...recent ];
	check.pop();
	const previousLast = check.lastIndexOf( last );
	if ( previousLast > -1 ) {
		recent.push( recent.length - 1 - previousLast );
	} else {
		recent.push( 0 );
	}
}

console.log( recent[ recent.length - 1 ] );

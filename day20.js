const fs = require( "fs" );
// Prep data.
const data = fs.readFileSync( "day20.list.txt", "utf8" );

const tiles = data.split( "\n\n" ).map( ( block ) => {
	const lines = block.split( "\n" );
	const identifier = lines.shift();

	const a = lines[ 0 ]; // Top
	const c = lines[ lines.length - 1 ]; // Bottom
	const b = [];
	const d = [];

	for ( let i = 0; i < lines.length; i++ ) {
		b.push( lines[ i ][ 0 ] );
		d.push( lines[ i ][ lines[ i ].length - 1 ] );
	}

	return {
		id: +identifier.replace( "Tile ", "" ).replace( ":", "" ),
		data: lines.map( ( line ) => line.split( "" ) ),
		neighbours: {
			left: null,
			right: null,
			top: null,
			bottom: null,
		},
		a,
		b: b.join( "" ),
		c,
		d: d.join( "" ),
		turned: false,
		turns: false,
		flips: false,
	};
} );

function findMatchingBorder( a, b ) {
	if ( a.a === b.c ) {
		return [ "top", "bottom" ];
	}
	if ( a.c === b.a ) {
		return [ "bottom", "top" ];
	}
	if ( a.b === b.d ) {
		return [ "right", "left" ];
	}
	if ( a.d === b.b ) {
		return [ "left", "right" ];
	}

	return null;
}

for ( let i = 0; i < tiles.length; i++ ) {
	nexttile: for ( let j = i + 1; j < tiles.length; j++ ) {
		let result = findMatchingBorder( tiles[ i ], tiles[ j ] );
		if ( result ) {
			tiles[ i ].neighbours[ result[ 0 ] ] = tiles[ j ].id;
			tiles[ j ].neighbours[ result[ 1 ] ] = tiles[ i ].id;
			continue;
		}

		if ( tiles[ j ].turned ) {
			continue;
		}

		for ( let flips = 0; flips < 2; flips++ ) {
			// Vertical.
			if ( flips === 0 ) {
				const tmp1 = tiles[ j ].a;
				const tmp2 = tiles[ j ].d;
				tiles[ j ].a = tiles[ j ].c;
				tiles[ j ].d = tiles[ j ].b.split( "" ).reverse().join( "" );
				tiles[ j ].c = tmp1;
				tiles[ j ].b = tmp2.split( "" ).reverse().join( "" );
			}
			// Horizontal
			if  ( flips === 1 ) {
				const tmp1 = tiles[ j ].a;
				const tmp2 = tiles[ j ].b;
				tiles[ j ].a = tiles[ j ].c.split( "" ).reverse().join( "" );
				tiles[ j ].b = tiles[ j ].d;
				tiles[ j ].c = tmp1.split( "" ).reverse().join( "" );
				tiles[ j ].d = tmp2;
			}

			result = findMatchingBorder( tiles[ i ], tiles[ j ] );
			if ( result ) {
				tiles[ i ].neighbours[ result[ 0 ] ] = tiles[ j ].id;
				tiles[ j ].neighbours[ result[ 1 ] ] = tiles[ i ].id;
				tiles[ j ].flips = flips;
				tiles[ j ].turned = true;
				continue nexttile;
			}

			for ( let turns = 1; turns < 4; turns++ ) {
				const tmp = tiles[ j ].a;
				tiles[ j ].a = tiles[ j ].d.split( "" ).reverse().join( "" );
				tiles[ j ].d = tiles[ j ].c;
				tiles[ j ].c = tiles[ j ].b.split( "" ).reverse().join( "" );
				tiles[ j ].b = tmp;

				result = findMatchingBorder( tiles[ i ], tiles[ j ] );
				if ( result ) {
					tiles[ i ].neighbours[ result[ 0 ] ] = tiles[ j ].id;
					tiles[ j ].neighbours[ result[ 1 ] ] = tiles[ i ].id;
					tiles[ j ].turned = true;
					tiles[ j ].turns = turns;
					continue nexttile;
				}
			}
		}
	}
}

console.log( tiles );

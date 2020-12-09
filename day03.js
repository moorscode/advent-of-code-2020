var fs = require( "fs" );

const data = fs.readFileSync( "day03.list.txt", "utf8" );

// The data repeats horizontally. -- use overflow

// Create 2-dimensional array:
const map = data.split( "\n" ).map( ( line ) => line && line.split( "" ) );

const stepList = [
	{
		x: 1,
		y: 1,
	},
	{
		x: 3,
		y: 1,
	},
	{
		x: 5,
		y: 1,
	},
	{
		x: 7,
		y: 1,
	},
	{
		x: 1,
		y: 2,
	},
];

const position = {
	x: 0,
	y: 0,
};

let trees = 0;
const treeList = [];

for ( let s = 0; s < stepList.length; s++ ) {
	// Until we are at the bottom; continue;
	const steps = stepList[ s ];
	position.x = 0;
	position.y = 0;
	trees = 0;

	for ( let y = 0; y < map.length - 1; y++ ) {
		position.x += steps.x;
		position.y += steps.y;

		if ( position.y >= map.length ) {
			break;
		}

		// Overflow
		position.x %= map[ y ].length;

		if ( map[ position.y ][ position.x ] === "#" ) {
			trees++;
		}
	}

	treeList.push( trees );
}

console.log( treeList.reduce( ( a, b ) => a * b ) );

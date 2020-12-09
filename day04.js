var fs = require( "fs" );

const data = fs.readFileSync( "day04.list.txt", "utf8" );

const requiredFields = [
	"byr",
	"iyr",
	"eyr",
	"hgt",
	"hcl",
	"ecl",
	"pid",
];

const validate = {
	byr: ( value ) => {
		const val = parseInt( value, 10 );
		return val >= 1920 && val <= 2002;
	},
	iyr: ( value ) => {
		const val = parseInt( value, 10 );
		return val >= 2010 && val <= 2020;
	},
	eyr: ( value ) => {
		const val = parseInt( value, 10 );
		return val >= 2020 && val <= 2030;
	},
	hgt: ( value ) => {
		const split = value.match( /(\d+)(cm|in)/ );
		if ( ! split ) {
			return false;
		}

		const val = parseInt( split[ 1 ], 10 );
		if ( split[ 2 ] === "cm" ) {
			return val >= 150 && val <= 193;
		}
		return val >= 59 && val <= 76;
	},
	hcl: ( value ) => {
		return value.match( /#([a-f]|[0-9]){6}/ );
	},
	ecl: ( value ) => {
		return [ "amb", "blu", "brn", "gry", "grn", "hzl", "oth" ].includes( value );
	},
	pid: ( value ) => {
		return value.length === 9 && value.match( /\d+/ );
	},
	cid: () => {
		return true;
	},
};

const passports = data.split( "\n\n" ).map( ( passport ) => {
	return passport.split( /\s+/ )
		.filter( ( x ) => x )
		.map( ( item ) => item.split( ":" ) );
} ).map( ( item ) => {
	return Object.fromEntries( item );
} );

const validated = passports.filter( ( passport ) => {
	for ( const key of Object.keys( passport ) ) {
		console.log( passport[ key ] );
		if ( ! validate[ key ]( passport[ key ] ) ) {
			return false;
		}
	}
	return true;
} );

const haveRequired = validated.filter( ( passport ) => {
	const passportFields = Object.keys( passport );
	const diff = requiredFields
		.filter( x => ! passportFields.includes( x ) );

	return diff.length === 0;
} );


// Console.log(passports);
console.log( haveRequired.length );

const express = require( 'express' );
const { animals } = require( './data/animals' );
const fs = require( 'fs' );
const path = require( 'path' );

const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use( express.urlencoded( { extended: true } ) );
// parse incoming JSON data
app.use( express.json() );

function filterByQuery( query, animals ) {
    let personalityTraits = [];

    let filtered = animals;
    // filter options: 'diet', 'species', 'name', 'personalityTraits'
    if ( query.personalityTraits ) {
        // if personalityTraits is only 1 query it will be a string
        if ( typeof query.personalityTraits === 'string' ) {
            // make it into an array
            personalityTraits = [ query.personalityTraits ];
        } else {
            // otherwise the query will be an array
            personalityTraits = query.personalityTraits;
        }

        personalityTraits.forEach( trait => {
            // check trait against each animal in the `filtered` array.
            // each loop 'filtered' gets updated to include any animal matching the trait.
            filtered = filtered.filter(
                animal => animal.personalityTraits.indexOf( trait ) !== -1
            );
        } );
    }

    if ( query.diet ) {
        filtered = filtered.filter( animal => animal.diet === query.diet );
    }
    if ( query.species ) {
        filtered = filtered.filter( animal => animal.species === query.species );
    }
    if ( query.name ) {
        filtered = filtered.filter( animal => animal.name === query.name );
    }

    return filtered;
}

function findById( id, animals ) {
    return animals.filter( animal => id === animal.id )[ 0 ];
}

function createNewAnimal( body, animals ) {
    const animal = body;
    animals.push( animal );

    fs.writeFileSync(
        path.join( __dirname, './data/animals.json' ),
        JSON.stringify( { animals: animals }, null, 2 )
    );

    return animal;
}

function validateAnimal( animal ) {
    if ( !animal.name || typeof animal.name !== 'string' ) {
        return false;
    }
    if ( !animal.species || typeof animal.species !== 'string' ) {
        return false;
    }
    if ( !animal.diet || typeof animal.diet !== 'string' ) {
        return false;
    }
    if ( !animal.personalityTraits || !Array.isArray( animal.personalityTraits ) ) {
        return false;
    }
    return true;
}

app.get( '/api/animals', ( req, res ) => {
    let results = animals;
    if ( req.query ) {
        results = filterByQuery( req.query, results );
    }
    res.json( results );
} );

app.get( '/api/animals/:id', ( req, res ) => {
    const result = findById( req.params.id, animals );
    if ( result ) {
        res.json( result );
    } else {
        res.send( 404 );
    }
} );

app.post( '/api/animals', ( req, res ) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    if ( !validateAnimal( req.body ) ) {
        res.status( 400 ).send( 'The animal is not properly formatted.' );
    } else {
        const animal = createNewAnimal( req.body, animals );
        res.json( animal );
    }
} );

app.listen( PORT, () => {
    console.log( `API Server now on port http://localhost:${ PORT } !` );
} );


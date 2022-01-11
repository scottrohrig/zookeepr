const express = require( 'express' );
const { animals } = require( './data/animals' );

const PORT = process.env.PORT || 3001;

const app = express();

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

app.get( '/api/animals', ( req, res ) => {
    let results = animals;
    if ( req.query ) {
        results = filterByQuery( req.query, results );
    }
    res.json( results );
} );

app.listen( PORT, () => {
    console.log( `API Server now on port ${PORT}!` );
} );


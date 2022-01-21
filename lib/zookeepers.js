// import filehandling modules fs, path
const fs = require( 'fs' );
const path = require( 'path' );
const { typeOf } = require( 'react-is' );

// create function to filter zookeepers by query { name, age, favAnimal }
function filterByQuery( query, zookeepers ) {
    let filtered = zookeepers;

    if ( query.name ) {
        filtered = filtered.filter( zkr => zkr.name === query.name );
    }
    if ( query.age ) {
        filtered = filtered.filter( zkr => zkr.age === Number( query.age ) );
    }
    if ( query.favoriteAnimal ) {
        filtered = filtered.filter( zkr => zkr.favoriteAnimal === query.favoriteAnimal );
    }
    return filtered;
}

// create function to filter zookeepers by id
function findById( id, zookeepers ) {
    let result = zookeepers.filter( zkr => zkr.id === id )[ 0 ];
    return result;
}

// create function to make new zookeeper obj and add to data
function createNewZookeeper( body, zookeepers ) {
    // store ref to kpr
    const keeper = body;
    // push to keepers
    zookeepers.push( keeper );
    // write new keepers to data file
    fs.writeFileSync(
        path.join( __dirname, '../data/zookeepers.json' ),
        JSON.stringify( { zookeepers }, null, 2 )
    );
    return keeper;
}

// create function to validate new zookeeper obj is complete before creation
function validateZookeeper( zookeeper ) {
    if ( !zookeeper.name || typeof zookeeper.name !== 'string' ) {
        return false;
    }
    if ( !zookeeper.age || typeof zookeeper.age !== 'number' ) {
        return false;
    }
    if ( !zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string' ) {
        return false;
    }
    return true;
}
// export functions

module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
};

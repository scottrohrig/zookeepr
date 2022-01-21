
// instance Router object
const router = require( 'express' ).Router();
// import zookeeper functions
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require( '../../lib/zookeepers' );
// import zookeeper data
const { zookeepers } = require( '../../data/zookeepers.json' );


// GET route to serve filter by query
router.get( '/zookeepers', ( req, res ) => {
    let results = zookeepers;
    if ( req.query ) {
        results = filterByQuery( req.query, results )
    }
    res.json( results );
} )

// GET route to serve find by id
router.get( '/zookeepers/:id', ( req, res ) => {
    let result = findById( req.params.id, zookeepers );
    if ( result ) {
        res.json( result );
    } else {
        res.send( 404 );
    }
} )

// POST route to serve creating new zookeeper
router.post( '/zookeepers', ( req, res ) => {
    console.log( req.body, zookeepers )
    // set id to length of zookeepers array
    req.body.id = zookeepers.length.toString();

    // validate zookeeper object
    if ( !validateZookeeper( req.body ) ) {
        // alert response
        res.status( 400 ).send( 'Zookeeper not formatted properly' );
    } else {
        // create zookeeper
        const zookeeper = createNewZookeeper( req.body, zookeepers );
        // respond with new object
        res.json( zookeeper );
    }
} );

// module export router
module.exports = router;
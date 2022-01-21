const express = require( 'express' );

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')

// parse incoming string or array data
app.use( express.urlencoded( { extended: true } ) );
// parse incoming JSON data
app.use( express.json() );
// serve static files from ./public/
app.use( express.static( 'public' ) );

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen( PORT, () => {
    console.log( `API Server now on port http://localhost:${ PORT } !` );
} );
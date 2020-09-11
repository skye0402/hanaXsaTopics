/*eslint no-console: 0, no-unused-vars: 0, no-undef:0*/
/*eslint-env node, es6 */
/*eslint quotes: ["error", "single", { "avoidEscape": true }]*/

'use strict';

//Load the node modules
var server = require('http').createServer();
var express = require('express');
var passport = require('passport');
var xsenv = require('@sap/xsenv');
var JWTStrategy = require('@sap/xssec').JWTStrategy;
var xsHDBConn = require('@sap/hdbext');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session'); // require cookie session

// Environment variable setting
var port = process.env.PORT || 3000;
xsenv.loadEnv();

// Initialize Express App 
var app = express();

// get the UAA url
passport.use('JWT', new JWTStrategy(xsenv.getServices({
	uaa: {
		tag: 'xsuaa'
	}
}).uaa));
app.use(passport.initialize());

let hanaOptions = xsenv.getServices({
	hana: {
		plan: 'hdi-shared'
	}
});

var hanaOptionsReduced = {
	host: hanaOptions.hana.host,
	port: hanaOptions.hana.port,
	user: hanaOptions.hana.user,
	password: hanaOptions.hana.password,
	schema: hanaOptions.hana.schema
};
// console.log(hanaOptionsReduced); // Lists all authentication data (just for debugging)

app.use(passport.authenticate('JWT', {
		session: false
	}),
	xsHDBConn.middleware(hanaOptionsReduced)
); // Add hdb handler

<<<<<<< Upstream, based on origin/part2
//Setup Routes
=======
app.use(cookieParser());
// set up the cookie for the session
app.use(cookieSession({
  name: 'session',                              // name of the cookie
  secret: 'That\'s my secret :-)',              // key to encode session
  maxAge: 24 * 60 * 60 * 1000,                  // cookie's lifespan
  sameSite: 'lax',                              // controls when cookies are sent
  path: '/',                                    // explicitly set this for security purposes
  secure: process.env.NODE_ENV === 'production',// cookie only sent on HTTPS
  httpOnly: true                                // cookie is not available to JavaScript (client)
}));

// Setup Routes
>>>>>>> 399b4b0 Added CSRF token to lrep (and array check)
var router = require('./router')(app, server);

//Start the Server
server.on('request', app); // calls the server on a http request
server.listen(port, function () {
	console.info(`HTTP Server: ${server.address().port}`);
});
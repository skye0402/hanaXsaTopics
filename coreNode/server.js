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

console.log(hanaOptions);
// console.log(hanaOptionsReduced); // Lists all authentication data (just for debugging)

app.use(passport.authenticate('JWT', {
		session: false
	}),
	xsHDBConn.middleware(hanaOptionsReduced)
); // Add hdb handler

// Setup Routes
var router = require('./router')(app, server);

// Start the Server
server.on('request', app); // calls the server on a http request
server.listen(port, function () {
	console.info(`HTTP Server: ${server.address().port}`);
});
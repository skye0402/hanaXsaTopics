/*eslint no-console: 0, no-unused-vars: 0, no-undef:0*/
/*eslint-env node, es6 */
/*eslint quotes: ["error", "single", { "avoidEscape": true }]*/

'use strict';

//Load the node modules
var https = require('https');
var server = require('http').createServer();
var express = require('express');
var xsenv = require('@sap/xsenv');
var passport = require('passport');
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

//hanaOptions.hana.pooling = true;

//console.log(hanaOptions); // Lists all authentication data (just for debugging)

var hanaOptions2 = {
	host: hanaOptions.hana.host,
	port: hanaOptions.hana.port,
	user: hanaOptions.hana.user,
	password: hanaOptions.hana.password,
	schema: hanaOptions.hana.schema
};
// console.log(hanaOptions2); // Lists all authentication data (just for debugging)

app.use(passport.authenticate('JWT', {
		session: false
	}),
	xsHDBConn.middleware(hanaOptions2)); // Add hdb handler

//Setup Routes
var router = require('./router')(app, server);

// Load configuration of the application
var xsDbHandle = xsHDBConn.createConnection(hanaOptions2, function (error, client) {
	var insertString = 'SELECT * from \"FLIGHTMODEL_CUSTOMER\"';
	client.prepare(
		insertString,
		(err, statement) => {
			if (err) {
				console.log(`ERROR in prepare: ${JSON.stringify(err)}`);
				return;
			}
			statement.exec([], (err, results) => {
				if (err) {
					console.log(`ERROR in execute: ${JSON.stringify(err)}`);
					return;
				} else {
					app.set('appConfig', results); //Contains the configuration
				}
			});
		});
});

//Start the Server
server.on('request', app); // calls the server on a http request
server.listen(port, function () {
	console.info(`HTTP Server: ${server.address().port}`);
});
/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
/*eslint quotes: ["error", "single", { "avoidEscape": true }]*/

'use strict';

var express = require('express');

module.exports = function () {
	var app = express.Router();

	// Get customers from HDI module
	app.get('/demo', function (req, res) {
		var isAuthorized = req.authInfo.checkScope(req.authInfo.xsappname + '.Display');
		if (isAuthorized) {
			var client = req.db;
			var attrCountry = req.authInfo.getAttribute('country');
			// Read customers by attribute
			client.exec('SELECT * from "FLIGHTMODEL_CUSTOMER" WHERE "COUNTRYCODE" = ?', attrCountry,
				(err, results) => {
					if (err) {
						res.type('text/plain').status(500).send(`ERROR in execute: ${JSON.stringify(err)}`);
						return;
					} else {
						res.type('application/json').status(200).send(results);
					}
				});
		} else {
			res.type('text/plain').status(200).send(`Not authorized, user ${req.user.id}.`);
		}
	});
	return app;
};
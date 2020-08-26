/*eslint-env node, es6 */
/*eslint quotes: ["error", "single", { "avoidEscape": true }]*/

'use strict';
module.exports = (app) => {
	app.get('/', function (req, res) {
		var isAuthorized = req.authInfo.checkScope(req.authInfo.xsappname + '.Display');
		if (isAuthorized) {
			res.send(`Welcome user ${req.user.id} (${req.user.name.givenName} ${req.user.name.familyName})`);
		} else {
			res.status(403).send(`Forbidden - User ${req.user.id} has no display authorization.`);
		}
	});
	app.use('/tutorial/', require('./routes/tutorial')()); // Do something for our blog series
	app.use('/sap/bc/lrep', require('./routes/variantManagement')()); // Variant management
};
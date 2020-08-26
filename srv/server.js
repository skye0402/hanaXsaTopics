/*eslint no-console: 0, no-unused-vars: 0, no-undef:0*/
/*eslint-env node, es6 */
/*eslint quotes: ["error", "single", { "avoidEscape": true }]*/

'use strict';

const proxy = require('@sap/cds-odata-v2-adapter-proxy');
const cds = require('@sap/cds');
cds.on('bootstrap', app => app.use(proxy()));
module.exports = cds.server;
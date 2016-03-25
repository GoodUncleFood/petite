/*
 * Petite
 *
 */


// Primary app object
app = {};

// Lib object (where the meat of the application lives)
app.lib = {};

// Configuration
app.lib.config = require('./lib/config');

// Exception handling
app.lib.exception = require('./lib/exception');

// Logging
app.lib.log = require('./lib/log');

// Http Server
app.lib.server = require('./lib/server');

// Request handlers
app.lib.req = require('./lib/req');

// Response handlers
app.lib.res = require('./lib/res');

// Lib 
app.lib.util = require('./lib/util');

// Controller 
app.lib.controllers = require('./lib/controllers');

// Regulator
app.lib.regulator = require('./lib/regulator');


// Expose the API functions as top-level keys (aliases) within the app object
app.requireUrl = app.lib.req.setRequiredUrl;
app.disallowUrl = app.lib.req.setDisallowedUrl;
app.requireHeader = app.lib.req.setRequiredHeader;
app.addController = app.lib.controllers.add;
app.setConfig = app.lib.config.setConfigOption;
app.start = app.lib.regulator.start;
app.stop = app.lib.regulator.stop;
app.config = app.lib.config.currentConfig;


// Export the module
module.exports = app;
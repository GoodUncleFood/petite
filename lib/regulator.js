/*
 * Regulator 
 *
 */

// Create module object
var regulator = {};

regulator.start = function(){

	// Set the config
	app.lib.config.setCurrentConfig();

	// Start the server
	app.lib.server.listen();

	// Set config
	app.config = app.lib.config.currentConfig;

	return true;
};


regulator.stop = function(){

	// Stop the server
	app.lib.server.close();

	return true;
};

// Export the module
module.exports = regulator;
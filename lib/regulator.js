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

	return true;
};


regulator.stop = function(){

	// Stop the server
	app.lib.server.close();

	return true;
}

// Export the module
module.exports = regulator;
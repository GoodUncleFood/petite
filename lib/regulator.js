/*
 * Regulator 
 *
 */

// Create module object
var regulator = {};

regulator.start = function(){

	// Set the config
	app.lib.config.exportConfig();

	// Start the server
	app.server.listen();

	return true;
};


regulator.stop = function(){

	// Stop the server
}

// Export the module
module.exports = regulator;
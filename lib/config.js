/*
 * App configuration
 *
 */

// Create the config object
var config = {};

// Create environments object
config.envs = {};

// Default environment
config.envs.def = {};
config.envs.def.port = 3000;
config.envs.def.logToConsole = true;
config.envs.def.debug = false;


// Add a config object to default settings
config.setConfigOption = function(key, value, env){
	// Set env to default if needed

	// Create a new env if necessary

	// Add key and value to the env
}

// Set current config to empty object
config.currentConfig = {};

// Set config to export
config.exportConfig = function(){

	config.currentConfig = typeof(process.env.NODE_ENV) !== 'undefined' && typeof(config.envs[process.env.NODE_ENV]) !== 'undefined' ? config.envs[process.env.NODE_ENV] : config.envs.def;

}




// Export the module
module.exports = config;
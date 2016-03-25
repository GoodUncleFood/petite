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
config.envs.def.log = true;
config.envs.def.debug = false;


// Add a config object to default settings
config.setConfigOption = function(key, value, env){
	// Set env to default if needed
	env = typeof(env) == 'string' && env.length > 0 ? env : 'def';
	key = typeof(key) == 'string' && key.length > 0 ? key : false;
	value = typeof(value) !== 'undefined' ? value : false;
	if(key && value){
		// Create a new env if necessary
		config.envs[env] = typeof(config.envs[env]) == 'object' && config.envs[env] !== null ? config.envs[env] : {};

		// Add key and value to the env
		config.envs[env][key] = value;

		return true;

	} else {
		return false;
	}
}

// Set current config to empty object
config.currentConfig = {};

// Set config to export
config.setCurrentConfig = function(){

	config.currentConfig = typeof(process.env.NODE_ENV) !== 'undefined' && typeof(config.envs[process.env.NODE_ENV]) !== 'undefined' ? config.envs[process.env.NODE_ENV] : config.envs.def;

}




// Export the module
module.exports = config;
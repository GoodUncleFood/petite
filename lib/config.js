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
config.envs.def.cors = true;


// Add a config object to default settings
config.setConfigOption = function(key, value, env){
	// Set env to default if needed
	env = typeof(env) == 'string' && env.length > 0 ? env : 'def';
	key = typeof(key) == 'string' && key.length > 0 ? key : false;
	valueIsSet = typeof(value) !== 'undefined' ? true : false;
	if(key && valueIsSet){
		// Create a new env if necessary
		config.envs[env] = typeof(config.envs[env]) == 'object' && config.envs[env] !== null ? config.envs[env] : {};

		// Add key and value to the env
		config.envs[env][key] = value;

		return true;

	} else {
		return false;
	}
};

// Set current config to empty object
config.currentConfig = {};

// Set config to export
config.setCurrentConfig = function(){
	var env = typeof(process.env.NODE_ENV) !== 'undefined' && typeof(config.envs[process.env.NODE_ENV]) !== 'undefined' ? process.env.NODE_ENV : 'def';
	// If default env, just set as default object
	if(env == 'def'){
		config.currentConfig = config.envs.def;
	} else {
		// If not env, duplicate the default object
		var tmpConfig = JSON.parse(JSON.stringify(config.envs.def));
		var newEnv = config.envs[env];
		// Copy env keys over to new object
		for(var index in newEnv) { 
		   if (newEnv.hasOwnProperty(index)) {
		       tmpConfig[index] = newEnv[index];
		   }
		}
		config.currentConfig = tmpConfig;
	}
	return env;
};




// Export the module
module.exports = config;
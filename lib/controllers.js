/*
 * Controllers
 *
 */

// Create module object
var controllers = {};

// Create the set of controllers
controllers.set = {};

// Add a controller
controllers.add = function(method, controllerFunction){
	method = typeof(method) == 'string' ? method : '';
	method = method.replace(/\W/g, '');
	method = method.length > 0 ? method : false;
	controllerFunction = typeof(controllerFunction) == 'function' ? controllerFunction : false;
	if(method && controllerFunction){
		// Change the method to lowercase
		method = method.toLowerCase();
		// Add the controller to the set, or override one that exists
		controllers.set[method] = controllerFunction;
		return true;
	} else {
		return false;
	}
};


// Export the module
module.exports = controllers;
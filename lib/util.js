/*
 * Lib / utilities
 *
 */

// Create module object
var lib = {};

// Check if object is empty
lib.isEmpty = function(obj){
	if(typeof(obj) !== 'object'){
		return false;
	} else {
		if(obj === null){
			return false;
		} else {
			return Object.keys(obj).length === 0;
		}
	}	
};

// Parse JSON without throwing
lib.getParsedJson = function(str){
	var result = {};
	try{
		result = JSON.parse(str);
	}catch(e){}
	return result;
};

// Export the module
module.exports = lib;
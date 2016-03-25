/*
 * Requests
 *
 */

// Dependencies
var url = require('url');

// Create module object
var request = {};

request.process = function(req,res){
	req = typeof(req) == 'object' ? req : false;
	res = typeof(res) == 'object' ? res : false;
	var result = req && res ? true : false;
	console.log(1);
	// Check for valid url
	request.checkUrl(req,res,function(){
console.log(2);
		// Check for valid http method
		request.checkMethod(req,res,function(){
console.log(3);
			// Check for valid headers
			request.checkHeaders(req,res,function(){
console.log(4);
				// Get request data from req object
				request.getData(req, res, function(data){
console.log(5);
					// Route to the correct handler based on method
					app.lib.controllers.set[req.method.toLowerCase()](data,function(statusCode,payload){
console.log(6);
						// Trigger the response
						app.lib.res.send(req,res,statusCode,payload);
					});
				});
			});
		});
	});
    return result;
};

// Required headers
request.requiredHeaders = [];

// Add a required header
request.setRequiredHeader = function(key, pattern){
	// Add key and pattern to request.requiredHeaders array

};

// Check that the headers meet the requirements
request.checkHeaders = function(req,res,callback){
	req = typeof(req) == 'object' ? req : false;
	res = typeof(res) == 'object' ? res : false;
	var result = true;
	if(req && res){
		req.headers = (typeof(req.headers) == 'object') ? req.headers : {};

		// Check that the required headers are present
		 
	} else {
		app.lib.res.send(req,res,406);
		result = false;
		return result;
	}
	
};

// Url requirements
request.requiredUrls = [];

// Set url requirements
request.setRequiredUrl = function(pattern){
	// Add pattern to request.requiredUrls array
};

// Disallowed urls
request.disallowedUrls = [];

// Set disallowed urls
request.setDisallowedUrl = function(pattern){
	// Add pattern to request.disallowedUrls array
};

// Check that the url is valid
request.checkUrl = function(req,res,callback){
	req = typeof(req) == 'object' ? req : false;
	res = typeof(res) == 'object' ? res : false;
	var result = true;
	if(req && res){
		if(typeof(req.url) == 'string'){
			var fullUrl = req.url;
			var parsedUrl = url.parse(fullUrl, true);

			// Trim the url
			
			// Check it against required patterns

			// Check it against disallowed patterns

			app.lib.res.send(req,res,404);
			result = false;
			return result;


		} else {
			app.lib.res.send(req,res,404);
			result = false;
			return result;
		}
	} else {
		app.lib.res.send(req,res,406);
		result = false;
		return result;
	}
	
};


// Check that the HTTP method is valid
request.checkMethod = function(req,res,callback){
	req = typeof(req) == 'object' ? req : false;
	res = typeof(res) == 'object' ? res : false;
	var result = true;
	if(req && res){
		if(typeof(req.method) == 'string' && typeof(app.lib.controllers.set[req.method]) !== 'undefined'){
			callback();
		} else {
			app.lib.res.send(req,res,405);
			result = false;
			return result;
		}
	} else {
		app.lib.res.send(req,res,406);
		result = false;
		return result;
	}
	
};

// Extract the pertinent data from the req object
request.getData = function(req,res,callback){
	req = typeof(req) == 'object' ? req : false;
	res = typeof(res) == 'object' ? res : false;
	var data = {};
	var result = true;
	if(req && res){

		// Get params
		if(typeof(req.url) == 'string'){
			var fullUrl = req.url;
			var parsedUrl = url.parse(fullUrl, true);
			data.params = typeof(parsedUrl.query) == 'object' && parsedUrl.query !== null ? parsedUrl.query : {};
		} else {
			result = false;
		}

		// Get payload
		if(typeof(req.body) !== 'undefined'){
			data.payload = app.lib.util.getParsedJson(req.body);
		} else {
			result = false;
		}

		if(result){
			callback(data);
			return result;
		} else {
			app.lib.res.send(req,res,400);
			return result;			
		}

	} else {
		app.lib.res.send(req,res,406);
		result = false;
		return result;
	}
	
};


// Export the module
module.exports = request;
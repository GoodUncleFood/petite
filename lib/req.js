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
	var tmp = false;
	// Get request data from req object
	var data = request.getData(req);

	// Check for valid url
	tmp = request.checkUrl(data);
	if(typeof(tmp) == 'number'){
		app.lib.res.send(req,res,tmp);
		return false;
	} 

	// Check for valid http headers
	tmp = request.checkHeaders(data);
	if(typeof(tmp) == 'number'){
		app.lib.res.send(req,res,tmp);
		return false;
	}

	// Check for valid http method
	tmp = request.checkMethod(data);
	if(typeof(tmp) == 'number'){
		app.lib.res.send(req,res,tmp);
		return false;
	}

	// Route to the correct handler based on method
	app.lib.controllers.set[data.method](data,function(statusCode,payload){

		// Trigger the response
		app.lib.res.send(req,res,statusCode,payload);
		
	});
	return true;
	
};

// Required headers
request.requiredHeaders = [];

// Add a required header
request.setRequiredHeader = function(key, pattern){
	// @TODO Add key and pattern to request.requiredHeaders array
	return true;

};

// Check that the headers meet the requirements
request.checkHeaders = function(data){
	data = typeof(data) == 'object' ? data : {};
	if(typeof(data.headers) == 'object' && data.headers !== null){
		// @TODO : Do the actual check against required headers, return 406 if they dont meet the requirements
		return;

	} else {
		return 406; //@TODO: only return 406 in this case if some headers are required
	}
};

// Url requirements
request.requiredUrls = [];

// Set url requirements
request.setRequiredUrl = function(pattern){
	// Add pattern to request.requiredUrls array
	if(typeof(pattern) == 'string' && pattern.length > 0){
		try{
			var tmp = new RegExp(pattern);
			request.requiredUrls.push(pattern);
			return true;
		}catch(e){
			return false;
		}
	} else {
		return false;
	}
};

// Disallowed urls
request.disallowedUrls = [];

// Set disallowed urls
request.setDisallowedUrl = function(pattern){
	// Add pattern to request.disallowedUrls array
	if(typeof(pattern) == 'string' && pattern.length > 0){
		try{
			var tmp = new RegExp(pattern);
			request.disallowedUrls.push(pattern);
			return true;
		}catch(e){
			return false;
		}
	} else {
		return false;
	}
};

// Check that the url is valid
request.checkUrl = function(data){
	data = typeof(data) == 'object' ? data : {};

	if(typeof(data.path) == 'string' || (typeof(data.path) == 'object' && data.path === null)){

		if(data.path === null){
			data.path = '';
		}

		// Check it against required patterns
		var requiredOutcome = false;
		if(request.requiredUrls.length > 0){
			request.requiredUrls.forEach(function(pattern){
				var tmpRegex = new RegExp(pattern);
				if(tmpRegex.test(data.path)){
					requiredOutcome = true;
				}
			});
		} else {
			// If there are no required patterns, skip this check
			requiredOutcome = true;
		}

		// Check it against disallowed patterns
		if(requiredOutcome){
			
			var disallowedOutcome = true;
			if(request.disallowedUrls.length > 0){
				request.disallowedUrls.forEach(function(pattern){
					tmpRegex = new RegExp(pattern);
					if(tmpRegex.test(data.path)){
						disallowedOutcome = false;
					}
				});
			} 

			if(disallowedOutcome){
				return;
			} else {
				return 404;
			}
		} else {
			return 404;
		}
	} else {
		return 404;
	}
};


// Check that the HTTP method is valid
request.checkMethod = function(data){
	data = typeof(data) == 'object' ? data : {};
	if(typeof(data.method) == 'string' && typeof(app.lib.controllers.set[data.method]) == 'function'){
		return;
	} else {
		return 405;
	}

};

// Extract the pertinent data from the req object
request.getData = function(req){
	req = typeof(req) == 'object' ? req : false;
	var data = {
		params : {},
		path : null,
		pathArray : [],
		headers : {},
		payload : {},
		method : null
	};
	if(req){
		// Get url related data
		if(typeof(req.url) == 'string'){

			var fullUrl = req.url;
			var parsedUrl = url.parse(fullUrl, true);
			// Get params
			data.params = typeof(parsedUrl.query) == 'object' && parsedUrl.query !== null ? parsedUrl.query : {};

			// Get path
			data.path = typeof(parsedUrl.pathname) == 'string' && parsedUrl.pathname.trim().length > null ? parsedUrl.pathname.replace(/^\/+|\/+$/g, '') : null; 
			data.path = typeof(data.path) == 'string' ? data.path.trim() : null;
			data.path = typeof(data.path) == 'string' && data.path.length > 0 ? data.path : null;

			// Get path array
			data.pathArray = typeof(data.path) == 'string' ? data.path.split('/') : [];

		}

		// Get method
		data.method = typeof(req.method) == 'string' && req.method.trim().length > 0 ? req.method.toLowerCase().trim() : null;

		// Get headers
		data.headers = (typeof(req.headers) == 'object' && req.headers !== null) ? req.headers : {};

		// Get payload
		if(typeof(req.body) == 'string'){
			data.payload = app.lib.util.getParsedJson(req.body);
		}
	} 
	return data;
	
};


// Export the module
module.exports = request;
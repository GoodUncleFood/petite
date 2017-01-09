/*
 * Responses
 *
 */

// Create module object
var response = {};

// Send the response
response.send = function(req, res, statusCode, payload){
	var result = true;
	statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
	payload = typeof(payload) == 'object' ? payload : {};
	if(typeof(req) == 'undefined'){
		result = false;
	}
	if(result && typeof(res) == 'undefined'){
		result = false;
	}
	if(result && typeof(res.setHeader) !== 'undefined'){
		res.setHeader('Content-Type', 'application/json');
		// If CORS are set, send CORS headers as well
		if(app.config.cors){
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'HEAD, POST, GET, PUT, DELETE, OPTIONS');
			res.setHeader('Access-Control-Allow-Headers', 'content-type, client-id, accept, accept-encoding, x-api-token');
		}
	} else {
		result = false;
	}
	if(result && typeof(res.writeHead) !== 'undefined'){
		res.writeHead(statusCode);
	} else {
		result = false;
	}
	if(result && typeof(res.end) !== 'undefined'){
		res.end(JSON.stringify(payload));
	} else {
		result = false;
	}
	if(result && typeof(req.url) !== 'undefined'){
		app.lib.log.msg(statusCode+' '+req.url);
	} else {
		result = false;
	}
	
	return result;
};

// Export the module
module.exports = response;
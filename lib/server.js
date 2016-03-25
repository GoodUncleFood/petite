/*
 * Server 
 *
 */

// Define dependencies 
const http = require('http');
const payload = require('request-payload');

// Create module object
var server = {};

// Is listening already
server.isListening = false;

// Listen
server.listen = function(){
    if(!server.isListening){
        var httpServer = http.createServer((req,res) => {
            // Add the payload to the request
            payload(req, function(body) {
                req.body = body;
                // Pass the request to the request processor
                app.lib.req.process(req,res);
            });        
        });
        var port = typeof(app.config.port) == 'number' ? app.config.port : 3000;
        httpServer.listen(port);
        server.isListening = true;
        app.lib.log.msg('Petite microservice listening on port '+port);
    }
};

// Export the module
module.exports = server;
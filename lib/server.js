/*
 * Server 
 *
 */

// Define dependencies 
const http = require('http');
const StringDecoder = require('string_decoder').StringDecoder;

// Create module object
var server = {};

// Is listening already
server.isListening = false;

// Listen
server.listen = function(){
    if(!server.isListening){
        server.httpServer = http.createServer((req,res) => {

            // Add the payload to the request
            var decoder = new StringDecoder('utf-8');
            var buffer = '';
  
            // This section inspired by the 'request-payload' npm module
            req.on('data', function(data) {
                buffer += decoder.write(data);
            });
            req.on('end', function() {
                req.body = buffer + decoder.end();
                // Pass the request to the request processor
                app.lib.req.process(req,res);
            });

        });
        var port = typeof(app.config.port) == 'number' ? app.config.port : 3000;
        server.httpServer.listen(port);
        server.isListening = true;
        app.lib.log.msg('Petite microservice listening on port '+port);
        return true;
    } else {
        return false;
    }
};

// Stop listening
server.close = function(callback){
    callback = typeof(callback) == 'function' ? callback : false;
    if(server.isListening){
      server.httpServer.close(function () {
        server.isListening = false;
        if(callback){
            callback(true);
        }
      });
    } else {
      if(callback){
        callback(false);
      }
    }
};

// Export the module
module.exports = server;
/*
 * Exceptions 
 *
 */

// Create module object
var exception = {};

// Exception instance
exception.instance = function(msg){
  msg = typeof(msg) !== 'undefined' ? msg : null;
  this.message = msg;
  this.name = 'App Exception';
};

// Throw an exception
exception.throw = function(msg){
    msg = typeof(msg) !== 'undefined' ? msg : null;
    if(app.config.debug){
        throw new exception.instance(msg);
    } else {
        app.lib.log.msg(msg);
    }
};

// Export the module
module.exports = exception;
/*
 * Logging 
 *
 */


// Create module object
var log = {};

// Log a message
log.msg = function(msg){
    var outcome = false;
    msg = typeof(msg) !== 'undefined' ? msg : null;
    if(app.config.log){
        console.log(msg);
        outcome = true;
    }
    return outcome;
};


// Export the module
module.exports = log;
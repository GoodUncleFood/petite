/*
 * Dependencies
 *
 */

var request = require('supertest');
var should = require('should');


/*
 * Check if object is a valid response
 *
 */


var valid_response = function(res){
    should.exist(res.body);
    var type = typeof(res.body);
    type.should.eql('object');
};


/*
 * Export
 *
 */

module.exports = valid_response;



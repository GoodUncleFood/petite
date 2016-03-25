/*
 * Dependencies
 *
 */

var request = require('supertest');
var config = require('./_config');
var valid_response = require('./_validResponse');
var tmp = require('./_tmpData');
var should = require('should');
var app = require('./../../index');


/*
 * Tests
 *
 */

describe('/test', function(){

    /*
     * Before all
     *
     */
    before(function(done){
        // Set request urls
        config.service = '';
        config.request = request(config.base_url);

        tmp = {
            index_path: './../../index'
        };

        var app = require(tmp.index_path);

        // Add the controller
        var controller = function(data,callback){
            callback(200,{'foo':'bar'});
        };

        // Start the server
        app.addController('POST',controller);
        
        app.lib.server.listen();

        done();
    });  


    /*
     * POST
     *
     */
    describe('POST', function(){
        it('should return 200', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(200)
            .end(done);
        });
    });

    /*
     * GET
     *
     */
    describe('GET', function(){
        it('should return 405', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(405)
            .end(done);
        });
    });

         
    /*
     * PUT
     *
     */
    describe('PUT', function(){
        it('should return 405', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(405)
            .end(done);
        });
    });


    /*
     * DELETE
     *
     */

    describe('DELETE', function(){
        it('should return 405', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(405)
            .end(done);
        });
    });

    // After

    after(function(done){

        // Remove the controllers
        app.lib.controllers.set = {};

        // Stop Server
        app.lib.server.close();
        done();

    }); 

});




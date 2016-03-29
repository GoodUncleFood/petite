/*
 * Dependencies
 *
 */

var request = require('supertest');
var config = require('./_config');
var valid_response = require('./_validResponse');
var tmp = require('./_tmpData');
var should = require('should');
var petite = require('./../../index');


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
        config.service = 't';
        config.request = request(config.base_url);

        // Define a normal controller
        var controller = function(data,callback){
            callback(200,{'foo':'bar'});
        };

        // Define a controller that throws
        var controllerThatThrows = function(data,callback){
            throw('This is a thrown exception');
        };

        // Define a controller that echos back the payload
        var controllerThatEchos = function(data,callback){
            callback(200,data.payload);
        };

        // Require certain urls
        petite.requireUrl('test');

        // Disallow certain urls
        petite.disallowUrl('test/');

        // Require certain headers
        petite.requireHeader('client-id','.+');

        // Add the controllers
        petite.addController('POST',controller);
        petite.addController('GET',controllerThatThrows);
        petite.addController('PUT',controllerThatEchos);

        // Set default config
        petite.setConfig('foo','bar');

        // Set environmental configs
        petite.setConfig('fizz','buzz','testing');
        petite.setConfig('lorem','ipsum','staging');

        // Start the service
        petite.start();

        done();
    });  


    /*
     * Access Configs
     *
     */
    describe('Access to Configs', function(){
        it('default configs should be made available', function(done){
            petite.config.foo.should.eql('bar');
            done();
        });

        it('env-specific config should be made available', function(done){
            petite.config.fizz.should.eql('buzz');
            done();
        });

        it('configs from other envs should not be made available', function(done){
            var type = typeof(petite.config.lorem);
            type.should.eql('undefined');
            done();
        });
    });

    /*
     * POST
     *
     */
    describe('POST', function(){

        it('should return 404 if url does not meet requirements', function(done){
        config.request
            .post(config.service+'es')
            .set(config.valid_headers)
            .set({'client-id' : 'foo'})
            .expect(valid_response)
            .expect(404)
            .end(done);
        });

        it('should return 406 if headers do not pass', function(done){
        config.request
            .post(config.service+'est')
            .set(config.valid_headers)
            .set({'clientid' : 'foo'})
            .expect(valid_response)
            .expect(406)
            .end(done);
        });

        it('should return 200 if url meets requirements, headers pass, and method has a controller', function(done){
        config.request
            .post(config.service+'est')
            .set(config.valid_headers)
            .set({'client-id' : 'foo'})
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

        it('should return 404 if url does not meet requirements', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .set({'client-id' : 'foo'})
            .expect(valid_response)
            .expect(404)
            .end(done);
        });

        it('should return 406 if headers do not meet requirements', function(done){
        config.request
            .get(config.service+'est')
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(406)
            .end(done);
        });

        it('should return 500 because the controller throws', function(done){
        config.request
            .get(config.service+'est')
            .set(config.valid_headers)
            .set({'client-id' : 'foo'})
            .expect(valid_response)
            .expect(500)
            .end(done);
        });
    });

         
    /*
     * PUT
     *
     */
    describe('PUT', function(){

        it('should return 404 if url does not meet requirements', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .set({'client-id' : 'foo'})
            .expect(valid_response)
            .expect(404)
            .end(done);
        });

        it('should return 406 if headers dont meet the requirements', function(done){
        config.request
            .put(config.service+'est')
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(406)
            .end(done);
        });

        it('should return 200 if url and headers match', function(done){
        config.request
            .put(config.service+'est')
            .set(config.valid_headers)
            .set({'client-id' : 'foo'})
            .expect(valid_response)
            .expect(200)
            .end(done);
        });

        it('should return payload if url and headers match', function(done){
        config.request
            .put(config.service+'est')
            .send({
                'lorem' : 'ipsum',
                'sit' : 'amet',
                'dolor' : 'consectuitir'
            })
            .set(config.valid_headers)
            .set({'client-id' : 'foo'})
            .expect(valid_response)
            .expect(200)
            .expect(function(res){
                should.exist(res.body);
                var body = res.body;
                should.exist(body.lorem);
                body.lorem.should.eql('ipsum');
                should.exist(body.sit);
                body.sit.should.eql('amet');
                should.exist(body.dolor);
                body.dolor.should.eql('consectuitir');
            })
            .end(done);
        });

    });


    /*
     * DELETE
     *
     */

    describe('DELETE', function(){

        it('should return 404 if url does not meet requirements', function(done){
        config.request
            .del(config.service+'est/extra')
            .set(config.valid_headers)
            .set({'client-id' : 'foo'})
            .expect(valid_response)
            .expect(404)
            .end(done);
        });

        it('should return 405 if url and headers meet requirements but no controller is found', function(done){
        config.request
            .del(config.service+'est')
            .set(config.valid_headers)
            .set({'client-id' : 'foo'})
            .expect(valid_response)
            .expect(405)
            .end(done);
        });

        it('should return 406 if headers do not meet requirements', function(done){
        config.request
            .del(config.service+'est')
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(406)
            .end(done);
        });
    });

    // After

    after(function(done){

        // Remove the controllers
        petite.lib.controllers.set = {};

        // Stop Server
        petite.lib.server.close();
        done();

    }); 

});




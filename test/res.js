// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Res object', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../lib/res',
            index_path: './../index'
        };

        done();
    }); 
     
    // Res file

    describe('Res script file', function(){

        it('Should be in app directory of the repo.', function(done){
            var exists = fs.existsSync(tmp.path+'.js');
            exists.should.be.ok;
            done();
        });

        it('Should throw if required incorrectly', function(done){
            (function(){
              var module = require(tmp.path+'foo');
            }).should.throw();
            done();
        });

        it('Should not throw if required correctly', function(done){
            (function(){
              var module = require(tmp.path);
            }).should.not.throw();
            done();
        });

        it('Should return an object.', function(done){
            var module = require(tmp.path);
            module.should.be.an.Object;
            done();
        });

    });

    // Res object

    describe('Res object structure', function(){

        it('Should contain a send key', function(done){
            var res = require(tmp.path);
            should.exist(res.send);
            res.send.should.be.a.function;
            done();
        });

    });

    // Send response output

    describe('Send', function(){

        it('Should return false if no req or res objects are passed', function(done){
            var res = require(tmp.path);
            var result = res.send(undefined,undefined);
            result.should.eql(false);
            done();
        });

        it('Should return false if request is not passed', function(done){
            var res = require(tmp.path);
            var request = {
                'url' : 'foo'
            };
            var response = {
                'setHeader' : function(){

                },
                'writeHead' : function(){

                },
                'end' : function(){

                }
            };
            var result = res.send(undefined,response);
            result.should.eql(false);
            done();
        });

        it('Should return false if request is missing url key', function(done){
            var res = require(tmp.path);
            var request = {};
            var response = {
                'setHeader' : function(){

                },
                'writeHead' : function(){

                },
                'end' : function(){

                }
            };
            var result = res.send(request,response);
            result.should.eql(false);
            done();
        });

        it('Should return false if response is not passed', function(done){
            var res = require(tmp.path);
            var request = {
                'url' : 'foo'
            };
            var response = {
                'setHeader' : function(){

                },
                'writeHead' : function(){

                },
                'end' : function(){

                }
            };
            var result = res.send(request,undefined);
            result.should.eql(false);
            done();
        });

        it('Should return false if response is missing setHeader key', function(done){
            var res = require(tmp.path);
            var request = {
                'url' : 'foo'
            };
            var response = {
                'writeHead' : function(){

                },
                'end' : function(){

                }
            };
            var result = res.send(request,response);
            result.should.eql(false);
            done();
        });

        it('Should return false if response is missing writeHead key', function(done){
            var res = require(tmp.path);
            var request = {
                'url' : 'foo'
            };
            var response = {
                'setHeader' : function(){

                },
                'end' : function(){

                }
            };
            var result = res.send(request,response);
            result.should.eql(false);
            done();
        });

        it('Should return false if response is missing end key', function(done){
            var res = require(tmp.path);
            var request = {
                'url' : 'foo'
            };
            var response = {
                'setHeader' : function(){

                },
                'writeHead' : function(){

                }
            };
            var result = res.send(request,response);
            result.should.eql(false);
            done();
        });


        it('Should return true if req and res objects have all required attributes', function(done){
            var res = require(tmp.path);
            var request = {
                'url' : 'foo'
            };
            var response = {
                'setHeader' : function(){

                },
                'writeHead' : function(){

                },
                'end' : function(){

                }
            };
            var result = res.send(request,response);
            result.should.eql(true);
            done();
        });

        it('Should return true if req and res objects have all required attributes, and status code is passed', function(done){
            var res = require(tmp.path);
            var request = {
                'url' : 'foo'
            };
            var response = {
                'setHeader' : function(){

                },
                'writeHead' : function(){

                },
                'end' : function(){

                }
            };
            var result = res.send(request,response,201);
            result.should.eql(true);
            done();
        });

        it('Should return true if req and res objects have all required attributes, and status code and payload are passed ', function(done){
            var res = require(tmp.path);
            var request = {
                'url' : 'foo'
            };
            var response = {
                'setHeader' : function(){

                },
                'writeHead' : function(){

                },
                'end' : function(){

                }
            };
            var result = res.send(request,response,201,{'foo':'bar'});
            result.should.eql(true);
            done();
        });

    });


    // After

    after(function(done){

        done();

    }); 

});

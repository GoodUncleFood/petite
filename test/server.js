// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Server object', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../lib/server',
            index_path: './../index'
        };

        done();
    }); 
     
    // Server file

    describe('Server script file', function(){

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

    // server object

    describe('Server object structure', function(){

        it('Should contain a listen key', function(done){
            var server = require(tmp.path);
            should.exist(server.listen);
            server.listen.should.be.a.function;
            done();
        });

        it('Should contain an isListening key', function(done){
            var server = require(tmp.path);
            should.exist(server.isListening);
            server.isListening.should.be.a.boolean;
            done();
        });

    });

    // Listen for input

    describe('Listen', function(){

        it('Should not throw when called the first time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              var val = app.lib.server.listen();
              val.should.eql(true);
            }).should.not.throw(); 
            done();
        });

        it('Should not throw when called a second time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              var val = app.lib.server.listen();
              val.should.eql(false);
            }).should.not.throw(); 
            done();
        });

    });

    // Close the server
    describe('Stop', function(){

        it('Should not throw when called the first time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              app.lib.server.close(function(val){
                val.should.eql(true);
              });
            }).should.not.throw(); 
            done();
        });

        it('Should not throw when called a second time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              app.lib.server.close(function(val){
                val.should.eql(false);
              });
            }).should.not.throw(); 
            done();
        });

    });

    // Start server again
    describe('Restart', function(){

        it('Should not throw when called the first time even if port is undefined', function(done){
            var app = require(tmp.index_path);
            app.config.port = undefined;
            app.config.throwExceptions = true;
            (function(){
              var val = app.lib.server.listen();
              val.should.eql(true);
            }).should.not.throw(); 
            app.config.port = 3000;
            done();
        });

        it('Should not throw when called a second time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              var val = app.lib.server.listen();
              val.should.eql(false);
            }).should.not.throw(); 
            done();
        });

    });

    // Re-close the server
    describe('Restop', function(){

        it('Should not throw when called the first time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              app.lib.server.close();
            }).should.not.throw(); 
            done();
        });

        it('Should not throw when called a second time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              app.lib.server.close();
            }).should.not.throw(); 
            done();
        });

    });


    // After

    after(function(done){

        done();

    }); 

});

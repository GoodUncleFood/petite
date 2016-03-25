// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Regulator object', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../lib/regulator',
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

        it('Should contain a start key', function(done){
            var regulator = require(tmp.path);
            should.exist(regulator.start);
            done();
        });

        it('Should contain a stop key', function(done){
            var regulator = require(tmp.path);
            should.exist(regulator.stop);
            done();
        });

    });

    // Listen for input

    describe('start', function(){

        it('Should not throw when called the first time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              var val = app.lib.regulator.start();
              val.should.eql(true);
            }).should.not.throw(); 
            done();
        });

        it('Should not throw when called a second time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              var val = app.lib.regulator.start();
              val.should.eql(true);
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
              var val = app.lib.regulator.stop();
              val.should.eql(true);
            }).should.not.throw(); 
            done();
        });

        it('Should not throw when called a second time', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              var val = app.lib.regulator.stop();
              val.should.eql(true);
            }).should.not.throw(); 
            done();
        });

    });



    // After

    after(function(done){

        done();

    }); 

});

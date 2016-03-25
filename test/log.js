// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Log object', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../lib/log',
            index_path: './../index'
        };

        done();
    }); 
     
    // Log file

    describe('Log script file', function(){

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

    // Log object

    describe('Log object structure', function(){

        it('Should contain a msg key', function(done){
            var log = require(tmp.path);
            should.exist(log.msg);
            log.msg.should.be.a.function;
            done();
        });

    });

    // Log message

    describe('Log message', function(){

        it('Should not throw when log.msg is called with no message', function(done){
            (function(){
              var foo = app.lib.log.msg();
            }).should.not.throw(); 
            done();
        });

        it('Should not throw when log.msg is called with a string message', function(done){
            (function(){
              var foo = app.lib.log.msg('foo');
            }).should.not.throw(); 
            done();
        });

        it('Should return false if log is set to false', function(done){
            var app = require(tmp.index_path);
            app.config.log = false;
            var outcome = app.lib.log.msg('foo');
            outcome.should.not.be.ok;
            done();
        });

        it('Should return true if log is set to true', function(done){
            var app = require(tmp.index_path);
            app.config.log = true;
            var outcome = app.lib.log.msg('foo');
            outcome.should.be.ok;
            done();
        });

    });



    // After

    after(function(done){

        done();

    }); 

});

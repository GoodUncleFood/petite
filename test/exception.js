// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Exception object', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../lib/exception',
            index_path: './../index'
        };

        done();
    }); 
     
    // Exception file

    describe('Exception script file', function(){

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

    // Exception object

    describe('Exception object structure', function(){

        it('Should contain an instance key', function(done){
            var exception = require(tmp.path);
            should.exist(exception.instance);
            exception.instance.should.be.a.function;
            done();
        });

        it('Should contain a throw key', function(done){
            var exception = require(tmp.path);
            should.exist(exception.throw);
            exception.throw.should.be.a.function;
            done();
        });

    });

    // Exception instance

    describe('Exception instance', function(){

        it('Should not throw when creating a new instance of exception.instance', function(done){
            var app = require(tmp.index_path);
            (function(){
              var instance = new app.lib.exception.instance();
            }).should.not.throw(); 
            done();
        });

        it('Should create an object when creating a new instance of exception.instance', function(done){
            var app = require(tmp.index_path);
            var instance = new app.lib.exception.instance();
            var type = typeof(instance);
            type.should.eql('object');
            done();
        });

        it('Should create an object that is an instance of exception.instance', function(done){
            var app = require(tmp.index_path);
            var instance = new app.lib.exception.instance();
            instance.should.be.an.instanceof(app.lib.exception.instance);
            done();
        });

        it('Should have message key that is blank if no string is passed', function(done){
            var app = require(tmp.index_path);
            var instance = new app.lib.exception.instance();
            should.not.exist(instance.message);
            done();
        });

        it('Should have message key that is string if string is passed', function(done){
            var app = require(tmp.index_path);
            var instance = new app.lib.exception.instance('foo');
            should.exist(instance.message);
            instance.message.should.eql('foo');
            done();
        });

        it('Should have name key of "App Exception"', function(done){
            var app = require(tmp.index_path);
            var instance = new app.lib.exception.instance();
            should.exist(instance.name);
            instance.name.should.eql('App Exception');
            done();
        });


    });

    // Exception throw

    describe('Exception throw', function(){

        it('Should not throw if app.config.debug is set to false', function(done){
            var app = require(tmp.index_path);
            app.config.debug = false;
            (function(){
              var _throw = app.lib.exception.throw('foo');
            }).should.not.throw(); 
            done();
        });

        it('Should throw if app.config.debug is set to true', function(done){
            var app = require(tmp.index_path);
            app.config.debug = true;
            (function(){
              var _throw = app.lib.exception.throw('foo');
            }).should.throw(); 
            done();
        });

        it('Should throw if app.config.debug is set to true and no exception is defined', function(done){
            var app = require(tmp.index_path);
            app.config.throwExceptions = true;
            (function(){
              var _throw = app.lib.exception.throw();
            }).should.throw(); 
            done();
        });

    });



    // After

    after(function(done){

        done();

    }); 

});

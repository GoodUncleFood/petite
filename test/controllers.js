// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Controllers object', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../lib/controllers'
        };

        done();
    }); 
     
    // Controllers file

    describe('Controllers script file', function(){

        it('Should be in app directory of repo.', function(done){
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


    // Controllers object

    describe('Controllers object structure', function(){

        it('Should contain a set key', function(done){
            var controllers = require(tmp.path);
            should.exist(controllers.set);
            done();
        });

        it('Should contain an add key', function(done){
            var controllers = require(tmp.path);
            should.exist(controllers.add);
            done();
        });

    });


    // setCurrentConfig

    describe('add function', function(){

        it('current controllers.set should be empty object before controllers.add is run', function(done){
            var controllers = require(tmp.path);
            controllers.set.should.eql({});
            done();
        });

        it('should return false if method is undefined', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'foo';
            };
            var val = controllers.add(undefined, myFunc);
            val.should.eql(false);
            done();
        });

        it('should return false if method is false', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'foo';
            };
            var val = controllers.add(false, myFunc);
            val.should.eql(false);
            done();
        });

        it('should return false if method is true', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'foo';
            };
            var val = controllers.add(true, myFunc);
            val.should.eql(false);
            done();
        });

        it('should return false if method is number', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'foo';
            };
            var val = controllers.add(123, myFunc);
            val.should.eql(false);
            done();
        });

        it('should return false if method is object', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'foo';
            };
            var val = controllers.add({}, myFunc);
            val.should.eql(false);
            done();
        });


        it('should return false if method is empty string', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'foo';
            };
            var val = controllers.add('', myFunc);
            val.should.eql(false);
            done();
        });

        it('should return false if method is space', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'foo';
            };
            var val = controllers.add(' ', myFunc);
            val.should.eql(false);
            done();
        });

        it('should return false if method is string with nothing but non-alphanumeric characters', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'foo';
            };
            var val = controllers.add('#', myFunc);
            val.should.eql(false);
            done();
        });

        it('should return false if controllerFunction is undefined', function(done){
            var controllers = require(tmp.path);
            var val = controllers.add('foo', undefined);
            val.should.eql(false);
            done();
        });

        it('should return false if controllerFunction is false', function(done){
            var controllers = require(tmp.path);
            var val = controllers.add('foo', false);
            val.should.eql(false);
            done();
        });

        it('should return false if controllerFunction is true', function(done){
            var controllers = require(tmp.path);
            var val = controllers.add('foo', true);
            val.should.eql(false);
            done();
        });

        it('should return false if controllerFunction is empty string', function(done){
            var controllers = require(tmp.path);
            var val = controllers.add('foo', '');
            val.should.eql(false);
            done();
        });

        it('should return false if controllerFunction is string', function(done){
            var controllers = require(tmp.path);
            var val = controllers.add('foo', 'bar');
            val.should.eql(false);
            done();
        });

        it('should return false if controllerFunction is object', function(done){
            var controllers = require(tmp.path);
            var val = controllers.add('foo', {});
            val.should.eql(false);
            done();
        });

        it('should return true if method and controllerFunction are valid, and function should work', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'foo';
            };
            var val = controllers.add('foo', myFunc);
            val.should.eql(true);
            should.exist(controllers.set.foo);
            val = controllers.set.foo();
            val.should.eql('foo');
            done();
        });

        it('should return true and function should work even if function is already defined', function(done){
            var controllers = require(tmp.path);
            var myFunc = function(){
                return 'bar';
            };
            var val = controllers.add('foo', myFunc);
            val.should.eql(true);
            should.exist(controllers.set.foo);
            val = controllers.set.foo();
            val.should.eql('bar');
            done();
        });

    });



    // After

    after(function(done){

        done();

    }); 

});

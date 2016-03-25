// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Lib object', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../lib/util',
            index_path: './../index'
        };

        done();
    }); 
     
    // Lib file

    describe('Util script file', function(){

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

    // Lib object

    describe('Util object structure', function(){

        it('Should contain an isEmpty key', function(done){
            var util = require(tmp.path);
            should.exist(util.isEmpty);
            var type = typeof(util.isEmpty);
            type.should.eql('function');
            done();
        });

    });

    // Check is empty

    describe('isEmpty', function(){

        it('Should return false if object is not empty', function(done){
            var util = require(tmp.path);
            var obj = {'foo' : 'bar'};
            var result = util.isEmpty(obj);
            result.should.eql(false);
            done();
        });

        it('Should return true if object is empty', function(done){
            var util = require(tmp.path);
            var obj = {};
            var result = util.isEmpty(obj);
            result.should.eql(true);
            done();
        });

        it('Should return false if object is null', function(done){
            var util = require(tmp.path);
            var obj = null;
            var result = util.isEmpty(obj);
            result.should.eql(false);
            done();
        });

        it('Should return false if object is string', function(done){
            var util = require(tmp.path);
            var obj = 'foo';
            var result = util.isEmpty(obj);
            result.should.eql(false);
            done();
        });

        it('Should return false if object is number', function(done){
            var util = require(tmp.path);
            var obj = 123;
            var result = util.isEmpty(obj);
            result.should.eql(false);
            done();
        });

        it('Should return false if object is true', function(done){
            var util = require(tmp.path);
            var obj = true;
            var result = util.isEmpty(obj);
            result.should.eql(false);
            done();
        });

        it('Should return false if object is false', function(done){
            var util = require(tmp.path);
            var obj = false;
            var result = util.isEmpty(obj);
            result.should.eql(false);
            done();
        });

    });

    // Get parsed JSON

    describe('getParsedJson', function(){

        it('Should return empty object if regular string is passed', function(done){
            var util = require(tmp.path);
            var result = util.getParsedJson('foo');
            result.should.eql({});
            done();
        });

        it('Should return empty object if object is passed', function(done){
            var util = require(tmp.path);
            var result = util.getParsedJson({});
            result.should.eql({});
            done();
        });

        it('Should return true if true is passed', function(done){
            var util = require(tmp.path);
            var result = util.getParsedJson(true);
            result.should.eql(true);
            done();
        });

        it('Should return false if false is passed', function(done){
            var util = require(tmp.path);
            var result = util.getParsedJson(false);
            result.should.eql(false);
            done();
        });

        it('Should return number if number is passed', function(done){
            var util = require(tmp.path);
            var result = util.getParsedJson(123);
            result.should.eql(123);
            done();
        });

        it('Should return string if JSON stringified string is passed', function(done){
            var util = require(tmp.path);
            var foo = JSON.stringify('foo');
            var result = util.getParsedJson(foo);
            result.should.eql('foo');
            done();
        });

        it('Should return object if JSON stringified object is passed', function(done){
            var util = require(tmp.path);
            var foo = JSON.stringify({'fizz' : 'buzz'});
            var result = util.getParsedJson(foo);
            result.fizz.should.eql('buzz');
            done();
        });

    });



    // After

    after(function(done){

        done();

    }); 

});

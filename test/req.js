// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Req object', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../lib/req',
            index_path: './../index'
        };

        done();
    }); 
     
    // Req file

    describe('Req script file', function(){

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

    // Req object

    describe('Req object structure', function(){

        it('Should contain a process key', function(done){
            var req = require(tmp.path);
            should.exist(req.process);
            done();
        });

        it('Should contain a requiredHeaders key', function(done){
            var req = require(tmp.path);
            should.exist(req.requiredHeaders);
            done();
        });

        it('Should contain a setRequiredHeader key', function(done){
            var req = require(tmp.path);
            should.exist(req.setRequiredHeader);
            done();
        });

        it('Should contain a checkHeaders key', function(done){
            var req = require(tmp.path);
            should.exist(req.checkHeaders);
            done();
        });

        it('Should contain a requiredUrls key', function(done){
            var req = require(tmp.path);
            should.exist(req.requiredUrls);
            done();
        });

        it('Should contain a setRequiredUrl key', function(done){
            var req = require(tmp.path);
            should.exist(req.setRequiredUrl);
            done();
        });

        it('Should contain a disallowedUrls key', function(done){
            var req = require(tmp.path);
            should.exist(req.disallowedUrls);
            done();
        });

        it('Should contain a setDisallowedUrl key', function(done){
            var req = require(tmp.path);
            should.exist(req.setDisallowedUrl);
            done();
        });

        it('Should contain a checkUrl key', function(done){
            var req = require(tmp.path);
            should.exist(req.checkUrl);
            done();
        });

        it('Should contain a checkMethod key', function(done){
            var req = require(tmp.path);
            should.exist(req.checkMethod);
            done();
        });

        it('Should contain a getData key', function(done){
            var req = require(tmp.path);
            should.exist(req.getData);
            done();
        });

    });

    // Process
    describe('Process', function(){

    });

    // requiredHeaders
    describe('requiredHeaders', function(){

    });

    // setRequiredHeader
    describe('setRequiredHeader', function(){

    });

    // checkHeaders
    describe('checkHeaders', function(){

    });

    // requiredUrls
    describe('requiredUrls', function(){

    });

    // setRequiredUrl
    describe('setRequiredUrl', function(){

    });

    // disallowedUrls
    describe('disallowedUrls', function(){

    });

    // setDisallowedUrl
    describe('setDisallowedUrl', function(){

    });

    // checkUrl
    describe('checkUrl', function(){

    });

    // checkMethod
    describe('checkMethod', function(){

    });

    // getData
    describe('getData', function(){

        it('should return default object if req is undefined', function(done){
            var request = require(tmp.path);
            var val = request.getData(undefined);
            val.params.should.eql({});
            var compare = val.path === null ? true : false;
            compare.should.eql(true);
            val.pathArray.should.eql([]);
            val.headers.should.eql({});
            val.payload.should.eql({});
            compare = val.method === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return default object if req is empty object', function(done){
            var request = require(tmp.path);
            var val = request.getData({});
            val.params.should.eql({});
            var compare = val.path === null ? true : false;
            compare.should.eql(true);
            val.pathArray.should.eql([]);
            val.headers.should.eql({});
            val.payload.should.eql({});
            compare = val.method === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null method if req.method is null', function(done){
            var req = {
                'method' : null
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.method === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null method if req.method is number', function(done){
            var req = {
                'method' : 123
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.method === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null method if req.method is false', function(done){
            var req = {
                'method' : false
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.method === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null method if req.method is true', function(done){
            var req = {
                'method' : true
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.method === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null method if req.method is object', function(done){
            var req = {
                'method' : {}
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.method === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null method if req.method is empty string', function(done){
            var req = {
                'method' : ''
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.method === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null method if req.method is space', function(done){
            var req = {
                'method' : ' '
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.method === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return  method if req.method is lowercased string ', function(done){
            var req = {
                'method' : 'abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.method);
            type.should.eql('string');
            val.method.should.eql('abc');
            done();
        });

        it('should return trimmed method if req.method has a leading or trailing space', function(done){
            var req = {
                'method' : 'abc '
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.method);
            type.should.eql('string');
            val.method.should.eql('abc');
            done();
        });

        it('should return lowercased method if req.method has a capital letter', function(done){
            var req = {
                'method' : 'aBc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.method);
            type.should.eql('string');
            val.method.should.eql('abc');
            done();
        });

        it('should return null path if req.url is null', function(done){
            var req = {
                'url' : null
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.path === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null path if req.url is number', function(done){
            var req = {
                'url' : 123
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.path === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null path if req.url is false', function(done){
            var req = {
                'url' : false
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.path === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null path if req.url is true', function(done){
            var req = {
                'url' : null
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.path === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null path if req.url is object', function(done){
            var req = {
                'url' : {}
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.path === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null path if req.url is empty string', function(done){
            var req = {
                'url' : ''
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.path === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return null path if req.url is space', function(done){
            var req = {
                'url' : ' '
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var compare = val.path === null ? true : false;
            compare.should.eql(true);
            done();
        });

        it('should return path if req.url is lowercased string ', function(done){
            var req = {
                'url' : 'abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.path);
            type.should.eql('string');
            val.path.should.eql('abc');
            done();
        });

        it('should return trimmed path if req.url has a leading or trailing space', function(done){
            var req = {
                'url' : 'abc '
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.path);
            type.should.eql('string');
            val.path.should.eql('abc');
            done();
        });

        it('should return trimmed path if req.url has a leading slash', function(done){
            var req = {
                'url' : '/abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.path);
            type.should.eql('string');
            val.path.should.eql('abc');
            done();
        });

        it('should return trimmed path if req.url has a trailing slash', function(done){
            var req = {
                'url' : 'abc/'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.path);
            type.should.eql('string');
            val.path.should.eql('abc');
            done();
        });

        it('should return trimmed path if req.url has both a leading and trailing slash', function(done){
            var req = {
                'url' : '/abc/'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.path);
            type.should.eql('string');
            val.path.should.eql('abc');
            done();
        });

        it('should return trimmed path if req.url has multiple leading slashes', function(done){
            var req = {
                'url' : '//abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.path);
            type.should.eql('string');
            val.path.should.eql('abc');
            done();
        });

        it('should return trimmed path if req.url has a slash inside of it', function(done){
            var req = {
                'url' : 'a/bc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.path);
            type.should.eql('string');
            val.path.should.eql('a/bc');
            done();
        });

        it('should return trimmed path if req.url has a query string appended to it', function(done){
            var req = {
                'url' : 'abc?foo=bar'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.path);
            type.should.eql('string');
            val.path.should.eql('abc');
            done();
        });

        it('should return trimmed path if req.url has a slash and query string appended to it', function(done){
            var req = {
                'url' : 'abc/?foo=bar'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.path);
            type.should.eql('string');
            val.path.should.eql('abc');
            done();
        });

        it('should return empty pathArray if req.url is null', function(done){
            var req = {
                'url' : null
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(0);
            done();
        });

        it('should return empty pathArray if req.url is number', function(done){
            var req = {
                'url' : 123
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(0);
            done();
        });

        it('should return empty pathArray if req.url is false', function(done){
            var req = {
                'url' : false
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(0);
            done();
        });

        it('should return empty pathArray if req.url is true', function(done){
            var req = {
                'url' : null
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(0);
            done();
        });

        it('should return empty pathArray if req.url is object', function(done){
            var req = {
                'url' : {}
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(0);
            done();
        });

        it('should return empty pathArray if req.url is empty string', function(done){
            var req = {
                'url' : ''
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(0);
            done();
        });

        it('should return empty pathArray if req.url is space', function(done){
            var req = {
                'url' : ' '
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(0);
            done();
        });

        it('should return single string in pathArray if req.url is lowercased string ', function(done){
            var req = {
                'url' : 'abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(1);
            val.pathArray[0].should.eql('abc');
            done();
        });

        it('should return single string in pathArray if req.url has a leading or trailing space', function(done){
            var req = {
                'url' : 'abc '
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(1);
            val.pathArray[0].should.eql('abc');
            done();
        });

        it('should return single string in pathArray if req.url has a leading slash', function(done){
            var req = {
                'url' : '/abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(1);
            val.pathArray[0].should.eql('abc');
            done();
        });

        it('should return single string in pathArray if req.url has a trailing slash', function(done){
            var req = {
                'url' : 'abc/'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(1);
            val.pathArray[0].should.eql('abc');
            done();
        });

        it('should return single string in pathArray if req.url has both a leading and trailing slash', function(done){
            var req = {
                'url' : '/abc/'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(1);
            val.pathArray[0].should.eql('abc');
            done();
        });

        it('should return single string in pathArray if req.url has multiple leading slashes', function(done){
            var req = {
                'url' : '//abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(1);
            val.pathArray[0].should.eql('abc');
            done();
        });

        it('should return single string in pathArray if req.url has a query string appended to it', function(done){
            var req = {
                'url' : 'abc?foo=bar'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(1);
            val.pathArray[0].should.eql('abc');
            done();
        });

        it('should return single string in pathArray if req.url has a slash and query string appended to it', function(done){
            var req = {
                'url' : 'abc/?foo=bar'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(1);
            val.pathArray[0].should.eql('abc');
            done();
        });

        it('should return two strings in pathArray if req.url has a slash inside of it', function(done){
            var req = {
                'url' : 'a/bc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(2);
            val.pathArray[0].should.eql('a');
            val.pathArray[1].should.eql('bc');
            done();
        });

        it('should return 3 strings in pathArray if req.url has two slashes inside of it', function(done){
            var req = {
                'url' : 'a/b/c'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(3);
            val.pathArray[0].should.eql('a');
            val.pathArray[1].should.eql('b');
            val.pathArray[2].should.eql('c');
            done();
        });

        it('should return 3 strings in pathArray if req.url has a double slash inside of it', function(done){
            var req = {
                'url' : 'a//bc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(3);
            val.pathArray[0].should.eql('a');
            val.pathArray[1].should.eql('');
            val.pathArray[2].should.eql('bc');
            done();
        });

        it('should return four strings in pathArray if req.url has a slash and a double slash inside of it', function(done){
            var req = {
                'url' : 'a/b//c'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(4);
            val.pathArray[0].should.eql('a');
            val.pathArray[1].should.eql('b');
            val.pathArray[2].should.eql('');
            val.pathArray[3].should.eql('c');
            done();
        });

        it('should return empty params object if req.url is null', function(done){
            var req = {
                'url' : null
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url is number', function(done){
            var req = {
                'url' : 123
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url is false', function(done){
            var req = {
                'url' : false
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url is true', function(done){
            var req = {
                'url' : null
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url is object', function(done){
            var req = {
                'url' : {}
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url is empty string', function(done){
            var req = {
                'url' : ''
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.pathArray);
            type.should.eql('object');
            var instance = val.pathArray instanceof Array;
            instance.should.eql(true);
            val.pathArray.length.should.eql(0);
            done();
        });

        it('should return empty params object if req.url is space', function(done){
            var req = {
                'url' : ' '
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url is lowercased string ', function(done){
            var req = {
                'url' : 'abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url has a leading or trailing space', function(done){
            var req = {
                'url' : 'abc '
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url has a leading slash', function(done){
            var req = {
                'url' : '/abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url has a trailing slash', function(done){
            var req = {
                'url' : 'abc/'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url has both a leading and trailing slash', function(done){
            var req = {
                'url' : '/abc/'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return empty params object if req.url has multiple leading slashes', function(done){
            var req = {
                'url' : '//abc'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.should.eql({});
            done();
        });

        it('should return foo key in params object if req.url has a foo=bar query string appended to it', function(done){
            var req = {
                'url' : 'abc?foo=bar'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.foo.should.eql('bar');
            done();
        });

        it('should return foo key in params object if req.url has a slash and query string appended to it', function(done){
            var req = {
                'url' : 'abc/?foo=bar'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.foo.should.eql('bar');
            done();
        });

        it('should return foo and fizz keys in params object if req.url has a slash and query string appended to it with foo and fizz', function(done){
            var req = {
                'url' : 'abc/?foo=bar&fizz=buzz'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.foo.should.eql('bar');
            val.params.fizz.should.eql('buzz');
            done();
        });

        it('should return foo and fizz keys in params object if req.url has a slash and a slash inside of it and query string appended to it with foo and fizz', function(done){
            var req = {
                'url' : 'a/bc/?foo=bar&fizz=buzz'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.params);
            type.should.eql('object');
            val.params.foo.should.eql('bar');
            val.params.fizz.should.eql('buzz');
            done();
        });

    });

    // After

    after(function(done){

        done();

    }); 

});

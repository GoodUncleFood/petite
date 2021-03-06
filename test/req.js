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

        it('should return false if url does not meet requirements', function(done){
            var app = require(tmp.index_path);
            var tmpController = function(data, callback){
                callback(200);
            };
            app.addController('post',tmpController);
            var request = app.lib.req;
            app.requireUrl('fizz');
            var req = {
                'url' : 'foo/bar/?fizz=buzz',
                'method' : 'POST',
                'headers' : {
                    'accept-encoding' : 'gzip'
                },
                'body' : {
                    'lorem' : 'ipsum'
                }
            };
            var res = {
                'setHeader' : function(){},
                'writeHead' : function(){},
                'end' : function(){}
            };
            var val = request.process(req,res);
            val.should.eql(false);
            app.lib.controllers.set = {};
            request.requiredUrls = [];
            done();
        });

        it('should return false if headers do not meet requirements', function(done){
            var app = require(tmp.index_path);
            var tmpController = function(data, callback){
                callback(200);
            };
            app.addController('post',tmpController);
            app.requireHeader('key','value');
            var request = app.lib.req;
            var req = {
                'url' : 'foo/bar/?fizz=buzz',
                'method' : 'POST',
                'headers' : {
                    'accept-encoding' : 'gzip'
                },
                'body' : {
                    'lorem' : 'ipsum'
                }
            };
            var res = {
                'setHeader' : function(){},
                'writeHead' : function(){},
                'end' : function(){}
            };
            var val = request.process(req,res);
            val.should.eql(false);
            app.lib.controllers.set = {};
            request.requiredHeaders = [];
            done();
        });

        it('should return false if no matching controller is found', function(done){
            var app = require(tmp.index_path);
            var request = app.lib.req;
            var req = {
                'url' : 'foo/bar/?fizz=buzz',
                'method' : 'POST',
                'headers' : {
                    'accept-encoding' : 'gzip'
                },
                'body' : {
                    'lorem' : 'ipsum'
                }
            };
            var res = {
                'setHeader' : function(){},
                'writeHead' : function(){},
                'end' : function(){}
            };
            var val = request.process(req,res);
            val.should.eql(false);
            done();
        });

        it('should return false if no matching controller is found and the request is OPTIONS', function(done){
            var app = require(tmp.index_path);
            var request = app.lib.req;
            var req = {
                'url' : 'foo/bar/?fizz=buzz',
                'method' : 'OPTIONS',
                'headers' : {
                    'accept-encoding' : 'gzip'
                },
                'body' : {
                    'lorem' : 'ipsum'
                }
            };
            var res = {
                'setHeader' : function(){},
                'writeHead' : function(){},
                'end' : function(){}
            };
            var val = request.process(req,res);
            val.should.eql(false);
            done();
        });

        it('should return true if no matching controller is found and the request is OPTION but cors is turned on', function(done){
            var app = require(tmp.index_path);
            app.config.cors = true;
            var request = app.lib.req;
            var req = {
                'url' : 'foo/bar/?fizz=buzz',
                'method' : 'OPTIONS',
                'headers' : {
                    'accept-encoding' : 'gzip'
                },
                'body' : {
                    'lorem' : 'ipsum'
                }
            };
            var res = {
                'setHeader' : function(){},
                'writeHead' : function(){},
                'end' : function(){}
            };
            var val = request.process(req,res);
            val.should.eql(true);
            done();
        });

        it('should return true if process makes it to controllers', function(done){
            var app = require(tmp.index_path);
            var tmpController = function(data, callback){
                callback(200);
            };
            app.addController('post',tmpController);
            var request = app.lib.req;
            var req = {
                'url' : 'foo/bar/?fizz=buzz',
                'method' : 'POST',
                'headers' : {
                    'accept-encoding' : 'gzip'
                },
                'body' : {
                    'lorem' : 'ipsum'
                }
            };
            var res = {
                'setHeader' : function(){},
                'writeHead' : function(){},
                'end' : function(){}
            };
            var val = request.process(req,res);
            val.should.eql(true);
            app.lib.controllers.set = {};
            done();
        });

        it('should return true if process makes it to controllers, even if controller throws', function(done){
            var app = require(tmp.index_path);
            var tmpController = function(data, callback){
                throw('This is a thrown exception');
            };
            app.addController('post',tmpController);
            var request = app.lib.req;
            var req = {
                'url' : 'foo/bar/?fizz=buzz',
                'method' : 'POST',
                'headers' : {
                    'accept-encoding' : 'gzip'
                },
                'body' : {
                    'lorem' : 'ipsum'
                }
            };
            var res = {
                'setHeader' : function(){},
                'writeHead' : function(){},
                'end' : function(){}
            };
            var val = request.process(req,res);
            val.should.eql(true);
            app.lib.controllers.set = {};
            done();
        });

        it('should return false if res is not defined', function(done){
            var app = require(tmp.index_path);
            var tmpController = function(data, callback){
                callback(200);
            };
            app.addController('post',tmpController);
            var request = app.lib.req;
            var req = {
                'url' : 'foo/bar/?fizz=buzz',
                'method' : 'POST',
                'headers' : {
                    'accept-encoding' : 'gzip'
                },
                'body' : {
                    'lorem' : 'ipsum'
                }
            };
            var val = request.process(req,undefined);
            val.should.eql(false);
            app.lib.controllers.set = {};
            done();
        });

        it('should return false if req is not defined', function(done){
            var app = require(tmp.index_path);
            var tmpController = function(data, callback){
                callback(200);
            };
            app.addController('post',tmpController);
            var request = app.lib.req;
            var res = {
                'setHeader' : function(){},
                'writeHead' : function(){},
                'end' : function(){}
            };
            var val = request.process(undefined,res);
            val.should.eql(false);
            app.lib.controllers.set = {};
            done();
        });

    });


    // setRequiredHeader
    describe('setRequiredHeader', function(){

        it('requiredHeaders should be empty array before being manipulated', function(done){
            var request = require(tmp.path);
            var type = typeof(request.requiredHeaders);
            type.should.eql('object');
            var instance = request.requiredHeaders instanceof Array;
            instance.should.eql(true);
            request.requiredHeaders.length.should.eql(0);
            done();
        });

        it('should return false if no key or pattern are passed', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader();
            val.should.eql(false);
            done();
        });

        it('should return false if no key is passed', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader(undefined, 'abc');
            val.should.eql(false);
            done();
        });

        it('should return false if object is passed as key', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader({}, 'abc');
            val.should.eql(false);
            done();
        });

        it('should return false if null is passed as key', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader(null, 'abc');
            val.should.eql(false);
            done();
        });

        it('should return false if false is passed as key', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader(false, 'abc');
            val.should.eql(false);
            done();
        });

        it('should return false if true is passed as key', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader(true, 'abc');
            val.should.eql(false);
            done();
        });

        it('should return false if empty string is passed as key', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('', 'abc');
            val.should.eql(false);
            done();
        });

        it('should return false if no pattern is passed', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('foo');
            val.should.eql(false);
            done();
        });

        it('should return false if object is passed as pattern', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('foo',{});
            val.should.eql(false);
            done();
        });

        it('should return false if null is passed as pattern', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('foo',null);
            val.should.eql(false);
            done();
        });

        it('should return false if false is passed as pattern', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('foo',false);
            val.should.eql(false);
            done();
        });

        it('should return false if true is passed as pattern', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('foo',true);
            val.should.eql(false);
            done();
        });

        it('should return false if empty string is passed as pattern', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('foo','');
            val.should.eql(false);
            done();
        });

        it('should return false if pattern string is not a valid Regex pattern', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('foo','*');
            val.should.eql(false);
            done();
        });

        it('should return true if valid Regex pattern is passed and should add that pattern to requiredUrls', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('foo', 'abc');
            val.should.eql(true);
            request.requiredHeaders.length.should.eql(1);
            request.requiredHeaders[0].key.should.eql('foo');
            request.requiredHeaders[0].value.should.eql('abc');
            done();
        });

        it('should return true if another valid Regex pattern is passed and should add that pattern to requiredUrls', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredHeader('fizz','buzz');
            val.should.eql(true);
            request.requiredHeaders.length.should.eql(2);
            request.requiredHeaders[1].key.should.eql('fizz');
            request.requiredHeaders[1].value.should.eql('buzz');

            // Reset the requiredurls
            request.requiredHeaders = [];

            done();
        });

    });

    // checkHeaders
    describe('checkHeaders', function(){

        it('should return 406 if no data object is passed', function(done){
            var request = require(tmp.path);
            var val = request.checkHeaders();
            val.should.eql(406);
            done();
        });

        it('should return 406 if data object is empty', function(done){
            var request = require(tmp.path);
            var val = request.checkHeaders({});
            val.should.eql(406);
            done();
        });

        it('should return 406 if headers is false', function(done){
            var request = require(tmp.path);
            var val = request.checkHeaders({
                headers : false
            });
            val.should.eql(406);
            done();
        });

        it('should return 406 if headers is true', function(done){
            var request = require(tmp.path);
            var val = request.checkHeaders({
                headers : true
            });
            val.should.eql(406);
            done();
        });

        it('should return 406 if headers is number', function(done){
            var request = require(tmp.path);
            var val = request.checkHeaders({
                headers : 123
            });
            val.should.eql(406);
            done();
        });

        it('should return 406 if headers is null', function(done){
            var request = require(tmp.path);
            var val = request.checkHeaders({
                headers : null
            });
            val.should.eql(406);
            done();
        });

        it('should return undefined if headers is empty object and not null but no header requirements have been set', function(done){
            var request = require(tmp.path);
            var val = request.checkHeaders({
                headers : {}
            });
            var type = typeof(val);
            type.should.eql('undefined');
            done();
        });

        it('should return undefined if headers have multiple keys but no header requirements have been set', function(done){
            var request = require(tmp.path);
            var val = request.checkHeaders({
                'headers' : {
                    'foo' : 'bar',
                    'fizz' : 'buzz'
                }
            });
            var type = typeof(val);
            type.should.eql('undefined');
            done();
        });

        it('should return undefined if header meets the single requirement', function(done){
            var request = require(tmp.path);
            request.setRequiredHeader('foo','ba');
            var val = request.checkHeaders({
                'headers' : {
                    'foo' : 'bar',
                    'fizz' : 'buzz'
                }
            });
            var type = typeof(val);
            type.should.eql('undefined');
            request.requiredHeaders = [];
            done();
        });

        it('should return undefined if header meets the multiple requirements', function(done){
            var request = require(tmp.path);
            request.setRequiredHeader('foo','ba');
            request.setRequiredHeader('fizz','.*');
            var val = request.checkHeaders({
                'headers' : {
                    'foo' : 'bar',
                    'fizz' : 'buzz'
                }
            });
            var type = typeof(val);
            type.should.eql('undefined');
            request.requiredHeaders = [];
            done();
        });

        it('should return 406 if headers does not meet the single requirement', function(done){
            var request = require(tmp.path);
            request.setRequiredHeader('fizz','bar');
            var val = request.checkHeaders({
                'headers' : {
                    'foo' : 'bar',
                    'fizz' : 'buzz'
                }
            });
            val.should.eql(406);
            request.requiredHeaders = [];
            done();
        });

        it('should return 406 if headers does not meet one of the multiple requirements', function(done){
            var request = require(tmp.path);
            request.setRequiredHeader('foo','ba');
            request.setRequiredHeader('fizz','bar');
            var val = request.checkHeaders({
                'headers' : {
                    'foo' : 'bar',
                    'fizz' : 'buzz'
                }
            });
            val.should.eql(406);
            request.requiredHeaders = [];
            done();
        });

        it('should return 406 if headers does not meet any of the multiple requirements', function(done){
            var request = require(tmp.path);
            request.setRequiredHeader('foo','buzz');
            request.setRequiredHeader('fizz','bar');
            var val = request.checkHeaders({
                'headers' : {
                    'foo' : 'bar',
                    'fizz' : 'buzz'
                }
            });
            val.should.eql(406);
            request.requiredHeaders = [];
            done();
        });

    });

    // setRequiredUrl
    describe('setRequiredUrl', function(){

        it('requiredUrls should be empty array before being manipulated', function(done){
            var request = require(tmp.path);
            var type = typeof(request.requiredUrls);
            type.should.eql('object');
            var instance = request.requiredUrls instanceof Array;
            instance.should.eql(true);
            request.requiredUrls.length.should.eql(0);
            done();
        });

        it('should return false if no pattern is passed', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredUrl();
            val.should.eql(false);
            done();
        });

        it('should return false if object is passed', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredUrl({});
            val.should.eql(false);
            done();
        });

        it('should return false if null is passed', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredUrl(null);
            val.should.eql(false);
            done();
        });

        it('should return false if false is passed', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredUrl(false);
            val.should.eql(false);
            done();
        });

        it('should return false if true is passed', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredUrl(true);
            val.should.eql(false);
            done();
        });

        it('should return false if empty string is passed', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredUrl('');
            val.should.eql(false);
            done();
        });

        it('should return false if string is not a valid Regex pattern', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredUrl('*');
            val.should.eql(false);
            done();
        });

        it('should return true if valid Regex pattern is passed and should add that pattern to requiredUrls', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredUrl('abc');
            val.should.eql(true);
            request.requiredUrls.length.should.eql(1);
            request.requiredUrls.indexOf('abc').should.be.above(-1);
            done();
        });

        it('should return true if another valid Regex pattern is passed and should add that pattern to requiredUrls', function(done){
            var request = require(tmp.path);
            var val = request.setRequiredUrl('def');
            val.should.eql(true);
            request.requiredUrls.length.should.eql(2);
            request.requiredUrls.indexOf('def').should.be.above(-1);

            // Reset the requiredurls
            request.requiredUrls = [];

            done();
        });

    });

    // setDisallowedUrl
    describe('setDisallowedUrl', function(){

        it('disallowedUrls should be empty array before being manipulated', function(done){
            var request = require(tmp.path);
            var type = typeof(request.disallowedUrls);
            type.should.eql('object');
            var instance = request.disallowedUrls instanceof Array;
            instance.should.eql(true);
            request.disallowedUrls.length.should.eql(0);
            done();
        });

        it('should return false if no pattern is passed', function(done){
            var request = require(tmp.path);
            var val = request.setDisallowedUrl();
            val.should.eql(false);
            done();
        });

        it('should return false if object is passed', function(done){
            var request = require(tmp.path);
            var val = request.setDisallowedUrl({});
            val.should.eql(false);
            done();
        });

        it('should return false if null is passed', function(done){
            var request = require(tmp.path);
            var val = request.setDisallowedUrl(null);
            val.should.eql(false);
            done();
        });

        it('should return false if false is passed', function(done){
            var request = require(tmp.path);
            var val = request.setDisallowedUrl(false);
            val.should.eql(false);
            done();
        });

        it('should return false if true is passed', function(done){
            var request = require(tmp.path);
            var val = request.setDisallowedUrl(true);
            val.should.eql(false);
            done();
        });

        it('should return false if empty string is passed', function(done){
            var request = require(tmp.path);
            var val = request.setDisallowedUrl('');
            val.should.eql(false);
            done();
        });

        it('should return false if string is not a valid Regex pattern', function(done){
            var request = require(tmp.path);
            var val = request.setDisallowedUrl('*');
            val.should.eql(false);
            done();
        });

        it('should return true if valid Regex pattern is passed and should add that pattern to disallowedUrls', function(done){
            var request = require(tmp.path);
            var val = request.setDisallowedUrl('abc');
            val.should.eql(true);
            request.disallowedUrls.length.should.eql(1);
            request.disallowedUrls.indexOf('abc').should.be.above(-1);
            done();
        });

        it('should return true if another valid Regex pattern is passed and should add that pattern to disallowedUrls', function(done){
            var request = require(tmp.path);
            var val = request.setDisallowedUrl('def');
            val.should.eql(true);
            request.disallowedUrls.length.should.eql(2);
            request.disallowedUrls.indexOf('def').should.be.above(-1);

            // Reset the disallowedUrls
            request.disallowedUrls = [];

            done();
        });

    });

    // checkUrl
    describe('checkUrl', function(){

        it('should return 404 if no data object is passed', function(done){
            var request = require(tmp.path);
            var val = request.checkUrl();
            val.should.eql(404);
            done();
        });

        it('should return 404 if data object is empty', function(done){
            var request = require(tmp.path);
            var val = request.checkUrl({});
            val.should.eql(404);
            done();
        });

        it('should return 404 if path is false', function(done){
            var request = require(tmp.path);
            var val = request.checkUrl({
                path : false
            });
            val.should.eql(404);
            done();
        });

        it('should return 404 if path is true', function(done){
            var request = require(tmp.path);
            var val = request.checkUrl({
                path : true
            });
            val.should.eql(404);
            done();
        });

        it('should return 404 if path is number', function(done){
            var request = require(tmp.path);
            var val = request.checkUrl({
                path : 123
            });
            val.should.eql(404);
            done();
        });

        it('should return 404 if path is object and not null', function(done){
            var request = require(tmp.path);
            var val = request.checkUrl({
                path : {}
            });
            val.should.eql(404);
            done();
        });

        it('should return undefined if path is a string, but no required or disallowed urls have been set', function(done){
            var request = require(tmp.path);
            var val = request.checkUrl({
                'path' : 'foo'
            });
            var type = typeof(val);
            type.should.eql('undefined');
            done();
        });

        it('should return undefined if path is a null, but no required or disallowed urls have been set', function(done){
            var request = require(tmp.path);
            var val = request.checkUrl({
                'path' : null
            });
            var type = typeof(val);
            type.should.eql('undefined');
            done();
        });

        it('should return undefined if path matches required url', function(done){
            var request = require(tmp.path);
            request.setRequiredUrl('abc');
            var val = request.checkUrl({
                'path' : 'abcd'
            });
            var type = typeof(val);
            type.should.eql('undefined');
            request.requiredUrls = [];
            done();
        });

        it('should return 404 if path does not match required url', function(done){
            var request = require(tmp.path);
            request.setRequiredUrl('abc');
            var val = request.checkUrl({
                'path' : 'acdb'
            });
            val.should.eql(404);
            request.requiredUrls = [];
            done();
        });

        it('should return undefined if path does not match disallowed url', function(done){
            var request = require(tmp.path);
            request.setDisallowedUrl('abc');
            var val = request.checkUrl({
                'path' : 'acdb'
            });
            var type = typeof(val);
            type.should.eql('undefined');
            request.disallowedUrls = [];
            done();
        });

        it('should return 404 if path matches disallowed url', function(done){
            var request = require(tmp.path);
            request.setDisallowedUrl('abc');
            var val = request.checkUrl({
                'path' : 'abcd'
            });
            val.should.eql(404);
            request.disallowedUrls = [];
            done();
        });

        it('should return 404 if path matches required url but also matches disallowedurl', function(done){
            var request = require(tmp.path);
            request.setRequiredUrl('a');
            request.setDisallowedUrl('abc');
            var val = request.checkUrl({
                'path' : 'abcd'
            });
            val.should.eql(404);
            request.requiredUrls = [];
            request.disallowedUrls = [];
            done();
        });

        it('should return undefined if path includes required element and nothing else, when that same url with a slash is disallowed', function(done){
            var request = require(tmp.path);
            request.setRequiredUrl('foo');
            request.setDisallowedUrl('foo/');
            var val = request.checkUrl({
                'path' : 'foo'
            });
            var type = typeof(val);
            type.should.eql('undefined');
            request.requiredUrls = [];
            request.disallowedUrls = [];
            done();
        });

        it('should return 404 if path includes required element, but then a slash and other characters, which is disallowed', function(done){
            var request = require(tmp.path);
            request.setRequiredUrl('foo');
            request.setDisallowedUrl('foo/');
            var val = request.checkUrl({
                'path' : 'foo/bar'
            });
            val.should.eql(404);
            request.requiredUrls = [];
            request.disallowedUrls = [];
            done();
        });

        it('should return undefined if path is empty string and all paths of length 1 or more are disallowed', function(done){
            var request = require(tmp.path);
            request.setDisallowedUrl('.+');
            var val = request.checkUrl({
                'path' : ''
            });
            var type = typeof(val);
            type.should.eql('undefined');
            request.disallowedUrls = [];
            done();
        });

        it('should return 404 if path is empty string and all paths of length 0 or more are disallowed', function(done){
            var request = require(tmp.path);
            request.setDisallowedUrl('.*');
            var val = request.checkUrl({
                'path' : ''
            });
            val.should.eql(404);
            request.disallowedUrls = [];
            done();
        });

        it('should return undefined if path is null and all paths of length 1 or more are disallowed', function(done){
            var request = require(tmp.path);
            request.setDisallowedUrl('.+');
            var val = request.checkUrl({
                'path' : null
            });
            var type = typeof(val);
            type.should.eql('undefined');
            request.disallowedUrls = [];
            done();
        });

        it('should return 404 if path is null and all paths of length 0 or more are disallowed', function(done){
            var request = require(tmp.path);
            request.setDisallowedUrl('.*');
            var val = request.checkUrl({
                'path' : null
            });
            val.should.eql(404);
            request.disallowedUrls = [];
            done();
        });

        it('should return 404 if path is any string and all paths of length 1 or more are disallowed', function(done){
            var request = require(tmp.path);
            request.setDisallowedUrl('.+');
            var val = request.checkUrl({
                'path' : 'a'
            });
            val.should.eql(404);
            request.disallowedUrls = [];
            done();
        });

        it('should return 404 if path is any string and all paths of length 0 or more are disallowed', function(done){
            var request = require(tmp.path);
            request.setDisallowedUrl('.*');
            var val = request.checkUrl({
                'path' : 'a'
            });
            val.should.eql(404);
            request.disallowedUrls = [];
            done();
        });

    });

    // checkMethod
    describe('checkMethod', function(){

        it('should return 405 if no data object is passed', function(done){
            var request = require(tmp.path);
            var val = request.checkMethod();
            val.should.eql(405);
            done();
        });

        it('should return 405 if data object is empty object', function(done){
            var request = require(tmp.path);
            var val = request.checkMethod({});
            val.should.eql(405);
            done();
        });

        it('should return 405 if data.method is a string that has no matching controller', function(done){
            var request = require(tmp.path);
            var val = request.checkMethod({
                'method' : 'post'
            });
            val.should.eql(405);
            done();
        });

        it('should return undefined if data.method is a string that has a matching controller', function(done){
            var app = require(tmp.index_path);
            app.lib.controllers.set.post = function(){};
            var val = app.lib.req.checkMethod({
                'method' : 'post'
            });
            var type = typeof(val);
            type.should.eql('undefined');
            app.lib.controllers.set = {};
            done();
        });

    });

    // checkCors
    describe('checkCors', function(){

        it('should return undefined if nothing is passed', function(done){
            var request = require(tmp.path);
            var val = request.checkCors();
            (typeof(val)).should.eql('undefined');
            done();
        });

        it('should return undefined if no data object is passed', function(done){
            var request = require(tmp.path);
            var val = request.checkCors(true);
            (typeof(val)).should.eql('undefined');
            done();
        });

        it('should return undefined if data object is empty object', function(done){
            var request = require(tmp.path);
            var val = request.checkCors(true,{});
            (typeof(val)).should.eql('undefined');
            done();
        });

        it('should return undefined if data.method is POST and cors is true', function(done){
            var request = require(tmp.path);
            var val = request.checkCors(true,{
                'method' : 'post'
            });
            (typeof(val)).should.eql('undefined');
            done();
        });

        it('should return undefined if data.method is POST and cors is false', function(done){
            var request = require(tmp.path);
            var val = request.checkCors(false,{
                'method' : 'post'
            });
            (typeof(val)).should.eql('undefined');
            done();
        });

        it('should return 200 if data.method is OPTIONS and cors is true', function(done){
            var request = require(tmp.path);
            var val = request.checkCors(true,{
                'method' : 'options'
            });
            val.should.eql(200);
            done();
        });

        it('should return undefined if data.method is OPTIONS and cors is false', function(done){
            var request = require(tmp.path);
            var val = request.checkCors(false,{
                'method' : 'options'
            });
            (typeof(val)).should.eql('undefined');
            done();
        });

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

        it('should return empty headers object if no headers are sent', function(done){
            var req = {};
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.headers);
            type.should.eql('object');
            val.headers.should.eql({});
            done();
        });

        it('should return empty headers object if empty headers are sent', function(done){
            var req = {
                'headers' : {}
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.headers);
            type.should.eql('object');
            val.headers.should.eql({});
            done();
        });

        it('should return empty headers object if headers are null', function(done){
            var req = {
                'headers' : null
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.headers);
            type.should.eql('object');
            val.headers.should.eql({});
            done();
        });

        it('should return empty headers object if headers are false', function(done){
            var req = {
                'headers' : false
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.headers);
            type.should.eql('object');
            val.headers.should.eql({});
            done();
        });

        it('should return empty headers object if headers are true', function(done){
            var req = {
                'headers' : true
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.headers);
            type.should.eql('object');
            val.headers.should.eql({});
            done();
        });

        it('should return empty headers object if headers are string', function(done){
            var req = {
                'headers' : 'foo'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.headers);
            type.should.eql('object');
            val.headers.should.eql({});
            done();
        });

        it('should return empty headers object if headers are number', function(done){
            var req = {
                'headers' : 123
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.headers);
            type.should.eql('object');
            val.headers.should.eql({});
            done();
        });

        it('should return headers object with foo key if headers are object with foo key', function(done){
            var req = {
                'headers' : {
                    'foo' : 'bar'
                }
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.headers);
            type.should.eql('object');
            val.headers.foo.should.eql('bar');
            done();
        });

        it('should return headers object with foo and fizz keys if headers are object with foo and fizz keys', function(done){
            var req = {
                'headers' : {
                    'foo' : 'bar',
                    'fizz' : 'buzz'
                }
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.headers);
            type.should.eql('object');
            val.headers.foo.should.eql('bar');
            val.headers.fizz.should.eql('buzz');
            done();
        });

        it('should return empty payload object if no body is sent', function(done){
            var req = {};
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.should.eql({});
            done();
        });

        it('should return empty payload object if empty body is sent', function(done){
            var req = {
                'body' : {}
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.should.eql({});
            done();
        });

        it('should return empty payload object if body is null', function(done){
            var req = {
                'body' : null
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.should.eql({});
            done();
        });

        it('should return empty payload object if body is false', function(done){
            var req = {
                'body' : false
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.should.eql({});
            done();
        });

        it('should return empty payload object if body is true', function(done){
            var req = {
                'body' : true
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.should.eql({});
            done();
        });

        it('should return empty payload object if body is non JSON string', function(done){
            var req = {
                'body' : 'foo'
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.should.eql({});
            done();
        });

        it('should return empty payload object if body is number', function(done){
            var req = {
                'body' : 123
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.should.eql({});
            done();
        });

        it('should return empty payload object if body is object with foo key', function(done){
            var req = {
                'body' : {
                    'foo' : 'bar'
                }
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.should.eql({});
            done();
        });

        it('should return payload object with foo key if body is JSON string with foo key', function(done){
            var req = {
                'body' : {
                    'foo' : 'bar'
                }
            };
            req.body = JSON.stringify(req.body);
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.foo.should.eql('bar');
            done();
        });

        it('should return empty payload object body is object with foo and fizz keys', function(done){
            var req = {
                'body' : {
                    'foo' : 'bar',
                    'fizz' : 'buzz'
                }
            };
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.should.eql({});
            done();
        });

        it('should return payload object with foo and fizz keys if body is JSON string with foo and fizz keys', function(done){
            var req = {
                'body' : {
                    'foo' : 'bar',
                    'fizz' : 'buzz'
                }
            };
            req.body = JSON.stringify(req.body);
            var request = require(tmp.path);
            var val = request.getData(req);
            var type = typeof(val.payload);
            type.should.eql('object');
            val.payload.foo.should.eql('bar');
            val.payload.fizz.should.eql('buzz');
            done();
        });


    });

    // After

    after(function(done){

        done();

    }); 

});

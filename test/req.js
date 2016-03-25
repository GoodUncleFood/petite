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
            done();
        });

    });

    // After

    after(function(done){

        done();

    }); 

});

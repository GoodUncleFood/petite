// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Primary object creation and scaffolding', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../index'
        };

        done();
    }); 
     
    // Index page

    describe('Primary Script', function(){

        it('Should be in base directory of repo.', function(done){
            var exists = fs.existsSync(tmp.path+'.js');
            exists.should.be.ok;
            done();
        });

        it('Should throw if required incorrectly', function(done){
            (function(){
              var app = require(tmp.path+'foo');
            }).should.throw();
            done();
        });

        it('Should not throw if required correctly', function(done){
            (function(){
              var app = require(tmp.path);
            }).should.not.throw();
            done();
        });

        it('Should return an object.', function(done){
            var app = require(tmp.path);
            app.should.be.an.Object;
            done();
        });

    });


    // Primary object

    describe('Primary Object', function(){

        it('Should contain a lib key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib);
            done();
        });

        it('Should contain a requireUrl key', function(done){
            var app = require(tmp.path);
            should.exist(app.requireUrl);
            done();
        });

        it('Should contain a disallowUrl key', function(done){
            var app = require(tmp.path);
            should.exist(app.disallowUrl);
            done();
        });

        it('Should contain a requireHeader key', function(done){
            var app = require(tmp.path);
            should.exist(app.requireHeader);
            done();
        });

        it('Should contain a addController key', function(done){
            var app = require(tmp.path);
            should.exist(app.addController);
            done();
        });

        it('Should contain a setConfig key', function(done){
            var app = require(tmp.path);
            should.exist(app.setConfig);
            done();
        });

        it('Should contain a start key', function(done){
            var app = require(tmp.path);
            should.exist(app.start);
            done();
        });

        it('Should contain a stop key', function(done){
            var app = require(tmp.path);
            should.exist(app.stop);
            done();
        });

        it('Should contain a config key', function(done){
            var app = require(tmp.path);
            should.exist(app.config);
            done();
        });

    });

    // Lib object

    describe('Lib Object', function(){

        it('Should contain a config key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib.config);
            done();
        });

        it('Should contain an exception key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib.exception);
            done();
        });

        it('Should contain a log key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib.log);
            done();
        });

        it('Should contain a server key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib.server);
            done();
        });

        it('Should contain a req key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib.req);
            done();
        });

        it('Should contain a res key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib.res);
            done();
        });

        it('Should contain an util key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib.util);
            done();
        });

        it('Should contain a controllers key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib.controllers);
            done();
        });

        it('Should contain a regulator key', function(done){
            var app = require(tmp.path);
            should.exist(app.lib.regulator);
            done();
        });

    });

    // After

    after(function(done){

        done();

    }); 

});

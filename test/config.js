// Dependencies

var should = require('should');
var fs = require('fs');

// Tests

describe('Configuration object', function(){

    // Before

    before(function(done){

        tmp = {
            path: './../lib/config'
        };

        done();
    }); 
     
    // Config file

    describe('Config script file', function(){

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


    // Config object

    describe('Config object structure', function(){

        it('Should contain a envs key', function(done){
            var config = require(tmp.path);
            should.exist(config.envs);
            done();
        });

        it('Should contain a currentConfig key', function(done){
            var config = require(tmp.path);
            should.exist(config.currentConfig);
            done();
        });

        it('Should contain a setCurrentConfig key', function(done){
            var config = require(tmp.path);
            should.exist(config.setCurrentConfig);
            done();
        });

        it('Should contain a setConfigOption key', function(done){
            var config = require(tmp.path);
            should.exist(config.setConfigOption);
            done();
        });

    });


    // config.envs object

    describe('Envs object structure', function(){

        it('Should contain a def key', function(done){
            var config = require(tmp.path);
            var envs = config.envs;
            should.exist(envs.def);
            done();
        });

    });

    // config.envs.def object

    describe('envs.def object structure', function(){

        it('Should contain a port key', function(done){
            var config = require(tmp.path);
            var def = config.envs.def;
            should.exist(def.port);
            done();
        });

        it('Should contain a log key', function(done){
            var config = require(tmp.path);
            var def = config.envs.def;
            should.exist(def.log);
            done();
        });

        it('Should contain a debug key', function(done){
            var config = require(tmp.path);
            var def = config.envs.def;
            should.exist(def.debug);
            done();
        });

    });

    // setConfigOption

    describe('setConfigOption function', function(){

        it('Should return false if key is undefined', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption(undefined,'value');
            val.should.be.ok;
            done();
        });

        it('Should return false if key is false', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption(false,'value');
            val.should.be.ok;
            done();
        });

        it('Should return false if key is true', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption(true,'value');
            val.should.be.ok;
            done();
        });

        it('Should return false if key is number', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption(123,'value');
            val.should.be.ok;
            done();
        });

        it('Should return false if key is object', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption({},'value');
            val.should.be.ok;
            done();
        });

        it('Should return false if value is undefined', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption('key',undefined);
            val.should.be.ok;
            done();
        });

        it('Should return true if key and value are set, and should set the value in default object', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption('foo','bar');
            val.should.be.ok;
            should.exist(config.envs.def.foo);
            config.envs.def.foo.should.eql('bar');
            done();
        });


        it('Should return true if key and value are set even if value is set already, and should set the value in default object', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption('foo','buzz');
            val.should.be.ok;
            should.exist(config.envs.def.foo);
            config.envs.def.foo.should.eql('buzz');
            done();
        });

        it('Should return true if key and value and env are set, and should set value in env object', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption('key','value','myenv');
            should.exist(config.envs.myenv.key);
            config.envs.myenv.key.should.eql('value');
            val.should.be.ok;
            done();
        });

        it('Should allow objects to be set for values', function(done){
            var config = require(tmp.path);
            var val = config.setConfigOption('key',{'fizz':'buzz'},'myenv');
            should.exist(config.envs.myenv.key.fizz);
            config.envs.myenv.key.fizz.should.eql('buzz');
            val.should.be.ok;
            done();
        });

    });


    // setCurrentConfig

    describe('setCurrentConfig function', function(){

        it('current config should be empty object before setCurrentConfig is run', function(done){
            var config = require(tmp.path);
            config.currentConfig.should.eql({});
            done();
        });

        it('current config should inherit default object after running setCurrentConfig', function(done){
            var config = require(tmp.path);
            var val = config.setCurrentConfig();
            val.should.eql('def');
            config.currentConfig.should.eql(config.envs.def);
            done();
        });

        it('current config should inherit env object after running setCurrentConfig and setting NODE_ENV', function(done){
            var config = require(tmp.path);
            config.setConfigOption('testingfoo','testingbar','testing');
            process.env.NODE_ENV = 'testing';
            var val = config.setCurrentConfig();
            val.should.eql('testing');
            config.currentConfig.testingfoo.should.eql('testingbar');
            done();
        });


    });



    // After

    after(function(done){

        done();

    }); 

});

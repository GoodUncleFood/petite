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


    // After

    after(function(done){

        done();

    }); 

});

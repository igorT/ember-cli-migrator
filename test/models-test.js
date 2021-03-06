var assert = require('chai').assert;
var EmberMigrator = require('../lib/ember-migrator');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');

describe('migrating models', function(){
  function fixture(fixtureName){
    var outDir = path.join(__dirname, "fixtures/output", fixtureName);
    return fs.readFileSync(outDir).toString();
  }
  function result(fixtureName){
    var file = path.join(tmpDir, 'app', fixtureName);
    return fs.readFileSync(file).toString();
  }
  var migrator;
  var tmpDir = path.join(__dirname, "../tmp");
  before(function(){
    migrator = new EmberMigrator({
      inputDirectory: path.join(__dirname, "fixtures/input"),
      outputDirectory: tmpDir
    });
    return migrator.run();
  });

  after(function(){
    rimraf.sync(tmpDir);
  });

  describe('single export file (only has one global)', function(){
    
    it('migrates the file correctly', function(){
      var expected = fixture('models/comment-activity.js').split('\n');
      var actual  = result('models/comment-activity.js').split('\n');
      assert.deepEqual(actual, expected);
    });
  });
  
});

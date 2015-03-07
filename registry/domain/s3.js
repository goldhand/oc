'use strict';

var AWS = require('aws-sdk');
var Cache = require('nice-cache');
var format = require('stringformat');
var fs = require('fs-extra');
var getMimeType = require('../../utils/get-mime-type');
var getNextYear = require('../../utils/get-next-year');
var giveMe = require('give-me');
var nodeDir = require('node-dir');
var path = require('path');
var strings = require('../../resources');
var _ = require('underscore');

module.exports = function(conf){

  AWS.config.update({
    accessKeyId: conf.s3.key,
    secretAccessKey: conf.s3.secret,
    region: conf.s3.region
  });

  var client = new AWS.S3(),
      bucket = conf.s3.bucket,
      cache = new Cache({
        verbose: !!conf.verbosity,
        refreshInterval: conf.refreshInterval
      });

  return {
    listSubDirectories: function(dir, callback){

      var normalisedPath = dir.lastIndexOf('/') === (dir.length - 1) && dir.length > 0 ? dir : dir + '/';

      client.listObjects({
        Bucket: bucket,
        Prefix: normalisedPath,
        Delimiter: '/'
      }, function (err, data) {
        if(err){ return callback(err); }

        if(data.CommonPrefixes.length === 0){
          return callback({ 
            code: strings.errors.s3.DIR_NOT_FOUND_CODE,
            msg: format(strings.errors.s3.DIR_NOT_FOUND, dir)
          });
        }

        var result = _.map(data.CommonPrefixes, function(commonPrefix){
          return commonPrefix.Prefix.substr(normalisedPath.length, commonPrefix.Prefix.length - normalisedPath.length - 1);
        });

        callback(null, result);
      });
    },
    getFile: function(filePath, force, callback){

      if(_.isFunction(force)){
        callback = force;
        force = false;
      }

      var cached = cache.get('s3-file', filePath);

      if(!!cached && !force){
        return callback(null, cached);
      }

      var getFromAws = function(callback){
        client.getObject({
          Bucket: bucket,
          Key: filePath
        }, function(err, data){
          if(err){ 
            return callback(err.code === 'NoSuchKey' ? {
              code: strings.errors.s3.FILE_NOT_FOUND_CODE,
              msg: format(strings.errors.s3.FILE_NOT_FOUND, filePath)
            } : err);
          }

          callback(null, data.Body.toString());
        });
      };

      getFromAws(function(err, result){
        if(err){ return callback(err); }
        cache.set('s3-file', filePath, result);
        cache.sub('s3-file', filePath, getFromAws);
        callback(null, result);
      });

    },
    getUrl: function(componentName, version, fileName){
      return conf.s3.path + componentName + '/' + version + '/' + fileName;
    },
    putDir: function(dirInput, dirOutput, callback){

      var self = this;

      nodeDir.paths(dirInput, function(err, paths) {
        var files = paths.files;

        giveMe.all(_.bind(self.putFile, self), _.map(files, function(file){
          var relativeFile = file.substr(dirInput.length),
              url = dirOutput + relativeFile;
          
          return [file, url, relativeFile === '/server.js'];
        }), function(errors, callbacks){

          if(errors){
            return callback(_.compact(errors));
          }

          callback(null, 'ok');
        });
      });
    },
    putFile: function(filePath, fileName, isPrivate, callback){
      var self = this;
      
      fs.readFile(filePath, function(err, fileContent){
        if(!!err){ return callback(err); }
        self.putFileContent(fileContent, fileName, isPrivate, callback);
      });
    },
    putFileContent: function(fileContent, fileName, isPrivate, callback){

      var mimeType = getMimeType(path.extname(fileName)),
          obj = {
            Bucket: bucket,
            Key: fileName,
            Body: fileContent,
            ACL: isPrivate ? 'authenticated-read' : 'public-read',
            ServerSideEncryption: 'AES256',
            Expires: getNextYear()
          };

      if(mimeType){
        obj.ContentType = mimeType;
      }

      client.putObject(obj, function (err, res) {
         callback(err, res);
      });
    }
  };
};

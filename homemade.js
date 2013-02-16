/*
homemade.js is stupid preprocessor
 */

/*jshint node:true*/

//TODO: make echo
//TODO: make echo inside eval

'use strict';

//exports.homemade = preprocess;

var path  = require('path'),
    fs    = require('fs'),
    grunt = require('grunt');

//exports.handle         = handle;
//exports.handleFile     = handleFile;


var re = {
  'include' : /(?:\/\/|\/\*)(?:→|↓|->|include|inc)[ ->]*\s+([^\/\*\s]+)\s*(?:-*\*\/$|$|\/\/.*$)/gm,
  'exclude' : /((?:\/\/|\/\*)(?:✂|exclude|cut)[ -]*[\n\r](?:(?:.|\s)(?![\n\r]-*\*\/|\/\/-+))*(?:.|\s)(?:[\n\r]-*\*\/|\/\/-+))+/g,
  'eval' : /(?:(?:\/\/|\/\*)(?:eval)[ -]*[\s]+((?:(?:.|\s)(?![\n\r]-*\*\/|\/\/-+))*(?:.|\s))(?:[\n\r]-*\*\/|\/\/-+))+/gm,
  'template' : /(?:(?:\/\/|\/\*)(?:template|tpl|%)[ -]*[\s]+((?:(?:.|\s)(?![\n\r]-*\*\/|\/\/-+))*(?:.|\s))(?:[\n\r]-*\*\/|\/\/-+))+/gm,
  'echo' : /(?:\/\/|\/\*)(?:%=|echo|print)[ -]*\s+([^\/\*\r\n]+)\s*(?:-*\*\/$|$|\/\/.*$)/gm
}

//Some necessities for API
global.tplResult = "";
global.print = function (str) {
    if (!tplResult) tplResult = str;
    else tplResult += "\n" + str;
}

//Main handlr
function handleFile(src, dest, context) {
  context = context || {};
  context.src = src;
  context.srcDir = path.dirname(src);

  try {
    var data = fs.readFileSync(src);
    fs.writeFileSync(dest, handle(data, context));
  } catch (e) {
    console.log(e)
  }
}

//Source code string handler
function handle(src,context) {
  src = src.toString();
  
  var rv = src;

  rv = rv.replace(re['include'],function(match,file){
    file = (file || '').trim();
    try {
      var includedSource = fs.readFileSync(path.join(context.srcDir,file));
      return includedSource || '//Include failed. File ' + file + ' wasn’t found.';
    } catch (e) {
      return '//Include failed. File ' + file + ' wasn’t found.'
    }
  });
  
  rv = rv.replace(re['eval'],function(match,code) {
    eval.call(global,code);
    return match
  });

  rv = rv.replace(re['template'],function(match,code) {
    //console.log("//--------TPL CODE")
    //console.log(code)
    tplResult = "";
    eval.call(global,code);
    //console.log(tplResult)
    return tplResult
  });

  rv = rv.replace(re['echo'],function(match,target){
    tplResult = "";
    eval.call(global,"print(" + target + ");");
    return tplResult;
  });

  rv = rv.replace(re['exclude'],"");

  return rv;
}


//---------------CLI
//console.log(process.argv)
var args = process.argv.slice(2);
if (args.length) {
  handleFile(args[0], args[1], args[2])
}
  


//----------Grunt-task
/*module.exports = init;
init.homemade = {
  handle: handle,
  handleFile: handleFile
};

grunt.util = grunt.util || grunt.utils;

var _ = grunt.util._;
var defaultEnv = {};


function init(grunt) {

  grunt.registerMultiTask('homemade', 'Preprocess files', function() {

    var context = _.extend({},defaultEnv,process.env, this.options()), files;

    context.NODE_ENV = context.NODE_ENV || 'development';

    if (this.data.files) {
      for (var src in this.data.files) {
        var dest = this.data.files[src];
        dest = grunt.template.process(dest);
        homemade.handleFile(src,dest,context);
      }
    }
  });
};*/
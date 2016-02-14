var fs = require('fs-extra');
var Promise = require('bluebird');
var path = require('path');
var join = path.join;

Promise.promisifyAll(fs);

var pagesSrc = join(__dirname,'source','pages');
var partialsSrc = join(__dirname,'source','partials');
var destDir = join(__dirname,'pages');


var getHeader = fs.readFileAsync( join(partialsSrc,'header.md') );
var getFilenames = fs.readdirAsync( pagesSrc );


function constructPage(filename,header,footer){
	return new Promise(function(resolve,reject){
		var readContent = fs.createReadStream( join(pagesSrc,filename) );
		var writer = fs.createOutputStream( join(destDir,filename) );

		var writeContent = function(){
			readContent.on('error',reject);
			readContent.on('end',writeFooter);
			readContent.pipe(writer,{end:false});
		}

		var writeFooter = function(){
			writer.write(footer,resolve)
		}

		writer.write(header,writeContent);
	});
}

function getFooter(prev,next,n){
	var output = ['\n\n','# ','\n\n'];

	if(prev){
		output.push('<a href="./'+prev+'#content" style="display:inline-block; padding:0 8px; text-align:left; float:left;" > << Previous </a>');
	}

	if(next){
		output.push('<a href="./'+next+'#content" style="display:inline-block; padding:0 8px; text-align:right; float:left;" > Next >> </a>');
	}





	output.push('\n\n');
	return output.join('');
}

function constructPages(){
	return Promise.join(getHeader,getFilenames,function(header,filenames){
		return Promise.map(filenames,function(filename,i){

			var footer = getFooter(filenames[i-1],filenames[i+1],i);
			return constructPage(filename,header,footer);
		});
	})
	.then(function(){
		console.log('all done');
	})
	.catch(function(err){
		console.log('some error occurred',err);
	});
}

constructPages()

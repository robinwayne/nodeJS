'use strict';

module.exports = ContentModel;

fs=require('fs');
process.env.CONFIG = JSON.stringify(CONFIG);

function ContentModel(ContentModel){
	this.type=type;
	this.id=id;
	this.title=title;
	this.src=src;
	this.fileName=fileName;
	var data;

	this.getData = function(){
		return this.data;
	}
	this.setAge = function(data){
		this.data=data;
	}


	UserModel.create=function(ContentModel, cb(){
		if(ContentModel.type ==='img'){
			ContentModel.fileName=ContentModel.getData;
			var pathName = CONFIG.contentDirectory + '/';
			var metaData = JSON.stringify(ContentModel);
			fs.writeFile(pathName + ContentModel.id + ".meta.json", metaData, "UTF-8");
			console.log("fichier %f cree et enregistre");



			cb();
	});

	UserModel.read=function(id, cb(){
		var pathName = CONFIG.contentDirectory + '/' + id + '.meta.json';
		fs.readFile(pathName, function(err, data){
			if (!! err) throw err;
			return var contentModel = JSON.parse(data);
		});
		cb();
	});


	UserModel.update=function(ContentModel, cb(){
		data=ContentModel.getData;
		if(data != 0 && data>0){


	});
	



	//TODO

	cb();
		}

}

{name : 'toto',
tata : 'toto'}
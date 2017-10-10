'use strict';

module.exports = ContentModel;

var fs = require('fs');
var CONFIG = require('../../config.json');
var path = require('path');


process.env.CONFIG = JSON.stringify(CONFIG);

var type;
var id;
var title;
var src;
var fileName;
var _data;

function ContentModel(type, id, title, src, fileName, data) {
    this.type = type;
    this.id = id;
    this.title = title;
    this.src = src;
    this.fileName = fileName;
    this._data=data;


    this.getData = function () {
        return this._data;
    }
    this.setData = function (data) {
        this._data = data;
    }
}

ContentModel.create=function(contentModel, cb) {

    //var fileName_ext;
    //fileName_ext = path.extname(contentModel.fileName);

    //on stocke le contenu de [content.data] dans le fichier [content.fileName]
	fs.writeFile(CONFIG.contentDirectory + '/' + contentModel.fileName, contentModel.getData(), 'UTF-8');
	console.log('The file has been created !');
	console.log(CONFIG.contentDirectory + '/' + contentModel.fileName);

    //on stocke les meta-donnees dans le fichier [contentModel.id].meta.json dans [CONFIG.contentDirectory]
    var metaData = JSON.stringify(contentModel);
    fs.writeFile(CONFIG.contentDirectory + '/' + contentModel.id + '.meta.json', metaData, 'UTF-8');
    console.log('The file has been created !');
    console.log(CONFIG.contentDirectory + '/' + contentModel.id + '.meta.json');

    cb();
};

ContentModel.read=function(contentModel, cb){
	var contentModel = new ContentModel();
	var pathName = CONFIG.contentDirectory + '/' + contentModel.id + '.meta.json';
	fs.readFile(pathName, function(err, data){
		if (!! err) throw err;
		return (contentModel = JSON.parse(data));
	});
	cb();
};


ContentModel.update=function(contentModel, cb){
	var data;
	data=contentModel.getData;
	var pathName = CONFIG.contentDirectory + '/';
	var metadata = JSON.stringify(contentModel);
	if(data !== 0 && data>0){

	}

	cb();




}



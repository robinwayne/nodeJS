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




ContentModel.read=function(id, cb){
 
    var pathName = CONFIG.contentDirectory + '/' + id + '.meta.json';
    
	fs.readFile(pathName, function(err, data){
        if (!! err) throw err;
        
        var data_parsed = JSON.parse(data);
        var contentModel = new ContentModel(data_parsed.type, data_parsed.id, data_parsed.title, data_parsed.src, 
            data_parsed.fileName, data_parsed._data);
        console.log(contentModel._data);    
		return contentModel;
    });
   
	cb();
};





ContentModel.update=function(id, cb){
    
    var pathName = CONFIG.contentDirectory + '/' + id + '.meta.json';
    
    fs.readFile(pathName, function(err, data){
        if (!! err) throw err;
        
        var data_parsed = JSON.parse(data);
        if(data_parsed._data != NULL && length(data_parsed)>0){
            fs.writeFile(CONFIG.contentDirectory + '/' + data_parsed.fileName, data_parsed._data, 'UTF-8');
            var metadata = JSON.stringify(data_parsed);
            fs.writeFile(CONFIG.contentDirectory + '/' + id + '.meta.json', metaData, 'UTF-8');
        }
    });
    
	cb();

}


ContentModel.delete=function(id, cb){

    var pathName = CONFIG.contentDirectory + '/' + id;
    fs.unlinkSync(pathName);
    fs.unlinkSync(pathName + '.meta.json');
    console.log(pathName);
    cb();

}


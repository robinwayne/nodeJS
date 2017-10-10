// user.route.js
"use strict";


var express = require("express");
var fs = require("fs");
var router = express.Router();

module.exports = router;


var CONFIG = require('../../config.json');
var ContentModel = require('./content.router.js');

process.env.CONFIG = JSON.stringify(CONFIG);


router.route('/contents')
    .get(function(request, response){
        var listMetadata= [];
        fs.readdir(CONFIG.presentationDirectory, function(err, files){
        if(!!err){
            console.error(err);
            return;
        }
        files.forEach(function(file){
            if(file.split('.').pop() === ".meta.json"){
                listMetadata.push(file);
            }
        });
        response.end(listMetadata);
        });
    })
    .post(function(request, response){

        var file = request.body.file;
        var title = request.body.title;
        var type = request.body.type;
        var src = request.body.src;

        ContentModel.create((type, ' ', title, src, file," "), cb);
        response.end("Nouveau contenu cree");
    });


router.route('/contents/:contentId')
    .get(function(request, response){
        var id = request.params.contentId;
        fs.readFile(CONFIG.contentDirectory + '/' + id + '.meta.json', function(err, data){
            if (!! err) throw err;
            response.end(JSON.parse(data));
        });

    });




router.param('userId', function(req, res, next, id) {
    req.userId = id;
    next();

});
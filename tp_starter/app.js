
var express = require("express");
var http = require("http");
var CONFIG = require("./config.json");
var defaultRoute = require("./app/routes/default.route.js");
var path = require("path");
var fs = require("fs");
var maMap = new Map();
var contenu;


process.env.CONFIG = JSON.stringify(CONFIG);

var app = express();
var server = http.createServer(app);
app.use(defaultRoute);

/*// #2
app.get("/", function(request, response) {
response.send("It works !");
});
// #3
app.use(function(request, response, cb) {
response.send("It works !");
cb();
});
*/
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));


//question13

app.use("/loadPres", function(req, res){
	
	var filenameArray = [];
	fs.readdir(CONFIG.presentationDirectory, function(err, data){
	if(!!err){
		console.error(err);
		return;
	}
	data.forEach(function(fileName){
		filenameArray.push(fileName);
		fs.readFile(CONFIG.presentationDirectory + "/" + fileName,'utf8', function(err, data){
			if(!!err){
			console.error(err);
			return;
			}
			var content_parsed=JSON.parse(data);
			var key=content_parsed.id;
			maMap[key]=data;
			console.log(maMap);

			res.end(JSON.stringify(maMap));

		}); 
		
		});

	});
	
});

app.use("/savePres", function(req, res){
	req.on('data', function(chunk){
		var textFile=JSON.parse(chunk);
		fs.writeFile(CONFIG.presentationDirectory +'/'+ textFile.id + ".pres.json", JSON.stringify(textFile), "UTF-8");
		console.log("fichier cree et enregistre");
	});
	res.end();
});

server.listen(CONFIG.port, function(){
	var host = this.address().address;
	var port = this.address().port;
});

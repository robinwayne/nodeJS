/**
 * Created by Robin on 10/10/2017.
 */

var multer = require("multer");
var express = require("express");
var router = express.Router();

module.exports = router;

var multerMiddleware = multer({ "dest": "/tmp/" });

router.post("/contents", multerMiddleware.single("file"), function(request, response) {
    console.log(request.file.path); // The full path to the uploaded file
    console.log(request.file.originalname); // Name of the file on the user's computer
    console.log(request.file.mimetype); // Mime type of the file
});

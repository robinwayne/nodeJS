var express = require("express");
var router = express.Router();
router.route('/').get(function(request, response){
	response.send("It works !!");
});
module.exports = router;
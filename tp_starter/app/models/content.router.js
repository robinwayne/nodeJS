// user.route.js
"use strict";


var express = require("express");
var router = express.Router();
module.exports = router;


var CONFIG = require('../../config.json');
var ContentModel = require('./content.router.js');

process.env.CONFIG = JSON.stringify(CONFIG);


router.route('/contents')
    .get()
    .post(userController.token, userController.create);


router.route('/users/:userId')
    .get(userController.read)
    .put(userController.update)
    .delete(userController.delete);


router.param('userId', function(req, res, next, id) {
    req.userId = id;
    next();

});
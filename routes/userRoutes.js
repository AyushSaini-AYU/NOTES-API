var express = require('express');
const { signUp, signIn } = require('../controllers/userController');
var userRoutes = express.Router();

/* GET home page. */
userRoutes.post('/signup', signUp);

userRoutes.post('/signin', signIn);

module.exports = userRoutes;

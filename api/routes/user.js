// author - Prateek Madaan
// context - Controller for the user routes

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UsersController = require('../controllers/user');


router.post('/register',UsersController.SignUpUser);

router.post('/login',UsersController.LogInUser);

router.delete('/:userId',UsersController.deleteUser);


module.exports = router;
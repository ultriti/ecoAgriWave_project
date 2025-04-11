const express = require('express');
const { register_user,login_user ,logout_user, getUserDetails, editUserDetails} = require('../controllers/user.controller.js');
const { isAuthorizedUser } = require('../middleware/UserAuth');
const { get } = require('mongoose');
const router = express.Router();
// const Userauth = require('../middleware/userAuth');

router.route('/register').post(register_user)
router.route('/login').post(login_user)
router.route('/logout').post(isAuthorizedUser,logout_user)

router.route('/UserDetails').get(isAuthorizedUser, getUserDetails).put(isAuthorizedUser, editUserDetails);




module.exports = router;
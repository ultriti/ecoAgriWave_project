const express = require('express');
const { createUser } = require('../controllers/user.controller');
const router = express.Router();
// const Userauth = require('../middleware/userAuth');

router.route('/register').post(createUser)
router.route('/login').post(login_user)



module.exports = router;
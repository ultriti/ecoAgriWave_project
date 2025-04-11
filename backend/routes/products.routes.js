const express = require('express');
const { isAuthorizedUser, AuthorizedRoles } = require('../middleware/UserAuth');
const { createProduct, getallProducts } = require('../controllers/product.controller');
const router = express.Router();

// ----------------------> products routes
router.route('/createProduct').post(isAuthorizedUser, AuthorizedRoles("admin"),createProduct);
router.route('/getAllProducts').get(isAuthorizedUser,getallProducts);

module.exports = router;
const express = require('express');
const { isAuthorizedUser, AuthorizedRoles } = require('../middleware/UserAuth');
const { createProduct, getallProducts, updateProduct, deleteProduct, getProductDetails } = require('../controllers/product.controller');
const router = express.Router();

// ----------------------> products routes
router.route('/createProduct').post(isAuthorizedUser, AuthorizedRoles("admin"),createProduct);
router.route('/getAllProducts').get(isAuthorizedUser,getallProducts);
router.route('/modify/:id').put(isAuthorizedUser,AuthorizedRoles("admin"),updateProduct).delete(isAuthorizedUser,AuthorizedRoles("admin"),deleteProduct).get(isAuthorizedUser,getProductDetails);

module.exports = router;


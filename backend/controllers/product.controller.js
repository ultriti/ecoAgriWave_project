const ErrorHandler = require("../utils/ErrorHandler.js");
const productModel = require("../models/product.model.js");
const CatchAndError = require("../middleware/CatchAndError.js");
const ApiFeatures = require("../utils/ApiFeatures.js");



// --------------> create products <----------------
module.exports.createProduct =CatchAndError( async (req, res, next) => {
    const { public_id, url, name, description, category, price, stock } = req.body;
    const admin_id = req.user._id;

    console.log(req.body);
    
    if (!name, !price, !description, !category) {
        return next(new ErrorHandler("Please provide all the fields", 400));
    }

    try {
        const products = await productModel.findOne({ name: name });

            const newProduct = await productModel.create({
                name,
                price,
                description,
                category,
                admin_id:admin_id
            });

            if (public_id) { newProduct.images.public_id = public_id };
            if (url) { newProduct.images.url = url };
            await newProduct.save();

            res.status(200).json({
                success: true,
                message: "Product created",
                newProduct
            });
   
    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500));
    }

})


// -----------------> get all produtcs
exports.getallProducts = CatchAndError(async (req, res, next) => {

    const result_per_page = 5;
    const count_products = await productModel.countDocuments();
    console.log('sadasdsd');
    try {
      
        
        const apifeatures = new ApiFeatures(productModel.find(), req.query)
            .search_feature()
            .filter()
            .pagination(result_per_page);

        const get_all_products = await ApiFeatures.query;
        console.log('g:',get_all_products);
        

        if (!get_all_products) {
            return next(new ErrorHandler("products not found", 401));
        }
        res.status(200).json({
            messsage: "got all products",
            products: get_all_products,
            count_products
        });
    } catch (err) {
        console.log("sgegfd:",err);
        return next(new ErrorHandler("Something went wrong", 500));
    }
});

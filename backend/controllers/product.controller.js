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

    const result_per_page = 9;
    const count_products = await productModel.countDocuments();

    try {
      
        
        const apifeatures = new ApiFeatures(productModel.find(), req.query)
            .search_feature()
            .filter()
            .pagination(result_per_page);

        const get_all_products = await apifeatures.query;

        

        if (!get_all_products) {
            return next(new ErrorHandler("products not found", 404));
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


// ----------------> update products
exports.updateProduct = CatchAndError(async (req, res, next) => {

    try {
        let product = await productModel.findById(req.params.id);


        if (!product) {
            // return next(new ErrorHandler("products not found", 404));
            res.status(404).json({ message: "Product not found" });
        }
        else {
            try {
                const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).json(updatedProduct);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
    } catch {
        console.error('error');
        return next(new ErrorHandler("products not found - internal error", 401));
    }


});


// ------------------> delete products

exports.deleteProduct = CatchAndError(async (req, res) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
    } else {
        try {

            await productModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Product deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
});

// -------------------> get single product details
exports.getProductDetails = async (req, res, next) => {

    try {
        let product = await productModel.findById(req.params.id);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        else {
            res.status(200).json(product);
        }
    } catch {
        res.status(500).json({ message: "products not found" });
    }

};
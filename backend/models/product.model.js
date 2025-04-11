const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: { type: String, required: [true, "please enter product name"] },
    price: { type: Number, required: [true, "prize cannot be exceeded 8 characters"] },
    description: { type: String, required: [true, "please enter product description"] },
    category: { type: String, required: [true, "please enter product category"] },
    stock: { type: Number, required: [true, "please enter product stock"], default: 1 },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratings:{type:String,default:0},
    noOfReviwes: {
        type: Number,
        required: [true, "please enter product reviews"],
        default: 0
    },
    reviews: [
        {
            user_id: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User', 
                required: true 
            },
            name:{
                type: String,
                required:true
            },
            rating: {
                type: Number,
                required: [true, "please enter product review rating"],
                min: 1,
                max: 5,
                default:0
            },
            comment: {
                type: String,
                required: true
            }
        }
      

    ],
    images: {
        public_id: { 
            type: String, 
            default:"default_public_id",
            required: true 
        },
        url: {
            type: String,
            default:"default_image_url",
            required: [true, "please enter product image url"]
        }
    },
    created_at:{
        type: Date,
        default: Date.now
    }


})

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
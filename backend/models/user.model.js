const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter your full name"],
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        require:true,
        select: false
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        // validator: [validator.isEmail, "please enter a valid email"]
    },
    profile_pic: {
        public_id: {
            type: String,
            required: true,
            default: "user_public_id",
        },
        url: {
            type: String,
            required: true,
            default: "user_profile_pic"
        }
    },
    bio: {
        type: String,
        default: "This is my bio"
    },
    phone_number: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user'
    },
    shipping_address: [{
        address_line: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zip_code: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
        is_default: {
            type: Boolean,
            default: false
        }

    }],
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date
})


userSchema.methods.generateAuthToken = async (user) => {
    
    const token = jwt.sign({ userId: user.user_id, email:user.email }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async (password, userpassword) => {
    return await bcrypt.compare(password, userpassword);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


userSchema.methods.generateResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;

}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;


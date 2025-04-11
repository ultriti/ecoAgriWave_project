const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../utils/ErrorHandler');
const CatchAndError = require('../middleware/CatchAndError');

module.exports.register_user = async (req, res, next) => {
    const { username, password, email, public_id, profile_pic_url } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields"
        })
    }

    try {
        const user_details = await userModel.findOne({ email });
        if (!user_details) {
            const hashed_password = await userModel.hashPassword(password);
            console.log('h:', hashed_password);



            const user = await userModel.create({
                username,
                password: hashed_password,
                email,
            })
            if (profile_pic_url && public_id) {
                user_details.profile_pic.url = profile_pic_url
                user_details.profile_pic.public_id = public_id
                await user_details.save()
            }


            res.status(200).json({
                success: true,
                message: "User registered successfully",
                user
            })
        }
        res.status(400).json({
            success: false,
            message: "User already exist"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })


    }

}

// ----------------> User Login <----------------<
module.exports.login_user = CatchAndError(
    async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("invalid credentials ",500))
        }
        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "password is incorrect"
            })
        }
        const user_details = {
            user_id: user._id,
            username: user.username,
            email: user.email,
            profile_pic: user.profile_pic.url,
            role: user.role,
            bio: user.bio,
            phone_number: user.phone_number
        }
        const token = await user.generateAuthToken(user_details)
        res.cookie('token', token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "user logged in successfully",
            token,
            user_details
        })
    }
)

// ----------------> User Logout <----------------<
module.exports.logout_user = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "please enter token"
        })
    }
    res.clearCookie('token');
    res.status(200).json({ message: "user logged out successfully" });



}


// ------------------> get user details <----------------<
module.exports.getUserDetails = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        res.status(200).json({
            success: true,
            user,
            message: "user details fetched successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}


// ---------------------> editUserDetails <----------------<
module.exports.editUserDetails = async (req, res, next) => {
    const user_id = req.id;
    const { username, email, public_id, profile_pic_url } = req.body;

    try {
        const user = await userModel.findOne({ email: req.user.email });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        if (username) { user.username = username; }
        if (profile_pic_url) {  user.profile_pic.url = profile_pic_url;   }
        if (public_id) {user.profile_pic.public_id = public_id;  }
        await user.save();

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


// 

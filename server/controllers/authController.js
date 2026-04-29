const User = require('../models/userModel')

exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            avatar
        });

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
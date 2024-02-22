const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require('../config/genrateToken'); // Corrected the import statement

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body; // Removed parentheses from req.body

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    const newUser = await User.create({ name, email, password, pic });

    if (newUser) {
        res.status(200).json(
            {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            pic: newUser.pic,
            token: generateToken(newUser._id) // Corrected the argument to generateToken
        }
        );
    } else {
        res.status(500);
        throw new Error("Failed to create user");
    }
});

module.exports = { registerUser };
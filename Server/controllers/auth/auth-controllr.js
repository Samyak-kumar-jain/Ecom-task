const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../Model/User');

// Register User
const registerUser = async (req, res) => {
    const { name, password, email, role } = req.body; // Include role in the destructuring

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user with the role included
        const newUser = new User({
            username: name,
            email,
            password: hashPassword,
            role, // Save the role
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Registered successfully",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "An error occurred during registration",
        });
    }
};


// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role, email:user.email },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '1h' }
        );

        res.cookie("token", token, { httpOnly: true, secure: false }) 
        .status(200) 
        .json({ 
        success: true,
        message: "Login successfully",
        user: {
            email: user.email,
            role: user.role,
            id: user._id,
        },
    });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "An error occurred during login",
        });
    }
};

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true, 
        secure: false, // Should be true if in production with HTTPS
        path: '/', // Ensure the path is the same as when the cookie was set
        sameSite: 'lax', // Or 'strict'/'none' depending on your use case
    })
    .status(200)
    .json({
        success: true,
        message: "Logged out successfully",
    });
};


module.exports = { registerUser, loginUser, logout };
``
